# Übergabe: Meine kleine Kaffeewelt

Stand: 12.06.2026

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

## Bereits erledigt (Stand 11.06.2026)

- [x] Domain `meine-kleine-kaffeewelt.de` mit Vercel verbunden (A-Record 216.198.79.1 bei Strato)
- [x] Impressum: echte Kontaktdaten (Olaf Wulf, Hannover), Telefon entfernt
- [x] Datenschutz: Vercel-Hosting-Abschnitt ergänzt, korrekte Verantwortliche
- [x] Über-uns: Team-Sektion entfernt, ich-Form, kein Fake-Team
- [x] E-Mail seitenübergreifend auf `ol.wulf (at) meine-kleine-kaffeewelt.de` (Anti-Spam)
- [x] Fake-Autorenboxen (Lena Brandt, Jonas Keller, Marie Hoffmann) aus allen Seiten entfernt
- [x] "Frag den Barista"-Button im Dialog-Header korrekt integriert
- [x] Content-Agenten eingerichtet: artikel-recherche, humanizer, news-kurator, rezept-ersteller, glossar-agent
- [x] Content-Ordnerstruktur: `_recherche/KW-XX/wochentag/` und `_content/artikel|news|rezepte/KW-XX/wochentag/`
- [x] 4 Recherche-Briefings erstellt (KW-24): Röstgrade, Mühle, Kaffeeanbau, Latte Art, Wasser
- [x] Röstgrade-Artikel vollständig geschrieben (SEO + humanizer) → `_content/artikel/KW-24/donnerstag/FERTIG_roestgrade-verstehen.md`
- [x] **Sanity-Migration Artikel:** `/artikel` und `/artikel/[slug]` holen Daten jetzt aus Sanity (ISR 60s)
  - `sanity/lib/fetch.ts` — neue typensichere Fetch-Funktionen
  - `sanity/lib/queries.ts` — ARTICLE_QUERY Content-Projektion aktualisiert
  - Startseite async, Featured Articles aus Sanity
  - Build grün, kein Fehler
- [x] **Bilder aller Artikel** — Sanity CDN-URLs mit `?w=1200&auto=format&q=80&fit=crop` optimiert (100–200 KB statt 2–3 MB), warmer Filter via CSS auf allen Bild-Komponenten
- [x] **Artikelsichtbarkeit** — natives Sanity Draft/Publish-System, kein eigenes `published`-Feld. Was im Studio veröffentlicht ist, erscheint live. Drafts bleiben unsichtbar.
- [x] **Produkt-Infrastruktur (Amazon Affiliate)**
  - `sanity/schemaTypes/product.ts` — Schema mit Pros/Cons, Kategorie, Preis-Hinweis, Body-Blocks
  - `/produkte` — Übersicht, gruppiert nach Kategorie
  - `/produkte/[slug]` — Detailseite mit Kauf-Button
  - `/r/[slug]` — Server-seitiger Affiliate-Redirect (Adblocker-Bypass), loggt Klicks
  - Amazon Partner-Tag: `kaffeewelt21-21`
- [x] **8 Rezepte angelegt und veröffentlicht** (12.06.2026)
  - Espresso, Cappuccino, Latte Macchiato, Cold Brew, Pour-over Filterkaffee, Iced Coffee, Café Mocha, Pumpkin Spice Latte
  - Alle mit Zutaten, Schritten, Tipps, Nährwerten, eigenem Bild und Autor
  - Sichtbar auf `/rezepte`
- [x] **Glossar: 74 Einträge** in Sanity (12.06.2026)
  - 7 Kategorien: Zubereitungsmethoden, Bohnen & Herkunft, Anbau & Aufbereitung, Röstung, Sensorik, Geräte, Kaffeekultur
  - Sichtbar auf `/glossar`

---

## Was noch zu tun ist

