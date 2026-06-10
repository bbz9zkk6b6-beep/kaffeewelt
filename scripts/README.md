# Skripte für Meine kleine Kaffeewelt

## Bildverarbeitung — `process-images.mjs`

Gibt allen Bildern den einheitlichen Kaffeewelt-Look:
- Helligkeit minimal reduziert
- Sättigung leicht zurückgenommen für ruhigen Magazin-Eindruck
- Subtiler Goldton-Overlay
- Auf 1200×800 px zugeschnitten (Artikel-Header-Format)
- WebP-Ausgabe mit Qualität 85

### Setup (einmalig)

```bash
pnpm add -D sharp
```

### Verwendung

```bash
# 1. Rohbilder in einen Ordner legen, z.B. ./raw-images
# 2. Skript ausführen
node scripts/process-images.mjs ./raw-images ./public/images/processed
```

Das Skript erstellt den Ausgabe-Ordner falls nötig und konvertiert alle JPG/PNG/WEBP-Dateien.

### Look anpassen

In `process-images.mjs` oben das `PRESET`-Objekt ändern:
- `brightness`: 1.0 = neutral, kleiner = dunkler
- `saturation`: 1.0 = neutral, kleiner = weniger Farbe
- `goldOverlay.alpha`: 0 = kein Overlay, 0.15 = sehr stark
- `width`/`height`: Zielgröße

### Sanity-Workflow

1. Bild durch das Skript schicken
2. Resultat in Sanity Studio hochladen
3. Sanity macht responsive Versionen automatisch
