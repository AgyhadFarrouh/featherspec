import assert from 'node:assert/strict';
import test from 'node:test';

import { splitBill } from '../../src/domain/splitBill.js';

test('AC-002 rundet Trinkgeld kaufmaennisch auf volle Cent', () => {
  const result = splitBill({ amount: 10, tipPercent: 12.35, peopleCount: 1 });

  assert.equal(result.totalTip, 124n);
  assert.equal(result.totalAmount, 1124n);
});

test('AC-003 verteilt Rest-Cents in Ergebnisreihenfolge', () => {
  const result = splitBill({ amount: 100, tipPercent: 10, peopleCount: 3 });

  assert.deepEqual(result.perPerson, [3667n, 3667n, 3666n]);
});

test('AC-004 erhaelt den Gesamtbetrag bei der Aufteilung', () => {
  const result = splitBill({ amount: 42.50, tipPercent: 15, peopleCount: 7 });

  const distributedTotal = result.perPerson.reduce(
    (sum, amount) => sum + amount,
    0n
  );

  assert.equal(distributedTotal, result.totalAmount);
});

test('AC-006 akzeptiert null Prozent Trinkgeld', () => {
  const result = splitBill({ amount: 25, tipPercent: 0, peopleCount: 2 });

  assert.equal(result.totalTip, 0n);
  assert.equal(result.totalAmount, 2500n);
  assert.deepEqual(result.perPerson, [1250n, 1250n]);
});

test('AC-006 akzeptiert eine Person', () => {
  const result = splitBill({ amount: 25, tipPercent: 20, peopleCount: 1 });

  assert.deepEqual(result.perPerson, [3000n]);
  assert.equal(result.totalAmount, 3000n);
});