### Nächste Schritte Redaktion
- [x] 4 Röstgrad-Artikel veröffentlicht: `roestung-espresso`, `roestung-vollautomat`, `koffein-dunkle-roestung`, `saeurearmer-roestgrad`
- [ ] Produkte in Sanity Studio anlegen (Schema bereit, Seiten gebaut — nur noch Inhalte fehlen)
- [ ] Affiliate-Sidebar unter Artikel-Inhaltsverzeichnis mit konkreten Produkten befüllen (gemeinsam auswählen)
- [ ] Nächster Rezept-Batch: Nachspeisen & Backwaren mit Kaffee als Zutat (Tiramisu, Coffee Rub, Kaffeekuchen etc.)

### Vor dem Launch
- [ ] `robots.txt` leeren — aktuell blockiert es alle Crawler (`/public/robots.txt`)
- [ ] Sanity CORS: `https://meine-kleine-kaffeewelt.de` in sanity.io → API → CORS origins eintragen
- [ ] Vercel Env: `NEXT_PUBLIC_BASE_URL` auf `https://meine-kleine-kaffeewelt.de` ändern

### Optional
- [ ] Google Search Console einrichten (nach Domain-Verbindung)
- [ ] Vercel Analytics aktivieren

### Newsletter (Brevo)
- [ ] Account bei brevo.com anlegen (kostenlos, DSGVO-konform, EU-Server)
- [ ] API-Key generieren (Settings → API Keys, beginnt mit `xkeysib-`)
- [ ] `BREVO_API_KEY` als Umgebungsvariable in Vercel eintragen
- [ ] Server Action für Newsletter-Anmeldung einbauen (~30 Zeilen, Formular bereits vorhanden)

### KI-Barista (Hybrid-System, optional)
LLM-Fallback für den bestehenden Barista. Regel-Engine bleibt primär, LLM nur bei freien Fragen mit niedriger Confidence (< 0.6). Vollständiger Auftrag steht bereit — Implementierung offen.
- [ ] API Route `app/api/barista/route.ts` (server-side)
- [ ] Upstash Redis Account anlegen (Free-Tier, 500k Anfragen/Monat) → `UPSTASH_REDIS_REST_URL` + `_TOKEN` in Vercel
- [ ] ENV setzen: `ENABLE_AI_BARISTA=false`, `OPENAI_API_KEY`, `OPENAI_MODEL=gpt-4o-mini`, `AI_BARISTA_MONTHLY_BUDGET_USD=50`
- [ ] Intent-Erkennung (Keyword-basiert, kein ML) + Confidence-Score-Modell
- [ ] Kostenkontrolle ($50/Monat hart), Rate-Limit (10/IP/h), 5s-Timeout
- [ ] Output-Validierung: Whitelist (keine erfundenen Zahlen)
- [ ] Kosten-Alert: nur Log (optionaler `BUDGET_ALERT_WEBHOOK`-Slot offen)
- [ ] 14 Vitest-Testfälle (Regel, Sicherheit, Robustheit) grün
- [ ] LLM bleibt OFF (`ENABLE_AI_BARISTA=false`) bis getestet

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

## Monetarisierung & Affiliate-Programme

### Strategie
**Diskrete, unauffällige Affiliate-Integration** — Fokus auf Mehrwert statt Verkauf. Affiliate-Links sind Empfehlungen, nicht Zwang.

- **70% Amazon** — Basics (Standard-Kaffeebohnen, Zubehör, Anfänger-Mühlen)
- **20% Spezialist-Shops** — Premium-Produkte, höhere Provisionen
- **10% Direkte Partnerschaften** — Lokale Röstereien, Hersteller

### Implementierung (diskret)

1. **Native Ads in Rezepten**
   - "Für dieses Rezept empfehlen wir..." → Link zu konkretem Produkt
   - Beispiel: "Für Cold Brew: diese Aeropress von [Partner]"

