import { splitBill } from '../domain/splitBill.js';

function hasAtMostTwoDecimalPlaces(value) {
  const scaledValue = Math.round(value * 100);

  return Number.isSafeInteger(scaledValue) && Number(value.toFixed(2)) === value;
}

function addError(errors, field, message) {
  errors.push({ field, message });
}

export function calculateSplitBill(input = {}) {
  const { amount, tipPercent, peopleCount } = input ?? {};
  const errors = [];

  if (
    typeof amount !== 'number' ||
    !Number.isFinite(amount) ||
    !hasAtMostTwoDecimalPlaces(amount) ||
    amount <= 0
  ) {
    addError(errors, 'amount', 'amount must be a positive amount with at most two decimal places');
  }

  if (
    typeof tipPercent !== 'number' ||
    !Number.isFinite(tipPercent) ||
    !hasAtMostTwoDecimalPlaces(tipPercent) ||
    tipPercent < 0 ||
    tipPercent > 100
  ) {
    addError(errors, 'tipPercent', 'tipPercent must be between 0 and 100 with at most two decimal places');
  }

  if (
    typeof peopleCount !== 'number' ||
    !Number.isSafeInteger(peopleCount) ||
    peopleCount <= 0
  ) {
    addError(errors, 'peopleCount', 'peopleCount must be a positive integer');
  }

  if (errors.length > 0) {
    return { errors };
  }

  return { errors, ...splitBill({ amount, tipPercent, peopleCount }) };
}