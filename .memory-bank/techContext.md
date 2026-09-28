# Technischer Kontext

## Stack
- JavaScript auf Node.js; lokal geprüft mit Node.js 24.21.0
- Express.js als HTTP-Framework
- npm als Paketmanager und Skript-Runner; lokal geprüft mit npm 11.19.0
- ESLint für statische Prüfungen
- Der eingebaute `node:test`-Runner für Unit- und HTTP-Integrationstests

## Build / Ausführung
- Abhängigkeiten installieren: `npm install`
- HTTP-Service starten: `npm start`
- Prozesseinstiegspunkt: `src/server.js`
- Portfrei testbare Anwendung: `src/app.js` mit `createApp()`
- VS Code: `Debug Tip Splitter` starts `src/server.js` on port 3000; workspace tasks expose start, test, and lint commands.

## Test
- Unit- und Integrationstests ausführen: `npm test`
- Direkter Testbefehl hinter dem npm-Skript: `node --test`

## Quality Gates
Nach jedem abgeschlossenen Implementierungsschritt in dieser Reihenfolge ausführen:

1. `npx eslint . --max-warnings=0`
2. `npm test`

Beide Befehle müssen ohne Warnungen und Fehler enden.

## Randbedingungen
- Die Anwendung folgt Onion Architecture; Abhängigkeiten zeigen zur Domäne nach innen.
- Express bleibt auf die HTTP-Schnittstellenschicht begrenzt.
- Geldwerte werden intern als Centwerte mit `BigInt` berechnet und an der HTTP-Grenze als Dezimalstrings formatiert.
- Der Anwendungsservice aggregiert Validierungsfehler, bevor die Domain aufgerufen wird.
- In der lokalen Windows-PowerShell müssen npm und npx wegen der Ausführungsrichtlinie über `npm.cmd` und `npx.cmd` aufgerufen werden.
