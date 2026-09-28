# Systemmuster

## Architekturstil

Der `architecture:`-Schnappschuss in [AGENTS.md](../AGENTS.md) ist die einzige Quelle für Strukturfakten. Dieses Dokument hält Entscheidungen und ihre Gründe fest.

## Schlüsselentscheidungen
- Onion Architecture trennt Domäne, Anwendungsfälle, technische Adapter und HTTP-Schnittstelle; Abhängigkeiten zeigen nach innen. · 2026-09-28 · [Architekturschnappschuss](../AGENTS.md) · provenance: human (`/sdd-setup`, origin: stated, confirmedAt: 2026-09-28)
- `src/server.js` startet den Prozess, während `src/app.js` die ohne Netzwerk-Port testbare Express-Anwendung erstellt. · 2026-09-28 · [Architekturschnappschuss](../AGENTS.md) · provenance: human (`/sdd-setup`, origin: suggested, confirmedAt: 2026-09-28)

## Muster
- Die Domain verwendet skalierte Ganzzahlarithmetik mit `BigInt`; Rest-Cents werden deterministisch ab dem ersten Listeneintrag verteilt. · 2026-09-28 · [0001-tip-berechnung.2026-09-28.plan.md](../.specs/plan-archive/0001-tip-berechnung.2026-09-28.plan.md)
- Der Anwendungsservice validiert alle Eingaben gemeinsam und liefert feldbezogene Fehler ohne Berechnungsdaten zurück. · 2026-09-28 · [0001-tip-berechnung.2026-09-28.plan.md](../.specs/plan-archive/0001-tip-berechnung.2026-09-28.plan.md)
- Die HTTP-Schicht bleibt für JSON-Parsing, Fehlerstatus und Dezimalstring-Formatierung zuständig; `createApp()` ist portfrei testbar. · 2026-09-28 · [0001-tip-berechnung.2026-09-28.plan.md](../.specs/plan-archive/0001-tip-berechnung.2026-09-28.plan.md)
