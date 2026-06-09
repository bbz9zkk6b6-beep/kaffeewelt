# Statamic-Startkonzept

## 1. Zielbild

Ein schlankes Statamic-System, das:

- redaktionell sauber pflegbar ist
- kleine Template- und Strukturänderungen leicht zulässt
- später wahlweise klassisch mit Antlers oder headless mit Next nutzbar bleibt
- ohne doppelte Inhaltslogik auskommt

## 2. Basisstruktur

Empfohlene Kernbereiche:

- `content/collections/`
- `content/taxonomies/`
- `content/globals/`
- `resources/blueprints/`
- `resources/views/`
- `public/assets/`

Dazu von Anfang an sauber trennen:

- redaktionelle Inhalte
- Felddefinitionen
- Templates
- Assets
- technische Konfiguration

## 3. Empfohlenes Datenmodell

Collections:

- `pages`
- `posts` oder projektspezifisch `reiseberichte`
- optionale Spezial-Collections wie `orte`, `guide`, `galerie`

Taxonomien:

- `kategorien`
- `themen`
- `destinationen` oder projektspezifische Orte/Cluster

Globals:

- `site_settings`
- `seo`
- optional `navigation`, falls nicht über Struktur gepflegt

Wichtig:

- keine parallelen Legacy-Felder und Taxonomie-Felder
- keine freien Textfelder für Dinge, die eigentlich Taxonomien sind
- keine Templates, die Felder erwarten, die im Blueprint nicht abgesichert sind

## 4. Blueprint-Regeln

Von Anfang an:

- ein klarer `page`-Blueprint
- pro Collection genau ein aktiver Blueprint
- Felder konsistent benennen
- Slugs, SEO, Excerpts und Vorschaubilder standardisieren
- wiederkehrende Inhaltsbausteine als Sets oder Replicator-/Bard-Sets definieren

Wichtig:

- keine doppelten Blueprint-Dateien für denselben Inhaltstyp
- keine Felder nur "für später" anlegen
- kein Wildwuchs bei `title`, `headline`, `lead`, `excerpt`, `description`

## 5. Template-Logik

Antlers nur so komplex wie nötig.

Regeln:

- Listenansicht und Detailansicht sauber trennen
- keine stillen Annahmen über fehlende URLs
- keine `{{ url }}`-Verwendung bei Collections ohne Route oder Mount
- Partials für wiederkehrende UI-Blöcke
- Layout als stabiles Grundgerüst, nicht als Ablage für Sonderfälle

## 6. Routing

Früh festlegen:

- welche Collections echte Detailseiten haben
- welche nur Index- oder Listeninhalte sind
- welche statischen Seiten über `pages` laufen
- welche Taxonomien öffentliche Archivseiten bekommen

Faustregel:

- wenn Einträge verlinkt werden, brauchen sie eine klare URL-Strategie
- wenn sie keine Detailseite haben, dürfen Templates nicht so tun, als ob

## 7. Addons

Minimum:

- ein SEO-Addon, aber nur eins
- optional Formularlösung
- optional Caching je nach Projektgröße

Wichtig:

- nicht zwei SEO-Systeme nebeneinander
- Addons dokumentieren
- Addon-Felder direkt in Blueprints sauber einplanen

## 8. Headless-Entscheidung

Für klassische Sites:

- Statamic rendert direkt mit Antlers

Für Frontend getrennt:

- Statamic bleibt einzige Inhaltsquelle
- Frontend liest per REST API
- keine direkte Dateileselogik im Frontend als Dauerlösung

Faustregel:

- Dateisystem-Reads sind okay für Umbauphasen
- für Livebetrieb lieber API plus Caching

## 9. Flaschenhälse vermeiden

Früh vermeiden:

- doppelte Inhaltsmodelle
- Legacy-Felder neben Taxonomien
- nicht definierte Seiten- oder Route-Logik
- mehrere Quellen für dieselbe Navigation
- Frontend-Abhängigkeit von rohen Exportdateien
- Build-Setups, die Fehler dauerhaft wegdrücken

## 10. Arbeitsweise mit mir und Claude

Empfohlene Reihenfolge:

1. Bestand lesen
2. Zielbild festziehen
3. Datenmodell prüfen
4. erst dann Templates anpassen
5. erst danach Frontend-Anbindung oder Migration

Rollen:

- mit mir: Code, Struktur, konkrete Änderungen, Risikoanalyse
- mit Claude: Gegenprüfung, Architekturentscheidungen, Variantenvergleich

## 11. Standard-Check vor jedem neuen Projekt

Vor Start festlegen:

- Welche Collections gibt es?
- Welche davon haben Detailseiten?
- Welche Taxonomien sind Pflicht?
- Welche Globals braucht das Projekt wirklich?
- Welches SEO-Addon ist gesetzt?
- Antlers oder Headless?
- Falls Headless: REST oder GraphQL?
- Wie läuft Preview?
- Wie läuft Caching?
- Welche Inhalte sind redaktionelle Quelle?
