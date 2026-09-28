# Aktiver Kontext

Last updated: 2026-09-28
Current branch: main
Current phase: plan

## Now
Der Implementierungsplan für den minimalen Node.js-HTTP-Service wartet auf fachliche und technische Prüfung.

## Aktive Spezifikation
- Spezifikation: [0001-tip-berechnung.md](../.specs/backlog/0001-tip-berechnung.md) (Draft, Backlog)
- Plan: [0001-tip-berechnung.plan.md](../.specs/backlog/0001-tip-berechnung.plan.md) (Not started)
- Aktuelle Aufgabe: Plan prüfen; noch keine Implementierung starten
- Akzeptanzkriterien im Fokus: AC-001 bis AC-008

## Kürzlich geändert
- HTTP-Vertrag für `POST /api/split`, Response-Felder und Dezimalstring-Ausgabe in der Spezifikation festgelegt.
- Achtstufigen TDD-Plan mit getrennten roten Tests und Implementierungsschritten angelegt.
- Node.js 24.21.0, npm 11.19.0 und `node:test` als lokalen Testkontext bestätigt.

## Offene Entscheidungen
- Keine; der Plan ist noch nicht durch den Nutzer freigegeben.

## Blocker / Fragen
- Vor T-001 sind Planfreigabe und ein ausdrückliches Startsignal erforderlich.
- Vor der Installation sind die Ask-first-Freigaben für Abhängigkeiten und Netzwerkzugriff einzuholen.

## Nächste Schritte
1. Plan auf falsche Schritte, Schichtengrenzen und Prüfbarkeit lesen.
2. Nach Freigabe optional den Plan committen; Git-Schreibzugriff vorher bestätigen lassen.
3. Erst auf ausdrückliches Startsignal T-001 beginnen und Spec samt Plan nach `active/` verschieben.

## Validierung
- Erledigt: Schnittstellenkonflikt aufgelöst, offizielle Express-, Node.js- und npm-Quellen geprüft, lokales Laufzeitinventar erhoben.
- Ausstehend: Quality Gates sind erst nach T-001 ausführbar; Planprüfung durch den Nutzer.
- Bekannte Abweichung: `npm.ps1` ist lokal blockiert; `npm.cmd` und `npx.cmd` funktionieren.
