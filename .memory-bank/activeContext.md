# Aktiver Kontext

Last updated: 2026-09-28
Current branch: feature/tip-splitter
Current phase: idle

## Now
Die erste Tip-Splitter-Spezifikation ist implementiert und abgeschlossen.

## Aktive Spezifikation
- Keine.

## Kürzlich geändert
- [0001-tip-berechnung.md](../.specs/done/0001-tip-berechnung.md) auf `Implemented` gesetzt; [Plan](../.specs/plan-archive/0001-tip-berechnung.2026-09-28.plan.md) archiviert und eingefroren.

## Entscheidungen in Arbeit
- Keine.

## Blocker / Fragen
- Keine.

## Nächste Schritte
1. Nächste Änderung als neue Spezifikation im Backlog erfassen.

## Validierung
- `/sdd-compile`: `READY`.
- `npx.cmd eslint . --max-warnings=0` und `npm.cmd test`: erfolgreich; 16 von 16 Tests bestanden.
- Bekannte Abweichung: `npm.ps1` ist lokal blockiert; `npm.cmd` und `npx.cmd` funktionieren.
