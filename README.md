# Meine kleine Kaffeewelt
**Domain**: meine-kleine-kaffeewelt.de  
**CMS**: Publii (lokal)  
**Stand**: 2026-05-28

---

## Ordnerstruktur

```
Kaffeewelt/
│
├── _recherche/          ← SEO-Recherche (Keyword-Cluster, Strategie, Kalender etc.)
│
└── site/
    ├── content/         ← Alle Artikel als Markdown (vor dem Einpflegen in Publii)
    │   ├── kaffeezubereitung/    ← Cluster 1 + 2 (Pillar + Filterkaffee)
    │   ├── kaffeewissen/         ← Cluster 5 + 7 (Sorten, Gesundheit)
    │   ├── kaffeemuhle/          ← Cluster 4
    │   ├── kaffeeroestung/       ← Cluster 6
    │   ├── kaffeezubehor/        ← Cluster 9
    │   ├── cold-brew-kaffee/     ← Cluster 8
    │   ├── blog/                 ← Alle Blog-Artikel chronologisch
    │   └── seiten/               ← Statische Seiten
    │       ├── ueber-mich/
    │       ├── impressum/
    │       ├── datenschutz/
    │       └── kontakt/
    │
    ├── assets/
    │   ├── bilder/      ← Artikel-Bilder (WebP, optimiert)
    │   ├── logo/        ← Logo-Dateien
    │   └── favicon/     ← Favicon + App Icons
    │
    └── seo/
        ├── schema/      ← JSON-LD Schema-Snippets
        └── sitemap/     ← Sitemap-Vorlagen

```

---

## Nächste Schritte

1. **Publii einrichten** — Site-Name, Domain, Theme
2. **Pflichtseiten** erstellen — Impressum, Datenschutz
3. **Über mich** schreiben
4. **Ersten Artikel** schreiben — Cold Brew (Sommer-Timing!)
5. **Hosting** einrichten — Netlify empfohlen (kostenlos)

---

## Wichtige Dateien

| Datei | Inhalt |
|-------|--------|
| `_recherche/keyword-cluster.md` | 9 Cluster, 87 Keywords |
| `_recherche/CONTENT-CALENDAR.md` | 26 Artikel-Ideen, 12 Monate |
| `_recherche/IMPLEMENTATION-ROADMAP.md` | Schritt-für-Schritt Checkliste |
| `_recherche/SEO-STRATEGY.md` | KPIs, Linkbuilding, Schema |
| `_recherche/SITE-STRUCTURE.md` | URLs, Navigation, Meta-Templates |
