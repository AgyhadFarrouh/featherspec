# Faire Aufteilung einer Restaurantrechnung

**Status:** Implemented
**Plan:** [0001-tip-berechnung.2026-09-28.plan.md](../plan-archive/0001-tip-berechnung.2026-09-28.plan.md)

## 1. Zusammenfassung

Der Service berechnet aus Rechnungsbetrag, Trinkgeld-Prozentsatz und Personenanzahl den gesamten Trinkgeldbetrag und eine Cent-genaue Liste der von den einzelnen Personen zu zahlenden Beträge.

## 2. Ziel und Problem

Restaurantgäste sollen innerhalb weniger Sekunden erkennen können, welchen Betrag jede Person inklusive Trinkgeld zahlt. Die Berechnung soll Kopfrechnen vermeiden und trotz unvermeidbarer Rundungsreste eine nachvollziehbare, vollständig aufgehende Verteilung liefern.

## 3. Nutzer und Rollen

- Restaurantgäste verwenden die Berechnung gemeinsam am Tisch.
- Es gibt nur eine Nutzerrolle; Anmeldung und Berechtigungen sind nicht erforderlich.

## 4. Umfang

### Im Umfang

- Entgegennahme von Rechnungsbetrag, Trinkgeld-Prozentsatz und Personenanzahl.
- Berechnung und kaufmännische Rundung des gesamten Trinkgeldbetrags.
- Gleichmäßige, Cent-genaue Verteilung des Gesamtbetrags inklusive Trinkgeld.
- Ausgabe einer geordneten Liste aller Einzelbeträge, des gesamten Trinkgeldbetrags und des Gesamtbetrags inklusive Trinkgeld.
- Vollständige Prüfung und verständliche Ablehnung ungültiger Eingaben.

### Außerhalb des Umfangs

- Anmeldung oder Nutzerkonten — weil die erste Version ohne personenbezogene Nutzung auskommt.
- Speicherung von Eingaben oder Ergebnissen — weil nur eine unmittelbare Berechnung benötigt wird.
- Währungsumrechnung — weil alle Beträge derselben, vom Service nicht interpretierten Währungseinheit angehören.
- Unterschiedliche Bestellungen oder individuelle Anteile pro Person — weil die Rechnung in der ersten Version gleichmäßig geteilt wird.

## 5. Fachlicher Ablauf

1. Der Nutzer gibt den Rechnungsbetrag, den Trinkgeld-Prozentsatz und die Personenanzahl an.
2. Der Service prüft alle drei Angaben gemeinsam.
3. Der Service berechnet den Trinkgeldbetrag und rundet ihn kaufmännisch auf zwei Nachkommastellen.
4. Der Service addiert Rechnungsbetrag und gerundeten Trinkgeldbetrag.
5. Der Service verteilt den Gesamtbetrag in Cent auf die Personen; Rest-Cents erhalten die ersten Personen in der Ergebnisreihenfolge.
6. Der Service liefert die geordnete Liste der Einzelbeträge sowie Trinkgeld- und Gesamtbetrag zurück.

## 6. Fachregeln

- Der Rechnungsbetrag muss größer als 0 sein und darf höchstens zwei Nachkommastellen haben.
- Der Trinkgeld-Prozentsatz muss zwischen 0 und 100 einschließlich liegen und darf höchstens zwei Nachkommastellen haben.
- Die Personenanzahl muss eine positive ganze Zahl sein.
- Der gesamte Trinkgeldbetrag wird vor der Aufteilung kaufmännisch auf zwei Nachkommastellen gerundet.
- Jeder Einzelbetrag besitzt genau zwei Nachkommastellen.
- Nicht gleichmäßig teilbare Rest-Cents werden, beginnend beim ersten Listeneintrag, jeweils einzeln verteilt.
- Die Summe aller Einzelbeträge muss dem Rechnungsbetrag zuzüglich des gerundeten Trinkgeldbetrags entsprechen.

## 7. Datenanforderungen

### Eingaben

