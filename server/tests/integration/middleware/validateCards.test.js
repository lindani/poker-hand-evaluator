import request from 'supertest';
import app from '../../../app.js';

describe('POST /api/evaluate (error handling)', () => {
  test('returns 400 if cards is not an array', async () => {
    const res = await request(app)
      .post('/api/evaluate')
      .send({ cards: 'not an array' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("'cards' must be an array.");
  });

  test('returns 400 if cards length is not 5', async () => {
    const res = await request(app)
      .post('/api/evaluate')
      .send({ cards: ['AS', 'KD'] });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('You must provide exactly 5 cards.');
  });

  test('returns 400 for invalid card format', async () => {
    const res = await request(app)
      .post('/api/evaluate')
      .send({ cards: ['ZZ', '2H', '3D', '4S', '5C'] });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Invalid card format/);
  });

  test('returns 400 for invalid card values', async () => {
    const res = await request(app)
      .post('/api/evaluate')
      .send({ cards: ['1H', '2H', '3D', '4S', '5C'] });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Invalid card format/i);
  });

  test('returns 200 and hand if valid input', async () => {
    const res = await request(app)
      .post('/api/evaluate')
      .send({ cards: ['AS', 'KS', 'QS', 'JS', '10S'] });

    expect(res.statusCode).toBe(200);
    expect(res.body.hand).toBeDefined();
  });
});
