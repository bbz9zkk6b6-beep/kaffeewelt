# Content-Planung

## Struktur

```
_content/
├── artikel/
│   ├── woche-01/     → fertige Artikel-Texte, bereit zum Einpflegen
│   ├── woche-02/
│   └── ...
├── news/
│   ├── woche-01/     → fertige News-Texte
│   ├── woche-02/
│   └── ...
├── rezepte/
│   ├── woche-01/     → fertige Rezepte
│   ├── woche-02/
│   └── ...
└── glossar/          → Glossar-Einträge (kein Wochenrhythmus)
```

## Workflow

1. Briefing aus `_recherche/` nehmen
2. Artikel-Autor + Humanizer → fertiger Text
3. Text als `.md` in die passende Woche ablegen
4. Einpflegen in `lib/content/articles.ts` (oder Sanity)

## Status-Prefix für Dateinamen

- `ENTWURF_` = noch nicht humanized
- `FERTIG_` = bereit zum Einpflegen