- Rechnungsbetrag: verpflichtender positiver Geldbetrag mit höchstens zwei Nachkommastellen.
- Trinkgeld-Prozentsatz: verpflichtender Wert von 0 bis 100 mit höchstens zwei Nachkommastellen.
- Personenanzahl: verpflichtende positive ganze Zahl.

### Ergebnisse

- Geordnete Liste mit genau einem auf zwei Nachkommastellen ausgewiesenen Betrag je Person.
- Gesamter, auf zwei Nachkommastellen ausgewiesener Trinkgeldbetrag.
- Gesamtbetrag inklusive Trinkgeld mit zwei Nachkommastellen.

Die Berechnung benötigt keine personenbezogenen oder dauerhaft zu speichernden Daten.

## 8. Nichtfunktionale Anforderungen

- Eine vollständige Anfrage muss spätestens 1.000 Millisekunden nach ihrer Annahme beantwortet sein.
- Gleiche Eingaben müssen dieselbe geordnete Verteilung ergeben.

## 9. Fehlerfälle und Grenzfälle

- Fehlt mindestens eine Pflichtangabe oder ist mindestens eine Angabe ungültig, wird die gesamte Berechnung abgelehnt.
- Die Ablehnung benennt jede fehlende oder ungültige Angabe verständlich und enthält kein Berechnungsergebnis.
- Ein Trinkgeld-Prozentsatz von 0 ist gültig und führt zu einem Trinkgeldbetrag von 0,00.
- Eine Personenanzahl von 1 ist gültig; diese Person zahlt den vollständigen Gesamtbetrag.
- Entstehende Bruchteile eines Cents beim Trinkgeld werden vor der Aufteilung kaufmännisch gerundet.
- Entstehende Rest-Cents bei der Aufteilung werden nach der festgelegten Listenreihenfolge verteilt.

## 10. Akzeptanzkriterien

### AC-001 — Vollständiges Ergebnis

Bei gültigen Eingaben muss das System eine geordnete Liste mit genau einem Einzelbetrag je Person, den gesamten Trinkgeldbetrag und den Gesamtbetrag inklusive Trinkgeld liefern. Sämtliche Geldbeträge müssen mit genau zwei Nachkommastellen ausgewiesen sein.

### AC-002 — Rundung des Trinkgelds

Wenn die Berechnung des Trinkgelds Bruchteile eines Cents ergibt, muss das System den gesamten Trinkgeldbetrag vor der Aufteilung kaufmännisch auf zwei Nachkommastellen runden.

### AC-003 — Verteilung von Rest-Cents

Wenn der Gesamtbetrag nicht gleichmäßig in Cent auf alle Personen teilbar ist, muss das System die Rest-Cents einzeln und in aufsteigender Reihenfolge den ersten Personen der Ergebnisliste zuweisen.

**Beispiel:** Gegeben sind ein Rechnungsbetrag von 100,00, ein Trinkgeld-Prozentsatz von 10 und drei Personen. Wenn der Service die Rechnung aufteilt, dann beträgt das gesamte Trinkgeld 10,00, der Gesamtbetrag 110,00 und die geordnete Liste der Einzelbeträge lautet 36,67, 36,67 und 36,66.

### AC-004 — Erhaltung des Gesamtbetrags

Für jedes gültige Ergebnis muss die Summe aller Einzelbeträge exakt dem ausgewiesenen Gesamtbetrag inklusive des gerundeten Trinkgelds entsprechen.

### AC-005 — Ablehnung ungültiger Eingaben

Wenn Pflichtangaben fehlen oder gegen mindestens eine Eingaberegel verstoßen, muss das System die gesamte Berechnung ablehnen, jede betroffene Angabe verständlich benennen und darf kein Berechnungsergebnis liefern.

### AC-006 — Gültige Grenzwerte

Bei einem Trinkgeld-Prozentsatz von 0 oder einer Personenanzahl von 1 muss das System ein reguläres Ergebnis nach allen Rundungs- und Summenregeln liefern.

### AC-007 — Antwortzeit

Für jede vollständige Anfrage muss das System spätestens 1.000 Millisekunden nach Annahme der Anfrage ein Ergebnis oder eine Ablehnung bereitstellen.

