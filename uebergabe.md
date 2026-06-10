# Übergabe: Meine kleine Kaffeewelt

Stand: 09.06.2026

---

## Status

Die Seite ist live und vollständig deployed. Inhalte fehlen noch — alles andere läuft.

---

## Wichtige URLs

| Was | URL |
|-----|-----|
| Live-Seite | https://kaffeewelt.vercel.app |
| Sanity Studio (CMS) | https://kaffeewelt.sanity.studio |
| Vercel Dashboard | https://vercel.com/olaf-wulf-s-projects/kaffeewelt |
| GitHub Repository | https://github.com/bbz9zkk6b6-beep/kaffeewelt |
| Kommentar-Moderation | https://kaffeewelt.vercel.app/admin/kommentare?token=DEIN_ADMIN_TOKEN |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **CMS:** Sanity (Projekt-ID: `nw0k8jag`, Dataset: `production`)
- **CSS:** Tailwind CSS v4
- **Sprache:** TypeScript
- **Paketmanager:** pnpm
- **Hosting:** Vercel (Hobby-Plan, kostenlos)
- **Code:** GitHub

---

## Umgebungsvariablen (in Vercel gesetzt)

| Variable | Beschreibung |
|----------|-------------|
| `NEXT_PUBLIC_BASE_URL` | https://kaffeewelt.vercel.app |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | nw0k8jag |
| `NEXT_PUBLIC_SANITY_DATASET` | production |
| `SANITY_API_READ_TOKEN` | In Vercel hinterlegt (nicht hier speichern) |
| `SANITY_API_WRITE_TOKEN` | In Vercel hinterlegt (nicht hier speichern) |
| `ADMIN_TOKEN` | Dein selbst gewähltes Passwort für die Moderations-Seite |

---

## Projektstruktur

```
/app                  Next.js Seiten (App Router)
  /artikel            Artikel-Übersicht + Einzelartikel
  /news               News-Übersicht + Einzelnews
  /rezepte            Rezepte-Übersicht + Einzelrezept
  /glossar            Glossar-Übersicht + Einzelbegriff
  /kategorien         Kategorien-Übersicht
  /ueber-uns          Über-uns-Seite
  /kontakt            Kontaktseite
  /favoriten          Favoriten-Seite
  /admin/kommentare   Kommentar-Moderation (token-geschützt)
  /actions            Server Actions (comments.ts, ratings.ts)

/components           UI-Komponenten
/sanity               Sanity-Schemas + Client
  /schemaTypes        article, recipe, news, glossaryTerm,
                      author, category, comment, rating
  /lib                client.ts, queries.ts
/public               robots.txt (blockiert Crawler)
```

---

## Sanity CMS — Inhalte pflegen

**Login:** https://kaffeewelt.sanity.studio

Folgende Inhaltstypen sind vorhanden:

| Typ | Beschreibung |
|-----|-------------|
| Article | Redaktionelle Artikel |
| Recipe | Rezepte mit Zutaten, Schritten, Bewertung |
| News | Kurze Neuigkeiten |
| Glossary Term | Kaffeebegriffe für das Glossar |
| Author | Autorenprofile |
| Category | Kategorien (Bohnen, Zubereitung etc.) |
| Comment | Kommentare (werden moderiert) |
| Rating | Rezeptbewertungen |

---

## Kommentar-Moderation

URL: `https://kaffeewelt.vercel.app/admin/kommentare?token=DEIN_ADMIN_TOKEN`

- Neue Kommentare landen mit Status `pending`
- Erst nach Freigabe sichtbar auf der Seite
- Ablehnen möglich
- Rate-Limiting: max. 3 Kommentare pro IP in 5 Minuten

---

## Was noch zu tun ist

### Vor dem Launch
- [ ] Inhalte in Sanity Studio eingeben (Artikel, Rezepte, Glossar, Autor-Profil)
- [ ] `robots.txt` leeren oder löschen wenn ready (`/public/robots.txt`)

### Domain verbinden
1. In Vercel: Projekt → Domains → `meine-kleine-kaffeewelt.de` hinzufügen
2. Bei Strato: DNS-Eintrag auf Vercel zeigen lassen (Vercel gibt die genauen Werte vor)
3. Sanity CORS: `https://meine-kleine-kaffeewelt.de` bei sanity.io → API → CORS origins eintragen
4. Vercel Env Variable `NEXT_PUBLIC_BASE_URL` auf `https://meine-kleine-kaffeewelt.de` ändern

### Optional
- [ ] Google Search Console einrichten (nach Domain-Verbindung)
- [ ] Vercel Analytics aktivieren

### Newsletter (Brevo)
- [ ] Account bei brevo.com anlegen (kostenlos, DSGVO-konform, EU-Server)
- [ ] API-Key generieren (Settings → API Keys, beginnt mit `xkeysib-`)
- [ ] `BREVO_API_KEY` als Umgebungsvariable in Vercel eintragen
- [ ] Server Action für Newsletter-Anmeldung einbauen (~30 Zeilen, Formular bereits vorhanden)

