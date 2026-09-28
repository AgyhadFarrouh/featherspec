import express from 'express';
import { calculateSplitBill } from '../../application/splitBillService.js';

function formatCents(cents) {
  const wholeUnits = cents / 100n;
  const remainder = (cents % 100n).toString().padStart(2, '0');

  return `${wholeUnits}.${remainder}`;
}

export function createSplitRouter() {
  const router = express.Router();

  router.post('/split', (request, response) => {
    const result = calculateSplitBill(request.body);

    if (result.errors.length > 0) {
      response.status(400).json({ errors: result.errors });
      return;
    }

    response.json({
      perPerson: result.perPerson.map(formatCents),
      totalTip: formatCents(result.totalTip),
      totalAmount: formatCents(result.totalAmount),
    });
  });

  return router;
}

export { express };