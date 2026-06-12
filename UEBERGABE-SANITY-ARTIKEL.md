# Übergabe: Sanity-Anbindung für Artikel

**Datum:** 2026-06-11 (KW 24, Donnerstag)
**Ziel:** Nur Artikel (`/artikel/`) von statischen TypeScript-Arrays auf Sanity CMS umstellen.

---

## Projekt-Grunddaten

- **Arbeitsverzeichnis:** `/Users/olafwulf/Downloads/Kaffeewelt`
- **Alias im Terminal:** `kaffee`
- **NIEMALS in einem anderen Ordner arbeiten**
- **Framework:** Next.js 16, App Router, TypeScript, Tailwind CSS v4
- **Paketmanager:** pnpm
- **Hosting:** Vercel (Account: olwulf-9727 / olaf-wulf-s-projects)
- **GitHub:** bbz9zkk6b6-beep/kaffeewelt (public)
- **Git-Push = automatischer Deploy**

## Sanity

- **Projekt-ID:** `nw0k8jag`
- **Dataset:** `production`
- **Studio:** https://kaffeewelt.sanity.studio
- **ENV-Variablen auf Vercel gesetzt:**
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_READ_TOKEN`
  - `SANITY_API_WRITE_TOKEN`

## Aktueller Stand

### Was läuft über Sanity (bereits funktioniert):
- Kommentare (`app/actions/comments.ts`)
- Bewertungen (`app/actions/ratings.ts`)
- Moderation (`/admin/kommentare`)

### Was noch statisch ist (TypeScript-Arrays):
- **Artikel** → `lib/content/articles.ts` ← **JETZT UMSTELLEN**
- News → `lib/content/news.ts` (später)
- Rezepte → `lib/content/recipes.ts` (später)
- Glossar → `lib/content/glossary.ts` (später)
- Autoren → `lib/content/authors.ts` (später)
- Kategorien → `lib/content/categories.ts` (später)

---

## Aufgabe: Nur Artikel auf Sanity umstellen

### Schritt 1 — Sanity Schema prüfen
Datei: `/Users/olafwulf/Downloads/Kaffeewelt/sanity/schemaTypes/article.ts`
Prüfen ob alle Felder passen:
- title, slug, excerpt, category (Referenz), date, readingTime, image, featured, content (Portable Text)

### Schritt 2 — Sanity Queries schreiben
Datei: `/Users/olafwulf/Downloads/Kaffeewelt/sanity/lib/queries.ts` (prüfen ob vorhanden)
Benötigt:
- `getAllArticles()` — alle Artikel für Listing
- `getArticleBySlug(slug)` — Einzelartikel
- `getFeaturedArticles()` — für Startseite
- `getArticlesByCategory(category)` — für Kategorieseiten

### Schritt 3 — Seiten umstellen
- `app/artikel/page.tsx` — Liste aller Artikel
- `app/artikel/[slug]/page.tsx` — Einzelartikel
- `app/page.tsx` — Featured Articles auf Startseite
- `app/kategorien/[slug]/page.tsx` — Artikel nach Kategorie

### Schritt 4 — Static Generation
- `generateStaticParams` für `[slug]` auf Sanity umstellen
- `revalidate` setzen (empfohlen: 60 Sekunden oder ISR)

### Schritt 5 — Portable Text
Aktuell nutzt der Artikel-Body `ArticleBody` mit eigenem Block-Format.
Sanity nutzt Portable Text (`@portabletext/react`).
Entweder: `ArticleBody` für Portable Text erweitern ODER neuen Renderer bauen.

---

## Wichtige Dateien

| Datei | Zweck |
|-------|-------|
| `sanity/schemaTypes/article.ts` | Sanity Schema für Artikel |
| `sanity/schemaTypes/index.ts` | Schema-Index |
| `sanity/lib/client.ts` | Sanity Client |
| `sanity/lib/queries.ts` | GROQ-Queries (ggf. neu anlegen) |
| `lib/content/articles.ts` | Aktuell statische Daten — nach Umstellung behalten als Fallback |
| `components/article-body.tsx` | Rendert Artikel-Content — muss Portable Text können |
| `app/artikel/page.tsx` | Artikel-Übersicht |
| `app/artikel/[slug]/page.tsx` | Einzelartikel-Seite |

---

## Projektstruktur (vollständig)

```
Kaffeewelt/
├── _content/                    ← Fertige Artikel-Texte nach KW
│   ├── artikel/
│   │   ├── KW-24/donnerstag/
│   │   │   └── FERTIG_roestgrade-verstehen.md
│   │   └── KW-25/
│   ├── news/KW-24/, KW-25/
│   ├── rezepte/KW-24/, KW-25/
│   └── glossar/
├── _recherche/                  ← Recherche-Briefings nach KW
│   └── KW-24/donnerstag/
│       ├── ARTIKEL_roestgrade-verstehen.md
│       ├── ARTIKEL_muehle-die-richtige.md
│       ├── ARTIKEL_kaffeeanbau-weltweit.md
│       ├── ARTIKEL_latte-art-einsteiger.md
│       └── ARTIKEL_wasser-unterschaetzte-zutat.md
├── app/
│   ├── page.tsx                 ← Startseite
│   ├── artikel/
│   │   ├── page.tsx             ← Artikel-Liste
│   │   └── [slug]/page.tsx      ← Einzelartikel
│   ├── news/[slug]/page.tsx
│   ├── rezepte/[slug]/page.tsx
│   ├── glossar/[slug]/page.tsx
│   ├── kategorien/[slug]/page.tsx
│   ├── impressum/page.tsx
│   ├── datenschutz/page.tsx
│   ├── kontakt/page.tsx
│   ├── ueber-uns/page.tsx
│   ├── favoriten/page.tsx
│   ├── admin/kommentare/        ← Moderation (ADMIN_TOKEN)
│   └── api/
│       ├── contact/             ← Kontaktformular
│       └── search/              ← Suche
├── components/
│   ├── site-header.tsx          ← Navigation + Barista-Button
│   ├── barista-button.tsx       ← "Frag den Barista" Hero-Button
│   ├── unified-search-overlay.tsx ← Barista-Dialog
│   ├── article-body.tsx         ← Artikel-Content-Renderer
│   ├── article-card.tsx         ← Artikel-Vorschau-Karte
│   ├── author-byline.tsx        ← Nur noch BackLink (Autor-Box entfernt)
│   ├── contact-form.tsx         ← Kontaktformular
│   ├── newsletter.tsx
│   └── ui/                      ← shadcn/base-ui Komponenten
├── lib/
│   └── content/
│       ├── articles.ts          ← STATISCH — wird umgestellt
│       ├── news.ts              ← statisch (später)
│       ├── recipes.ts           ← statisch (später)
│       ├── glossary.ts          ← statisch (später)
│       ├── authors.ts           ← statisch (später)
│       ├── categories.ts        ← statisch
│       └── types.ts             ← TypeScript-Typen
├── sanity/
│   ├── sanity.config.ts
│   ├── schemaTypes/
│   │   ├── article.ts           ← Schema prüfen!
│   │   ├── news.ts
│   │   ├── recipe.ts
│   │   ├── glossary.ts
│   │   ├── author.ts
│   │   ├── category.ts
│   │   ├── comment.ts
│   │   ├── rating.ts
│   │   └── index.ts
│   └── lib/
│       ├── client.ts            ← Sanity Client
│       └── queries.ts           ← GROQ-Queries (erweitern)
├── public/
│   └── images/                  ← Statische Bilder
├── .claude/
│   └── agents/                  ← Custom Agents
│       ├── artikel-recherche.md
│       ├── humanizer.md
│       ├── news-kurator.md
│       ├── rezept-ersteller.md
│       └── glossar-agent.md
├── CLAUDE.md                    ← Projektanweisung für Claude
├── UEBERGABE-SANITY-ARTIKEL.md  ← Diese Datei
└── uebergabe.md                 ← Allgemeine Projekt-Übergabe
```

---

## Offene Punkte (nicht diese Aufgabe)

- News, Rezepte, Glossar → später ebenfalls auf Sanity
- `public/robots.txt` blockiert noch alle Crawler — vor Launch entfernen
- Sanity CORS: `meine-kleine-kaffeewelt.de` eintragen
- Newsletter-Backend (Brevo) noch nicht angebunden
- ADMIN_TOKEN in Vercel gesetzt? → prüfen
- KI-Barista LLM-Fallback: bewusst NICHT umgesetzt

---

## Grundregeln (immer einhalten)

- Immer in `/Users/olafwulf/Downloads/Kaffeewelt` arbeiten
- `.env.local` NIEMALS in Git
- Git-Push = Vercel-Deploy (automatisch)
- Einfachste Lösung wählen
- Vor Unklarheit fragen, nicht interpretieren
- Kein Over-Engineering
