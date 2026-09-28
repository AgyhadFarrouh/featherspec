# Plan — Faire Aufteilung einer Restaurantrechnung

**Spec:** [0001-tip-berechnung.md](0001-tip-berechnung.md)
**Status:** Not started
**Last updated:** 2026-09-28
**Current step:** T-001

## Ansatz

Der Service wird entlang der vorgesehenen Onion-Architecture als Express-5-Anwendung aufgebaut: reine Ganzzahlarithmetik mit `BigInt` im Domänenmodul, Validierung und Ablaufsteuerung im Anwendungsservice sowie JSON-Übersetzung in der HTTP-Schicht. Die Schritte trennen gemäß der TDD-Vorgabe jeden roten Test von seiner Implementierung; nach jedem Testschritt wird vor der Implementierung angehalten. Bei der Umsetzung werden `.memory-bank/activeContext.md`, bei bestätigten Strukturänderungen außerdem der Architekturschnappschuss und die betroffenen Memory-Bank-Dateien synchronisiert.

**Quality gates:** `npx eslint . --max-warnings=0` und `npm test`

## Recherche

- Survey: Es existieren noch kein `package.json`, kein Quellcode und keine Tests. Geplant sind die Einstiegspunkte `src/server.js` und `src/app.js`; Express bleibt auf `src/interfaces/http/` begrenzt. Lokal verfügbar sind Node.js `v24.21.0` und npm `11.19.0`.
- Annahme: Eingabewerte werden nur verarbeitet, wenn sie als endliche, sicher repräsentierbare JSON-Zahlen vorliegen. Geldwerte und Prozentsätze werden danach ohne binäre Fließkommaarithmetik in skalierte Ganzzahlen überführt.
- [Express routing](https://expressjs.com/en/guide/routing/) — bestätigt `app.post()` und `express.Router()` für den POST-Endpunkt; abgerufen am 2026-09-28.
- [Express 5 API: express.json](https://expressjs.com/en/5x/api/express/) — bestätigt JSON-Parsing und die Übergabe von Parserfehlern an die Fehlerbehandlung; abgerufen am 2026-09-28.
- [Express error handling](https://expressjs.com/en/guide/error-handling/) — bestätigt die nach den Routen registrierte Fehler-Middleware; abgerufen am 2026-09-28.
- [Node.js Test Runner](https://nodejs.org/api/test.html) — bestätigt den stabilen eingebauten `node:test`-Runner und `node --test`; abgerufen am 2026-09-28.
- [npm package.json scripts](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#scripts) — bestätigt die Script-Einträge für `npm start` und `npm test`; abgerufen am 2026-09-28.
- [npm package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json) — bestätigt das durch die Installation erzeugte Lockfile für reproduzierbare Abhängigkeiten; abgerufen am 2026-09-28.

## Schritte

### T-001 — Projektgerüst und Schichtengrenzen anlegen

- [ ] **Covers:** Scaffolding, keine Akzeptanzkriterien
- **Do:** `package.json`, Lockfile und ESLint-Konfiguration anlegen; Express und ESLint nach separater Freigabe der Abhängigkeiten installieren; `src/server.js`, `src/app.js`, `src/domain/`, `src/application/` und `src/interfaces/http/` mit importierbaren `Not implemented`-Stubs sowie `npm start` und `npm test` einrichten. Danach den Architekturschnappschuss gemäß `/sdd-architecture-update` synchronisieren.
- **Verify:** `npx eslint . --max-warnings=0; npm test`
- **Verified:** —
- **Notes:** Vor `npm install` sind wegen Abhängigkeits- und Netzwerkzugriff die Ask-first-Freigaben aus `AGENTS.md` einzuholen.

### T-002 — Domänenregeln als rote Tests festlegen

- [ ] **Covers:** AC-002, AC-003, AC-004, AC-006
- **Do:** Mit `node:test` fokussierte Unit-Tests für kaufmännische Trinkgeldrundung, Rest-Cent-Reihenfolge, Summenerhaltung, null Prozent und eine Person schreiben; AC-IDs stehen in den Testnamen und der Stub scheitert mit `Not implemented`.
- **Verify:** `node --test test/domain/splitBill.test.js` muss am `Not implemented`-Stub rot sein.
- **Verified:** —
- **Notes:** Nach dem roten Lauf gemäß TDD-Vorgabe zur Nutzerbestätigung anhalten.

### T-003 — Cent-genaue Domänenberechnung implementieren

- [ ] **Covers:** AC-002, AC-003, AC-004, AC-006
- **Do:** Im Domänenmodul Rechnungsbetrag und Prozentwert in skalierte Ganzzahlen überführen, das Trinkgeld kaufmännisch runden, den Gesamtbetrag in Cent verteilen und Rest-Cents deterministisch den ersten Listeneinträgen zuweisen. Sichtbare Geldwerte erst an der Außengrenze formatieren.
- **Verify:** `npx eslint . --max-warnings=0; npm test`
- **Verified:** —
- **Notes:** —

### T-004 — Eingabevalidierung als rote Tests festlegen

- [ ] **Covers:** AC-005, AC-006
- **Do:** Unit-Tests für fehlende, nicht endliche, unsicher repräsentierbare, falsch skalierte oder außerhalb der Fachregeln liegende Werte schreiben; mehrere fehlerhafte Felder müssen gemeinsam und feldbezogen gemeldet werden. Der Anwendungsservice-Stub bleibt `Not implemented`.
- **Verify:** `node --test test/application/splitBillService.test.js` muss am `Not implemented`-Stub rot sein.
- **Verified:** —
- **Notes:** Nach dem roten Lauf gemäß TDD-Vorgabe zur Nutzerbestätigung anhalten.

### T-005 — Validierung und Anwendungsservice implementieren

- [ ] **Covers:** AC-005, AC-006
- **Do:** Alle Eingaben gemeinsam validieren, bei Fehlern ein strukturiertes Ergebnis ohne Berechnungsdaten liefern und bei gültigen Eingaben das Domänenmodul aufrufen. Fehlertexte benennen jeweils das betroffene Eingabefeld.
- **Verify:** `npx eslint . --max-warnings=0; npm test`
- **Verified:** —
- **Notes:** —

### T-006 — HTTP-Vertrag als rote Integrationstests festlegen

- [ ] **Covers:** AC-001, AC-005, AC-007, AC-008
- **Do:** Integrationstests gegen die portfrei erzeugte Express-App schreiben: Status 200 und exakt die drei Erfolgsfelder mit Dezimalstrings, Status 400 für fachlich ungültige Eingaben und syntaktisch ungültiges JSON, keine Ergebnisfelder im Fehlerfall sowie Antwort unter 1.000 Millisekunden. Der HTTP-Stub antwortet weiterhin nicht implementiert.
- **Verify:** `node --test test/interfaces/http/splitRoute.test.js` muss am nicht implementierten Endpoint rot sein.
- **Verified:** —
- **Notes:** Nach dem roten Lauf gemäß TDD-Vorgabe zur Nutzerbestätigung anhalten.

### T-007 — HTTP-Endpoint und Fehlerübersetzung implementieren

- [ ] **Covers:** AC-001, AC-005, AC-007, AC-008
- **Do:** `express.json()`, `POST /api/split`, die Übersetzung zwischen HTTP und Anwendungsservice sowie eine abschließende Fehler-Middleware implementieren. Erfolgswerte werden als Dezimalstrings ausgegeben; Validierungs- und JSON-Parserfehler liefern Status 400 und ausschließlich eine Fehlerliste.
- **Verify:** `npx eslint . --max-warnings=0; npm test`
- **Verified:** —
- **Notes:** —

### T-008 — Gesamtnachweis und Dokumentation synchronisieren

- [ ] **Covers:** AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008
- **Do:** Alle Traceability-Zellen mit realen Pfaden und entscheidenden Tests füllen, die vollständigen Quality Gates ausführen und `.memory-bank/activeContext.md`, `.memory-bank/techContext.md` sowie bei bestätigtem Strukturdrift Architekturschnappschuss und `systemPatterns.md` auf den implementierten Stand bringen.
- **Verify:** `npx eslint . --max-warnings=0; npm test`
- **Verified:** —
- **Notes:** —

## Traceability

| Akzeptanzkriterium | Schritte | Code / Dateien | Test | State |
| --- | --- | --- | --- | --- |
| AC-001 | T-006, T-007, T-008 | _(wird bei Umsetzung ergänzt)_ | _(wird nach rotem Lauf ergänzt)_ | open |
| AC-002 | T-002, T-003, T-008 | _(wird bei Umsetzung ergänzt)_ | _(wird nach rotem Lauf ergänzt)_ | open |
| AC-003 | T-002, T-003, T-008 | _(wird bei Umsetzung ergänzt)_ | _(wird nach rotem Lauf ergänzt)_ | open |
| AC-004 | T-002, T-003, T-008 | _(wird bei Umsetzung ergänzt)_ | _(wird nach rotem Lauf ergänzt)_ | open |
| AC-005 | T-004, T-005, T-006, T-007, T-008 | _(wird bei Umsetzung ergänzt)_ | _(wird nach rotem Lauf ergänzt)_ | open |
| AC-006 | T-002, T-003, T-004, T-005, T-008 | _(wird bei Umsetzung ergänzt)_ | _(wird nach rotem Lauf ergänzt)_ | open |
| AC-007 | T-006, T-007, T-008 | _(wird bei Umsetzung ergänzt)_ | _(wird nach rotem Lauf ergänzt)_ | open |
| AC-008 | T-006, T-007, T-008 | _(wird bei Umsetzung ergänzt)_ | _(wird nach rotem Lauf ergänzt)_ | open |

## Session handoff

- **Done so far:** Spec-Schnittstellenvertrag bestätigt; Repository, Laufzeit und offizielle Quellen geprüft; Plan erstellt.
- **Next action:** Plan prüfen, danach T-001 nur auf ausdrückliches Startsignal beginnen.
- **Open decisions:** —
- **Baseline:** _(wird beim Start der Umsetzung gesetzt)_
- **Environment:** Unter Windows PowerShell blockiert die lokale Ausführungsrichtlinie `npm.ps1`; Befehle werden in dieser Umgebung über `npm.cmd` beziehungsweise `npx.cmd` ausgeführt.