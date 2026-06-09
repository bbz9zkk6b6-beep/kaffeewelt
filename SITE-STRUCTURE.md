# Site-Struktur — Meine kleine Kaffeewelt
**Domain**: meine-kleine-kaffeewelt.de  
**CMS**: Publii | **Erstellt**: 2026-05-28

---

## URL-Hierarchie

```
meine-kleine-kaffeewelt.de/
│
├── /                          → Startseite
├── /ueber-mich/               → Persönliche Geschichte, Foto, E-E-A-T
├── /kontakt/                  → Kontaktformular
├── /impressum/                → Pflicht (DE-Recht)
├── /datenschutz/              → Pflicht (DSGVO)
│
├── /kaffeezubereitung/        ← PILLAR (Cluster 1)
│   ├── /filterkaffee-zubereitung/
│   ├── /espresso-zubereiten/
│   ├── /cold-brew-kaffee/
│   ├── /french-press-anleitung/
│   └── /aeropress-anleitung/
│
├── /kaffeewissen/             ← PILLAR (Cluster 5+7)
│   ├── /kaffeesorten/
│   ├── /arabica-vs-robusta/
│   ├── /koffein-kaffee/
│   ├── /kaffee-gesund/
│   └── /kaffee-anbaugebiete/
│
├── /kaffeemuhle/              ← PILLAR (Cluster 4)
│   ├── /kaffeemuhle-test/
│   ├── /mahlgrad-einstellen/
│   └── /handmuhle-empfehlung/
│
├── /kaffeeroestung/           ← PILLAR (Cluster 6)
│   ├── /kaffee-selbst-rosten/
│   ├── /roestgrade/
│   └── /kleine-roesterei-empfehlung/
│
├── /kaffeezubehor/            ← PILLAR (Cluster 9)
│   ├── /gooseneck-wasserkocher/
│   ├── /kaffeewaage-empfehlung/
│   └── /french-press-empfehlung/
│
└── /blog/                     ← Alle Artikel chronologisch
    ├── /cold-brew-selber-machen/
    ├── /kaffee-mythen/
    ├── /kaffee-cupping-anleitung/
    └── ...
```

---

## Navigationsstruktur (Hauptmenü)

```
[Logo] Meine kleine Kaffeewelt

Hauptnavigation:
• Zubereitung  • Kaffeewissen  • Ausrüstung  • Röstung  • Blog  • Über mich
```

---

## Interne Verlinkungsregeln

1. **Pillar → Cluster**: Jede Pillar-Seite verlinkt auf alle Sub-Artikel des Clusters
2. **Cluster → Pillar**: Jeder Sub-Artikel verlinkt zurück zur Pillar-Seite
3. **Cluster → Cluster**: Thematisch verwandte Artikel verlinken sich gegenseitig
4. **Blog → Pillar**: Blog-Artikel verlinken immer auf mind. 1–2 Pillar-Seiten

### Beispiel-Verlinkung: „Cold Brew Anleitung"
- → Kaffeezubereitung (Pillar)
- → Kaffeemühle (Mahlgrad für Cold Brew)
- → Kaffeesorten (Welcher Kaffee eignet sich für Cold Brew?)
- → Kaffeewaage (Verhältnis abmessen)

---

## Kategorien (Publii Tags/Kategorien)

| Kategorie | Slug | Beschreibung |
|-----------|------|--------------|
| Zubereitung | /kategorie/zubereitung/ | How-To Artikel |
| Kaffeewissen | /kategorie/wissen/ | Informations-Artikel |
| Ausrüstung | /kategorie/ausruestung/ | Tests und Empfehlungen |
| Röstung | /kategorie/roestung/ | Rösterei und Röstgrade |
| Rezepte | /kategorie/rezepte/ | Kaffee-Rezepte |
| Reisen | /kategorie/reisen/ | Kaffee & Reise (später) |

---

## Meta-Daten Template

### Titel-Formate
- How-To: „[Methode] richtig machen – Schritt für Schritt | Meine kleine Kaffeewelt"
- Test: „[Produkt] Test [Jahr]: Meine ehrliche Meinung"
- Wissen: „[Thema] erklärt: Alles was du wissen musst"
- Vergleich: „[A] vs [B]: Was ist besser?"

### Meta Description Template
„[Primäres Keyword] – [Was der Leser lernt/bekommt]. [Persönlicher Zusatz oder Neugier-Trigger]. [CTA: Jetzt lesen / Hier erfahren]"

**Länge**: 140–160 Zeichen

### Beispiel
**Title**: „Cold Brew Kaffee selber machen – mein einfaches Rezept | Meine kleine Kaffeewelt"  
**Description**: „Cold Brew zuhause zubereiten ist einfacher als du denkst. Mein bewährtes Rezept mit Verhältnis, Ziehzeit und den besten Tricks für perfekten Eiskaffee."
