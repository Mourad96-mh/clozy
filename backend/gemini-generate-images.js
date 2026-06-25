require('dotenv').config()
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { promptFor } = require('./gemini-prompts')

// =====================================================================
//  Génération des visuels produits « maison » via Gemini (Nano Banana).
//
//  Pour chaque produit de add-new-products-2.js : on prend la photo
//  source brute (_product-sources/vague3-2026-06-22/<HH.MM.SS>.jpeg),
//  on l'envoie à gemini-2.5-flash-image avec le PROMPT UNIQUE, et on
//  enregistre le résultat en .webp au nom attendu dans frontend/public/
//  (en écrasant le placeholder). Le fichier n'est écrasé QUE si la
//  génération réussit — les sources restent intactes dans _product-sources.
//
//  Pré-requis : GEMINI_API_KEY dans backend/.env (Google AI Studio,
//  facturation activée — la génération d'image est payante).
//
//  Usage :
//    node gemini-generate-images.js            # tous les produits
//    node gemini-generate-images.js 2          # test : 2 premiers seulement
//    node gemini-generate-images.js --force    # régénère même si déjà fait
// =====================================================================

const API_KEY = process.env.GEMINI_API_KEY
const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image'
const SCRIPT = path.join(__dirname, 'add-new-products-2.js')
const SRC_DIR = path.join(__dirname, '..', '_product-sources', 'vague3-2026-06-22')
const PUBLIC = path.join(__dirname, '..', 'frontend', 'public')

const MAX_WIDTH = 1000
const BUDGET = 115 * 1024
const QUALITIES = [80, 72, 64, 58]
const DELAY_MS = 2500 // entre deux appels, pour ménager le quota
const MAX_RETRY = 3

// Prompt de repli (PROMPT UNIQUE) si un produit n'a pas d'entrée dédiée dans
// gemini-prompts.js — normalement inutilisé, les 41 sont couverts.
const FALLBACK_PROMPT = `Using the clothing item in the attached photo, generate a new photorealistic
e-commerce product image of that exact garment worn by a model.

Keep the garment's design, cut, fabric, pattern and colours identical to the photo.
Ignore the original background, packaging, mannequin, flat-lay or any text/logos —
recreate the item cleanly as if professionally photographed.

Model & framing:
- A young adult model with a friendly neutral expression, natural relaxed standing pose.
- Full body visible head-to-ankle, centered.
- Plain uniform light-grey seamless studio background.
- Soft, even, diffused studio lighting, no harsh shadows.
- Portrait orientation, 3:4 aspect ratio, high resolution, sharp focus on the garment,
  accurate fabric texture and colour.

Rules (keep it tasteful and within content policy):
- The subject is fully and modestly dressed at all times, appropriate and respectful.
- If the item is a pyjama / nightdress / loungewear, present it as a casual daytime
  co-ord / loungewear set, fully covered.
- If the item is a burkini or swimwear, present it as modest full-coverage swimwear,
  with a matching swim hijab fully covering the hair and neck.
- If the item is underwear / a bra / shapewear, do NOT show it on a human body —
  present it on an invisible / ghost mannequin (no visible person) instead, on the same
  light-grey studio background.
- If the item is for a man, use a young adult male model; for a child, a child model.`

// ── Parse add-new-products-2.js → [ {target, ts} ] (1er src = primaire) ──
function buildMapping() {
  const lines = fs.readFileSync(SCRIPT, 'utf8').split(/\r?\n/)
  let pending = []
  const byTarget = new Map()
  for (const line of lines) {
    if (/src\s+(raw|model)/i.test(line)) {
      const ms = line.match(/\d{2}\.\d{2}\.\d{2}/g) || []
      pending.push(...ms)
    }
    const im = line.match(/images:\s*\['\/([a-z0-9-]+\.webp)'\]/)
    if (im) {
      if (!byTarget.has(im[1]) && pending.length) byTarget.set(im[1], pending[0])
      pending = []
    }
  }
  return [...byTarget].map(([target, ts]) => ({ target, ts }))
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function generate(srcPath, prompt) {
  const b64 = fs.readFileSync(srcPath).toString('base64')
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`
  const body = {
    contents: [
      { parts: [{ text: prompt }, { inline_data: { mime_type: 'image/jpeg', data: b64 } }] },
    ],
    generationConfig: { responseModalities: ['IMAGE'] },
  }
  for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.status === 429 || res.status >= 500) {
      const wait = DELAY_MS * attempt * 2
      console.log(`    ⏳ ${res.status} — nouvel essai dans ${wait / 1000}s (${attempt}/${MAX_RETRY})`)
      await sleep(wait)
      continue
    }
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`)
    const block = data?.promptFeedback?.blockReason
    if (block) throw new Error(`bloqué (${block})`)
    const parts = data?.candidates?.[0]?.content?.parts || []
    const img = parts.find((p) => p.inlineData || p.inline_data)
    const out = img?.inlineData?.data || img?.inline_data?.data
    if (!out) {
      const fr = data?.candidates?.[0]?.finishReason || 'aucune image renvoyée'
      throw new Error(`pas d'image (${fr})`)
    }
    return Buffer.from(out, 'base64')
  }
  throw new Error('échec après plusieurs essais (quota/serveur)')
}

async function toWebp(buf, destPath) {
  let used = QUALITIES[0]
  for (const q of QUALITIES) {
    await sharp(buf).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: q }).toFile(destPath)
    used = q
    if (fs.statSync(destPath).size <= BUDGET) break
  }
  return { size: fs.statSync(destPath).size, q: used }
}

async function run() {
  if (!API_KEY) {
    console.error('✗ GEMINI_API_KEY manquant. Ajoutez-le dans backend/.env puis relancez.')
    process.exit(1)
  }
  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const limit = args.find((a) => /^\d+$/.test(a))
  let jobs = buildMapping()
  if (limit) jobs = jobs.slice(0, Number(limit))

  console.log(`Modèle : ${MODEL} — ${jobs.length} image(s) à générer${force ? ' (force)' : ''}.\n`)
  const failed = []
  let done = 0
  for (const { target, ts } of jobs) {
    const srcPath = path.join(SRC_DIR, `${ts}.jpeg`)
    const destPath = path.join(PUBLIC, target)
    if (!fs.existsSync(srcPath)) { console.log(`✗ ${target} — source ${ts}.jpeg introuvable`); failed.push(target); continue }
    try {
      const buf = await generate(srcPath, promptFor(target) || FALLBACK_PROMPT)
      const { size, q } = await toWebp(buf, destPath) // n'écrase qu'en cas de succès
      done++
      console.log(`✓ ${target}  <= ${ts}.jpeg  ${(size / 1024) | 0}KB q${q}`)
    } catch (e) {
      console.log(`✗ ${target}  <= ${ts}.jpeg  — ${e.message}`)
      failed.push(target)
    }
    await sleep(DELAY_MS)
  }
  console.log(`\nTerminé. ${done} générée(s), ${failed.length} échec(s).`)
  if (failed.length) {
    fs.writeFileSync(path.join(__dirname, 'gemini-failed.txt'), failed.join('\n') + '\n')
    console.log('Échecs listés dans backend/gemini-failed.txt (souvent : filtre de sécurité sur la lingerie — à régénérer à la main).')
  }
}

run().catch((e) => { console.error(e); process.exit(1) })
