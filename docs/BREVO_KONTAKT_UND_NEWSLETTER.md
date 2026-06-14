# Brevo: Kontakt und Newsletter

## Bereits aktiv

- Kontaktanfragen werden in Sanity als `Kontaktanfrage` gespeichert.
- Antworten können in Sanity vorbereitet werden.
- Der Versand bleibt gesperrt, solange Brevo und die Absenderadresse fehlen.

## Brevo einrichten

1. Brevo-Konto anlegen.
2. Unter **Absender & IP** die Domain `meine-kleine-kaffeewelt.de` authentifizieren.
3. Eine echte Absenderadresse anlegen, zum Beispiel
   `kontakt@meine-kleine-kaffeewelt.de`.
4. Unter **SMTP & API** einen API-Schlüssel erstellen.
5. Für den Newsletter eine Liste anlegen und deren numerische ID notieren.

## Vercel-Variablen

```text
BREVO_API_KEY=
BREVO_LIST_ID=
CONTACT_FROM_EMAIL=kontakt@meine-kleine-kaffeewelt.de
CONTACT_FROM_NAME=Meine kleine Kaffeewelt
CONTACT_REPLY_TO_EMAIL=kontakt@meine-kleine-kaffeewelt.de
CONTACT_REPLY_TOKEN=
```

`CONTACT_REPLY_TOKEN` ist ein langes, zufälliges Kennwort. Es wird beim
Versand aus dem Sanity Studio abgefragt. Der Brevo-Schlüssel wird niemals im
Studio oder Browser gespeichert.

## Antwort senden

1. Kontaktanfrage in Sanity öffnen.
2. Antwort-Betreff und Antworttext eintragen.
3. Dokument veröffentlichen.
4. Im Aktionsmenü **Antwort senden** wählen.
5. Das Versand-Kennwort eingeben.

Nach erfolgreichem Versand setzt Sanity den Status auf **Bearbeitet** und
speichert Versandzeit sowie Brevo-Nachrichten-ID.

## Newsletter

Die bestehende Newsletter-Anmeldung verwendet ebenfalls `BREVO_API_KEY` und
`BREVO_LIST_ID`. Vor dem Start muss in Brevo ein Double-Opt-in-Ablauf aktiviert
und getestet werden. Kontaktanfragen werden niemals automatisch in die
Newsletter-Liste übernommen.
