import assert from 'node:assert/strict';
import http from 'node:http';
import test from 'node:test';

import { createApp } from '../../../src/app.js';

async function requestApp({ body, rawBody = JSON.stringify(body), path = '/api/split' }) {
  const server = createApp().listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();
  const startedAt = performance.now();

  try {
    const response = await new Promise((resolve, reject) => {
      const request = http.request(
        {
          hostname: '127.0.0.1',
          method: 'POST',
          path,
          port,
          headers: {
            'content-type': 'application/json',
            'content-length': Buffer.byteLength(rawBody),
          },
        },
        (incomingResponse) => {
          let responseBody = '';
          incomingResponse.setEncoding('utf8');
          incomingResponse.on('data', (chunk) => {
            responseBody += chunk;
          });
          incomingResponse.on('end', () => {
            resolve({
              body: JSON.parse(responseBody),
              duration: performance.now() - startedAt,
              statusCode: incomingResponse.statusCode,
            });
          });
        }
      );

      request.on('error', reject);
      request.end(rawBody);
    });

    return response;
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
}

test('AC-001 und AC-008 liefert drei formatierte Erfolgsfelder', async () => {
  const response = await requestApp({
    body: { amount: 100, tipPercent: 10, peopleCount: 3 },
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, {
    perPerson: ['36.67', '36.67', '36.66'],
    totalTip: '10.00',
    totalAmount: '110.00',
  });
});

test('AC-001, AC-006 und AC-008 akzeptiert gueltige Zweidezimalwerte', async () => {
  const response = await requestApp({
    body: { amount: 1.15, tipPercent: 10, peopleCount: 1 },
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, {
    perPerson: ['1.27'],
    totalTip: '0.12',
    totalAmount: '1.27',
  });
});

test('AC-005 liefert bei ungueltiger Eingabe nur feldbezogene Fehler', async () => {
  const response = await requestApp({
    body: { amount: 0, tipPercent: 101, peopleCount: 0 },
  });

  assert.equal(response.statusCode, 400);
  assert.ok(Array.isArray(response.body.errors));
  assert.ok(response.body.errors.some((error) => error.field === 'amount'));
  assert.ok(response.body.errors.some((error) => error.field === 'tipPercent'));
  assert.ok(response.body.errors.some((error) => error.field === 'peopleCount'));
  assert.equal(response.body.perPerson, undefined);
  assert.equal(response.body.totalTip, undefined);
  assert.equal(response.body.totalAmount, undefined);
});

test('AC-008 lehnt syntaktisch ungueltiges JSON mit Status 400 ab', async () => {
  const response = await requestApp({ rawBody: '{"amount": 10' });

  assert.equal(response.statusCode, 400);
  assert.ok(Array.isArray(response.body.errors));
  assert.equal(response.body.perPerson, undefined);
});

test('AC-007 beantwortet eine gueltige Anfrage unter einer Sekunde', async () => {
  const response = await requestApp({
    body: { amount: 42.5, tipPercent: 15, peopleCount: 7 },
  });

  assert.equal(response.statusCode, 200);
  assert.ok(response.duration < 1000);
});
