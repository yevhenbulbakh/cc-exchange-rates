import supertest from 'supertest';
import { launch } from '../src/main.mjs';

describe('Symbols endpoint test', () => {
  let app;

  beforeAll(async () => {
    app = await launch();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test('GET /symbol', async () => {
    const {
      body: [symbol],
    } = await supertest(app.server).get('/symbols');
    const response = await supertest(app.server).get(
      `/symbol?name=${symbol.name}`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(
      expect.objectContaining({
        ask: expect.any(Number),
        bid: expect.any(Number),
        name: expect.any(String),
      }),
    );
  });

  test('GET /symbols', async () => {
    const response = await supertest(app.server).get('/symbols');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ask: expect.any(Number),
          bid: expect.any(Number),
          name: expect.any(String),
        }),
      ]),
    );
  });
});