2. **Glossar-Fußnoten**
   - Fachbegriff erklärt + "Wir nutzen: [Produkt-Link]"
   - Beispiel: "Espresso — Infos + Link zu guter Espressomaschine"

3. **Expert Pick Boxen** (am Ende von Artikeln)
   - Box mit Barista-Foto + "Das ist mein Favorit: [Produkt]" + Link
   - Wirkt authentisch, nicht verkäuferisch

4. **Sponsorship-Deklaration**
   - "Dieser Artikel wurde unterstützt von [Rösterei]"
   - Transparent, legal, ehrlich

5. **Newsletter-Fußzeile**
   - "Produkt der Woche: [Link]"
   - Maximal 1–2 Links pro Newsletter

### Affiliate-Partner (zum Recherchieren)

#### Premium Kaffee-Shops (höhere Provisionen)
- [ ] **Sweet Maria's** (sweetmarias.com) — Specialty Beans, 5–8% Provision
- [ ] **Blue Bottle Coffee** (bluebottlecoffee.com) — Premium Single-Origin, Affiliate-Programm?
- [ ] **Dripkit.coffee** — Pre-portioned specialty coffee, Affiliate-Program?
- [ ] **Barista Hustle** — Training + Produkte

#### Deutsche/EU Röstereien (direkte Partnerschaften)
- [ ] **Bergkaffee Probst** (bergkaffee.de) — Bayern, nachhaltig
- [ ] **Kaffee Kontor** (kaffee-kontor.com) — Hamburg, etabliert
- [ ] **Manu Kaffee** (manukaffee.de) — Berlin, Specialty
- [ ] **Rösterei Wildkaffee** — Lokal, Direct Trade
- *Strategie: Kontakt aufnehmen, Affiliate-Deal aushandeln (15–25% Provision möglich)*

#### Mühlen & Geräte (Hersteller direkt)
- [ ] **DeLonghi** — Affiliate-Programm für Espressomaschinen
- [ ] **Jura** — Vollautomatische Maschinen
- [ ] **Baratza** — Mühlen-Hersteller
- [ ] **Fellow** — Premium Kettles + Zubehör
- [ ] **AeroPress** — Offizielle Seite + Affiliate?

#### Newsletter-Tools & Services
- [ ] **Brevo** (brevo.com) — Newsletter-Lösung, Affiliate-Programm
- [ ] **Substack** — Falls Newsletter ausgelagert wird

### Umsetzung (Phasen)

**Phase 1 (Woche 1–2)**
- Amazon Partner Tag `kaffeewelt21-21` aktivieren ✓ (ERLEDIGT)
- 5 deutsche Röstereien anschreiben (Affiliate-Angebot)
- 3 Hersteller kontaktieren (DeLonghi, Jura, Baratza)

**Phase 2 (Woche 3–4)**
- Erste Rezepte mit Produkt-Links eingeben
- Glossar-Artikel mit Empfehlungen erweitern
- Expert-Pick-Box-Komponente bauen (falls nicht vorhanden)

**Phase 3 (Monat 2)**
- Newsletter mit Produkt-Tipps starten
- Sponsorship-Artikel schreiben ("Partner von...")
- Tracking: Welche Links konvertieren am besten?

### Tracking & Optimierung
- Vercel Analytics nutzen: Welche Affiliate-Links werden geklickt?
- A/B-Test: "Expert Pick" Box vs. Inline-Links
- Quartal-Review: Provisionen tracken, unprofitable Partner entfernen

### Wichtig: Transparenz & Compliance
- **Kennzeichnung**: Alle Affiliate-Links müssen als "Affiliate-Link" oder "Werbung" markiert sein (DSGVO/OWi)
- **Authentizität**: Nur Produkte empfehlen, die du selbst nutzen/kennst
- **Nicht aufdringlich**: Maximal 1–3 Links pro Artikel
- **User First**: Content vor Verkauf — der Leser soll Mehrwert haben

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
