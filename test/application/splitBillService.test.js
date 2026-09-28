import assert from 'node:assert/strict';
import test from 'node:test';

import { calculateSplitBill } from '../../src/application/splitBillService.js';

function assertFieldError(result, field) {
  assert.ok(Array.isArray(result.errors));
  assert.ok(result.errors.some((error) => error.field === field));
}

test('AC-005 lehnt fehlende Pflichtfelder gemeinsam und feldbezogen ab', () => {
  const result = calculateSplitBill({});

  assertFieldError(result, 'amount');
  assertFieldError(result, 'tipPercent');
  assertFieldError(result, 'peopleCount');
  assert.equal(result.perPerson, undefined);
  assert.equal(result.totalTip, undefined);
  assert.equal(result.totalAmount, undefined);
});

test('AC-005 meldet nicht endliche und unsicher repraesentierbare Werte', () => {
  const result = calculateSplitBill({
    amount: Number.POSITIVE_INFINITY,
    tipPercent: Number.NaN,
    peopleCount: Number.MAX_SAFE_INTEGER + 1,
  });

  assertFieldError(result, 'amount');
  assertFieldError(result, 'tipPercent');
  assertFieldError(result, 'peopleCount');
  assert.equal(result.perPerson, undefined);
});

test('AC-005 lehnt Geldwerte und Prozentsaetze mit mehr als zwei Nachkommastellen ab', () => {
  const result = calculateSplitBill({
    amount: 10.001,
    tipPercent: 12.345,
    peopleCount: 2,
  });

  assertFieldError(result, 'amount');
  assertFieldError(result, 'tipPercent');
  assert.equal(result.perPerson, undefined);
});

test('AC-005 lehnt Werte ausserhalb der Fachregeln ab', () => {
  const result = calculateSplitBill({
    amount: 0,
    tipPercent: 100.01,
    peopleCount: 1.5,
  });

  assertFieldError(result, 'amount');
  assertFieldError(result, 'tipPercent');
  assertFieldError(result, 'peopleCount');
  assert.equal(result.totalAmount, undefined);
});

test('AC-006 akzeptiert null Prozent Trinkgeld im Anwendungsservice', () => {
  const result = calculateSplitBill({ amount: 25, tipPercent: 0, peopleCount: 2 });

  assert.deepEqual(result.errors, []);
  assert.equal(result.totalTip, 0n);
});

test('AC-006 akzeptiert eine Person im Anwendungsservice', () => {
  const result = calculateSplitBill({ amount: 25, tipPercent: 20, peopleCount: 1 });

  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.perPerson, [3000n]);
});
