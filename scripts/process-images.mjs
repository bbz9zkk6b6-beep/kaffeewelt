#!/usr/bin/env node
/**
 * Bildverarbeitung für Meine kleine Kaffeewelt
 *
 * Gibt allen Bildern den gleichen warmen, erdigen Look:
 * - Helligkeit leicht reduziert (-5%)
 * - Sättigung leicht gedrosselt (-15%) für Magazin-Optik
 * - Warmer Goldton-Overlay (subtil, 8%)
 * - Auf 1200x800 (Artikel-Header) oder 800x600 (Inline) zugeschnitten
 * - WebP-Output mit Qualität 85
 *
 * Verwendung:
 *   node scripts/process-images.mjs <eingabe-ordner> [ausgabe-ordner]
 *
 * Beispiel:
 *   node scripts/process-images.mjs ./raw-images ./public/images
 *
 * Voraussetzung: pnpm add -D sharp
 */

import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'

const INPUT = process.argv[2]
const OUTPUT = process.argv[3] || './public/images/processed'

if (!INPUT) {
  console.error('Verwendung: node scripts/process-images.mjs <eingabe> [ausgabe]')
  process.exit(1)
}

// Kaffeewelt Look — warm, erdig, ein Hauch Gold.
const PRESET = {
  width: 1200,
  height: 800,
  brightness: 0.95, // -5%
  saturation: 0.85, // -15%
  goldOverlay: { r: 212, g: 165, b: 116, alpha: 0.08 }, // #D4A574 8%
  quality: 85,
}

async function processImage(inputPath, outputPath) {
  const image = sharp(inputPath)
  const metadata = await image.metadata()

  console.log(`  ${basename(inputPath)} (${metadata.width}x${metadata.height})`)

  // Goldfarbenes Overlay generieren in passender Größe
  const overlay = await sharp({
    create: {
      width: PRESET.width,
      height: PRESET.height,
      channels: 4,
      background: PRESET.goldOverlay,
    },
  })
    .png()
    .toBuffer()

  await image
    .resize(PRESET.width, PRESET.height, { fit: 'cover', position: 'center' })
    .modulate({
      brightness: PRESET.brightness,
      saturation: PRESET.saturation,
    })
    .composite([{ input: overlay, blend: 'overlay' }])
    .webp({ quality: PRESET.quality })
    .toFile(outputPath)
}

async function main() {
  await mkdir(OUTPUT, { recursive: true })

  const files = await readdir(INPUT)
  const images = files.filter((f) =>
    ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase()),
  )

  console.log(`\n${images.length} Bilder gefunden in ${INPUT}\n`)

  for (const file of images) {
    const inputPath = join(INPUT, file)
    const outputName = basename(file, extname(file)) + '.webp'
    const outputPath = join(OUTPUT, outputName)

    try {
      await processImage(inputPath, outputPath)
    } catch (error) {
      console.error(`  Fehler bei ${file}:`, error.message)
    }
  }

  console.log(`\nFertig. Bilder liegen in ${OUTPUT}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
