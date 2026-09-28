# Systemmuster

## Architekturstil

Der `architecture:`-Schnappschuss in [AGENTS.md](../AGENTS.md) ist die einzige Quelle für Strukturfakten. Dieses Dokument hält Entscheidungen und ihre Gründe fest.

## Schlüsselentscheidungen
- Onion Architecture trennt Domäne, Anwendungsfälle, technische Adapter und HTTP-Schnittstelle; Abhängigkeiten zeigen nach innen. · 2026-09-28 · [Architekturschnappschuss](../AGENTS.md) · provenance: human (`/sdd-setup`, origin: stated, confirmedAt: 2026-09-28)
- `src/server.js` startet den Prozess, während `src/app.js` die ohne Netzwerk-Port testbare Express-Anwendung erstellt. · 2026-09-28 · [Architekturschnappschuss](../AGENTS.md) · provenance: human (`/sdd-setup`, origin: suggested, confirmedAt: 2026-09-28)

## Muster
- Noch keine implementierten Muster; die geplanten Grenzen werden bei der ersten Umsetzung verifiziert.