### Technische Fixes (aus Review)
- [ ] Canonical-Tags auf allen Seiten ergänzen
- [ ] Seitentitel Impressum + Datenschutz: doppelten Namen entfernen
- [ ] Honeypot-Feld im Newsletter-Formular per CSS/`aria-hidden` unsichtbar machen
- [ ] Hero-Bild ersetzen: mindestens 1200px breit für Retina-Displays
- [ ] Footer: Instagram-Link, Newsletter-Link und RSS-Link auf echte Ziele setzen (nicht `#`)

### Redaktionell (aus Review)
- [ ] Alle Beispielinhalte aus 2025 durch aktuelle Inhalte ersetzen — wirkt sonst verlassen
- [ ] Startseite straffen: Barista-Assistent oder Mengenrechner weiter nach unten verschieben

### Recherche & Redaktion
- [ ] Google Alerts einrichten: „Kaffee", „Espresso", „Barista", „Cold Brew"
- [ ] Feedly-Account anlegen, Quellen hinzufügen: perfectdailygrind.com, sca.coffee, kaffeemagazin.de
- [ ] Redaktionsrhythmus festlegen (z.B. 1 Artikel + 2 News pro Woche)
- [ ] Ersten Inhalt eingeben: Autor-Profil, 1 Artikel, 1 Rezept, 5 Glossar-Begriffe

### Automatisierung & Agenten

**Vier Content-Agenten im Claude-Projekt:**
1. **artikel-recherche** — Recherchiert ein Thema gründlich: liefert Fakten, Keywords, Gliederung, Quellen, Affiliate-Potential
2. **rezept-ersteller** — Erstellt komplette Rezepte mit Zutaten, Schritten, Profi-Tipps, Variationen
3. **news-kurator** — Formuliert Kurznachrichten aus Links/Rohinformationen: Titel, Teaser, Text, Tags
4. **humanizer** — Letzte Stufe: nimmt rohe Texte und schreibt sie menschlich, lebendig und direkt

**Agenten nutzen:** Im Claude-Chat (`meine-kleine-kaffeewelt`) im Dropdown neben dem Eingabefeld auswählen oder `/artikel-recherche [Thema]` etc. eingeben.

**Zwei Automationen (Scheduled Tasks):**
- **Montag 8:00 Uhr** — `kaffeewelt-artikel-ideen`: 5 konkrete Artikel-Ideen mit Keywords, Gliederung, Affiliate-Potential
- **Mittwoch 8:00 Uhr** — `kaffeewelt-news-recherche`: 3 aktuelle Kaffee-News komplett recherchiert und formuliert

**Automatisierung aktivieren:**
1. Im Claude-Chat → Sidebar → **Scheduled**
2. Beide Tasks anklicken
3. **"Run now"** klicken, damit Claude die Tool-Berechtigungen vorab einholt
4. Ab nächste Woche: automatisch jeden Montag und Mittwoch

Die Agenten und Automationen reduzieren manuelle Arbeit um 60–70% — nur noch den humanizer drüberlaufen lassen, Sanity eintragen, fertig.

### Linkaufbau (ab Monat 6–12)
- [ ] Gastbeiträge auf Food/Coffee-Blogs anbieten (Link zurück zur Seite)
- [ ] Lokale Röstereien anschreiben: gegenseitige Verlinkung
- [ ] Kaffee-Foren aktiv nutzen: kaffee-netz.de, Reddit r/Kaffee (Profil-Link, kein Spam)
- [ ] Glossar-Artikel SEO-optimieren — werden oft extern verlinkt
- [ ] Infografik erstellen (z.B. „Röstgrade erklärt") → Einbettung durch andere Seiten
- [ ] HARO oder Pressearbeit: als Kaffee-Experte Zitate für Journalisten liefern
- [ ] Broken Link Building: veraltete Kaffee-Seiten finden, Ersatz anbieten

---

## Lokale Entwicklung

```bash
cd /Users/olafwulf/Downloads/Kaffeewelt

# Next.js Dev-Server starten
npm run dev
# → http://localhost:3000

# Sanity Studio lokal starten
npx sanity dev --port 3334
# → http://localhost:3334

# Produktions-Build testen
npm run build
```

---

## Sanity Studio erneut deployen

```bash
cd /Users/olafwulf/Downloads/Kaffeewelt
npx sanity deploy
```

---

## Wichtige Dateien

| Datei | Zweck |
|-------|-------|
| `.env.local` | Lokale Tokens — NIEMALS in Git einchecken |
| `sanity.cli.ts` | Sanity CLI-Konfiguration |
| `sanity.config.ts` | Sanity Studio-Konfiguration |
| `public/robots.txt` | Crawler-Sperre (vor Launch entfernen) |
| `app/actions/comments.ts` | Kommentar-Logik |
| `app/actions/ratings.ts` | Bewertungs-Logik |
