# README

# info:
- div ids verwenden

# datenquelle:
- übersicht: https://anwendungen.pharmnet-bund.de/lieferengpassmeldungen/faces/public/meldungen.xhtml
- RSS-Feed: https://anwendungen.pharmnet-bund.de/lieferengpassmeldungen/rss

# Aufbau daten (geschrieben von claude.ai)


  PZN: "00822819",              // Pharmazentralnummer (Eindeutige Medikamenten-ID)
  ENR: "2152997",               // Einreichungsnummer
  Bearbeitungsnummer: "LE2024004233",

  // Zeitliche Informationen
  Beginn: "21.11.2024",         // Start des Lieferengpasses
  Ende: "31.01.2025",           // Voraussichtliches Ende
  "Datum der letzten Meldung": "21.11.2024",

  // Medikamenteninformationen
  Arzneimittlbezeichnung: "RISPERDAL CONSTA 50 mg",
  "Atc Code": "N05AX08",
  Wirkstoffe: "Risperidon",
  
  // Status und Art
  Meldungsart: "Erstmeldung",   // oder "Änderungsmeldung"
  Krankenhausrelevant: "nein",
  
  // Kontaktinformationen
  Zulassungsinhaber: "JANSSEN-CILAG GmbH",
  Telefon: "+49 2137 955-2288",
  "E-Mail": "QS-DE@its.jnj.com"

# CORS Problem
//source https://dev.to/codeofrelevancy/how-to-set-up-a-proxy-server-in-react-dealing-with-cors-87e
//https://stackoverflow.com/questions/31394043/rewriting-path-with-http-proxy-middleware