### AC-008 — HTTP-Schnittstellenvertrag

Bei einem gültigen JSON-Objekt mit `amount`, `tipPercent` und `peopleCount` muss `POST /api/split` mit HTTP-Status 200 antworten. Die JSON-Antwort muss ausschließlich `perPerson`, `totalTip` und `totalAmount` enthalten; alle darin enthaltenen Geldwerte müssen Dezimalstrings mit genau zwei Nachkommastellen sein. Bei ungültigen Eingaben oder syntaktisch ungültigem JSON muss der Endpoint mit HTTP-Status 400 und feldbezogenen Fehlern ohne Berechnungsergebnis antworten.

## 11. Technische Hinweise für Entwickler oder KI-Agenten

- Geldberechnungen müssen Cent-genau erfolgen und dürfen keine binären Fließkommafehler in sichtbaren Ergebnissen erzeugen.
- Der Service stellt `POST /api/split` bereit und erwartet ein JSON-Objekt mit den Zahlenfeldern `amount`, `tipPercent` und `peopleCount`.
- Eine erfolgreiche Antwort enthält `perPerson`, `totalTip` und `totalAmount`; Geldwerte werden als Dezimalstrings mit genau zwei Nachkommastellen ausgegeben.
- Ungültige Eingaben oder syntaktisch ungültiges JSON werden mit HTTP-Status 400 und einer Liste verständlicher, feldbezogener Fehler beantwortet; ein Berechnungsergebnis fehlt dann vollständig.
- Eingabevalidierung und Ablaufsteuerung liegen im Anwendungsservice; die Rechenlogik liegt in einem eigenen, unabhängig testbaren Domänenmodul.

## 12. Annahmen

| ID | Annahme | Begründung | Auswirkung, falls falsch |
| --- | --- | --- | --- |
| A-001 | Alle Geldbeträge einer Anfrage verwenden dieselbe Währungseinheit. | Währungsumrechnung ist ausdrücklich außerhalb des Umfangs. | Der Schnittstellenvertrag müsste Währungsangaben und Umrechnungsregeln ergänzen. |
| A-002 | Die Position einer Person in der Ergebnisliste genügt zur Zuordnung; Namen werden nicht benötigt. | Es wurden keine personenbezogenen Eingaben oder unterschiedlichen Bestellungen verlangt. | Das Eingabemodell und der Datenschutzumfang müssten erweitert werden. |
| A-003 | Es ist keine zusätzliche fachliche Obergrenze für Rechnungsbetrag oder Personenanzahl erforderlich. | Der Nutzer hat nur Untergrenzen und Genauigkeiten festgelegt. | Grenzwerte und zugehörige Fehlerfälle müssten vor der Implementierung ergänzt werden. |

## 13. Offene Punkte

- Keine fachlich blockierenden Punkte. Der konkrete Schnittstellenvertrag gehört in die Planung.

## 14. Bereitschaftskriterien

Die Spezifikation ist bereit für die Planung, wenn Ziel, Nutzer, Umfang, Fachregeln, Fehlerfälle und messbare Akzeptanzkriterien bestätigt sind und die Annahmen entweder akzeptiert oder korrigiert wurden.

## 15. Abschlusskriterien

Die Umsetzung ist abgeschlossen, wenn alle Anforderungen und Akzeptanzkriterien nachweislich erfüllt sind, keine Funktion außerhalb des Umfangs ergänzt wurde, die Annahmen geprüft wurden, die betroffene Dokumentation synchron ist und der Nutzer das Ergebnis akzeptiert hat.

## 16. Empfohlene nächste Schritte

1. Die Spezifikation mit `/sdd-clarify` auf Widersprüche, versteckte Lücken und Prüfbarkeit untersuchen.
2. Danach mit `/sdd-plan` einen kleinen, verifizierbaren Implementierungsplan erstellen.

## Plan history

- 2026-09-28 — [0001-tip-berechnung.2026-09-28.plan.md](../plan-archive/0001-tip-berechnung.2026-09-28.plan.md) — Cent-genaue Rechnungsaufteilung und HTTP-Schnittstelle mit 16 bestandenen Tests implementiert.