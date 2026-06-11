# Meine kleine Kaffeewelt

Deutsches Kaffee-Magazin. Next.js + Sanity, deployed auf Vercel.

## Arbeitsverzeichnis
**Immer hier arbeiten:** `/Users/olafwulf/Downloads/Kaffeewelt`
Alias `kaffee` im Terminal springt hierher. Itinerarium und andere Ordner sind NICHT dieses Projekt.

## Tech Stack
- Next.js 16 (App Router, Turbopack), TypeScript
- Sanity CMS — Projekt-ID `nw0k8jag`, Dataset `production`
- Tailwind CSS v4
- Paketmanager: pnpm
- Hosting: Vercel (Hobby-Plan, Account `olwulf-9727` / olaf-wulf-s-projects)
- GitHub: `bbz9zkk6b6-beep/kaffeewelt` (public)

## Live-URLs
- Seite: https://kaffeewelt.vercel.app
- Sanity Studio: https://kaffeewelt.sanity.studio
- Vercel: https://vercel.com/olaf-wulf-s-projects/kaffeewelt
- Geplante Domain: meine-kleine-kaffeewelt.de (Strato, noch nicht verbunden)

## Deployment
Git-Push deployt automatisch (Repo ist mit Vercel verbunden).
Manueller Deploy wenn nötig:
```bash
npx vercel deploy --prod
```
ENV-Variable setzen:
```bash
npx vercel env add NAME production --value WERT --yes
```

## Gesetzte ENV-Variablen (Vercel)
- `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`
- `ADMIN_TOKEN` (für Moderations-Seite)
- `NEXT_PUBLIC_AMAZON_TAG` = `kaffeewelt21-21` (Amazon Partner)

## Struktur
- `/app` — Seiten (artikel, news, rezepte, glossar, kategorien, admin/kommentare)
- `/app/actions` — Server Actions (comments.ts, ratings.ts — Sanity-basiert)
- `/components` — UI
- `/sanity` — Schemas (article, recipe, news, glossaryTerm, author, category, comment, rating) + lib (client.ts, queries.ts)
- `/scripts/process-images.mjs` — Bild-Preset (1200×800, warmer Magazin-Look, WebP)

## Kommentar-Moderation
Nur Olaf moderiert. Kommentare landen als `pending`, erst nach Freigabe sichtbar (Option A).
Seite: `/admin/kommentare?token=ADMIN_TOKEN`. Rate-Limit: 3/IP in 5 Min.

## Content-Agenten
4 Agenten vorhanden: `artikel-recherche`, `rezept-ersteller`, `news-kurator`, `humanizer`.
humanizer immer als letzter Schritt vor Veröffentlichung.

## Wichtige Grundsätze (vom Nutzer)
- **Einfachste Lösung wählen**, die das Problem sauber löst. Kein Over-Engineering.
- **Vor dem Handeln fragen** bei Unklarheit — nicht interpretieren und loslegen.
- **Keine eigenmächtigen Datei-Löschungen.** Erst fragen.
- Leere/unfertige Bereiche nicht löschen, sondern passiv schalten.
- Deutsch schreiben, direkt, kein Vorgeplänkel, keine Floskeln.

## Status & offene Punkte
Vollständige To-do-Liste in `uebergabe.md`. Kurz:
- Inhalte fehlen noch (Artikel, Rezepte, Glossar, Autor-Profil)
- `public/robots.txt` blockiert noch alle Crawler — vor Launch entfernen
- Domain verbinden (Strato → Vercel)
- Newsletter-Backend (Brevo) noch nicht angebunden
- KI-Barista (LLM-Fallback): Auftrag fertig dokumentiert, **bewusst NICHT umgesetzt** — Barista läuft regelbasiert. Erst nachrüsten, wenn Logs zeigen, dass Besucher freie Fragen stellen.

## Lokale Entwicklung
```bash
npm run dev                    # → localhost:3000
npx sanity dev --port 3334     # Studio → localhost:3334
npm run build                  # Produktions-Build testen
```
