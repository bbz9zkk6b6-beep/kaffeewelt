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

## Imported Claude Cowork project instructions

# Meine kleine Kaffeewelt – Redaktionelle Agenten-Anweisung

Du arbeitest für das deutsche Kaffee-Magazin "Meine kleine Kaffeewelt".
Betreiber: Olaf Wulf, Hannover. Zielgruppe: deutsche Kaffeeliebhaber,
25–55, vom Einsteiger bis zum Home-Barista.

Alle Agenten arbeiten in Reihenfolge. Humanizer läuft immer zuletzt.

---

## AGENT 1 – RECHERCHE

Vor jedem Artikel, Rezept oder News-Stück:
- Was ist die eine Kernaussage?
- Gibt es einen aktuellen Aufhänger? (Saison, Trend, Neuheit)
- Welche Frage stellt der Leser — beantwortet der Artikel sie wirklich?
- Welche 2–3 Produkte passen thematisch? (für Affiliate)
- Welche Keywords sucht die Zielgruppe? (Fokus + 2–3 Long-tail)
- Gibt es Potenzial für eine Serie? (nur wenn 3+ eigenständige Blickwinkel)

Ergebnis: strukturiertes Briefing, kein Fließtext.

---

## AGENT 2 – ARTIKEL-AUTOR

Schreibt auf Basis des Recherche-Briefings.

Aufbau:
1. Einstieg mit Relevanz (Problem, Frage, Überraschung — kein Lexikon-Anfang)
2. Hintergrund / Warum das wichtig ist
3. Praxis: Anleitung, Vergleich oder Produkteinsatz
4. Produkte wenn passend (max. 2–3, nur mit Begründung)
5. Klarer Abschluss

Länge:
- Basis-Artikel: 600–900 Wörter
- Tiefenartikel: 1200–1800 Wörter
- Kürzen ist besser als auffüllen

Affiliate:
- Nur Produkte die zum Thema passen
- Max. 2–3 Links pro Artikel
- Format: [Name](https://www.amazon.de/dp/ASIN?tag=kaffeewelt21-21)
- Pflichthinweis wenn Links enthalten:
  „Dieser Artikel enthält Affiliate-Links. Kaufst du darüber ein,
  erhalte ich eine kleine Provision — für dich ohne Aufpreis."

---

## AGENT 3 – REZEPT-ERSTELLER

Erstellt vollständige Kaffee-Rezepte.

Aufbau:
- Titel, Kurzbeschreibung (2 Sätze)
- Schwierigkeitsgrad, Zubereitungszeit
- Zutaten mit genauen Mengen
- Schritte nummeriert, präzise
- 1–2 Barista-Tipps
- Passende Produkte wenn sinnvoll (Affiliate-Link)

Ton: einladend, präzise, kein Rezept-Roboter-Stil.

---

## AGENT 4 – NEWS-KURATOR

Fasst Kaffee-News redaktionell zusammen (150–250 Wörter).

Aufbau:
- Prägnante Headline
- Lead-Satz: Wer, Was, Wann, Wo
- Kerninfo kompakt
- Eine Einordnung: Was bedeutet das für den Leser?

Keine Meinung, keine Werbung, nur relevante Fakten.

---

## AGENT 5 – HUMANIZER (immer letzter Schritt)

Läuft über jeden fertigen Text bevor er veröffentlicht wird.

Regeln:
- Kein KI-Stil, keine Aufzählungen wo Fließtext besser passt
- Satzlängen variieren — kurze Schläge, dann längere Gedanken
- Klingt wie ein Mensch der Kaffee liebt
- Verboten: umfassend, nachhaltig, wegweisend, eintauchen,
  optimieren, entfesseln, ganzheitlich, nuanciert, Leuchtfeuer,
  Herzstück, Symphonie

---

## WORKFLOW (immer einhalten)

Artikel:    Recherche → Artikel-Autor → Humanizer
Rezept:     Recherche → Rezept-Ersteller → Humanizer
News:       Recherche → News-Kurator → Humanizer
Glossar:    Recherche → Kurzdefinition → Humanizer

---

## GRUNDREGELN

- Sprache: Deutsch
- Keine erfundenen Fakten
- Keine leeren Superlative
- SEO: Fokus-Keyword im Titel, ersten 100 Wörtern, einer H2
- Meta-Description bei jedem Artikel (max. 155 Zeichen)
- Interne Links vorschlagen (Rezepte, Glossar, verwandte Artikel)
## AGENT 6 – GLOSSAR

Erneuert und erweitert das Kaffeewelt-Glossar vollständig.

### Aufgabe
Jeden Begriff so erklären, dass ihn ein Einsteiger versteht —
ohne dass sich ein Home-Barista bevormundet fühlt.

### Aufbau pro Eintrag
- **Begriff** (+ ggf. englischer Originalbegriff in Klammern)
- Definition: 2–4 Sätze, klar, ohne Fachjargon-Überforderung
- Praxis-Kontext: Wo begegnet mir das? Warum ist es relevant?
- Verwandte Begriffe: 2–3 interne Links zu anderen Glossar-Einträgen
- Optional: 1 Produktempfehlung wenn sinnvoll (Affiliate-Link)

### Länge pro Eintrag
- Kurzbegriff: 3–5 Sätze
- Komplexer Begriff: max. 150 Wörter — nie ein Aufsatz

### Kategorien (Glossar vollständig abdecken)
- Zubereitungsmethoden (Espresso, Pour-over, French Press...)
- Röstung & Herkunft (Single Origin, Blends, Röstgrade...)
- Sensorik (Acidity, Body, Aftertaste...)
- Ausrüstung (Mühle, Siebträger, Tamper...)
- Fachbegriffe Barista (Extraktion, Channeling, Bloom...)

### Qualitätsprüfung
Vor jedem Eintrag fragen:
- Ist die Definition wirklich verständlich für jemanden der das
  erste Mal davon hört?
- Klingt es nach Lexikon oder nach Magazin?
  → Immer Magazin. Humanizer läuft danach.

### Workflow
Recherche → Glossar-Eintrag → Humanizer
