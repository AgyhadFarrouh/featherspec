function toScaledInteger(value) {
  const [wholePart, fractionalPart = ''] = String(value).split('.');
  const paddedFraction = fractionalPart.padEnd(2, '0');

  return BigInt(wholePart) * 100n + BigInt(paddedFraction);
}

export function splitBill({ amount, tipPercent, peopleCount }) {
  const amountInCents = toScaledInteger(amount);
  const tipInHundredthsOfPercent = toScaledInteger(tipPercent);
  const totalTip =
    (amountInCents * tipInHundredthsOfPercent + 5000n) / 10000n;
  const totalAmount = amountInCents + totalTip;
  const numberOfPeople = BigInt(peopleCount);
  const baseShare = totalAmount / numberOfPeople;
  const remainingCents = totalAmount % numberOfPeople;
  const perPerson = Array.from({ length: peopleCount }, (_, index) =>
    baseShare + (BigInt(index) < remainingCents ? 1n : 0n)
  );

  return { perPerson, totalTip, totalAmount };
}