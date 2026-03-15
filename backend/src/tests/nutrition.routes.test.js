/**
 * Integration tests for Nutrition Routes
 */

import request from 'supertest';
import app from '../index.js';

describe('GET /api/nutrition/diseases', () => {
  it('returns the list of supported diseases', async () => {
    const res = await request(app).get('/api/nutrition/diseases');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data).toContain('type2Diabetes');
    expect(res.body.data).toContain('hypertension');
    expect(res.body.data).toContain('ckdStage3');
    expect(res.body.data).toContain('nafld');
  });
});

describe('GET /api/nutrition/diseases/:diseaseKey/influences', () => {
  it('returns influences for a known disease', async () => {
    const res = await request(app).get('/api/nutrition/diseases/type2Diabetes/influences');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.disease).toBe('type2Diabetes');
    expect(res.body.data.influences).toMatchObject({
      sugar: -0.9,
      carbohydrates: -0.5,
      fibre: 0.6,
    });
  });

  it('returns 404 for an unknown disease', async () => {
    const res = await request(app).get('/api/nutrition/diseases/unknownDisease/influences');
    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
  });
});

describe('POST /api/nutrition/diseases/:diseaseKey/apply', () => {
  it('applies disease influences to base nutrients', async () => {
    const res = await request(app)
      .post('/api/nutrition/diseases/hypertension/apply')
      .send({ nutrients: { sodium: 2000, fibre: 25 } });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.disease).toBe('hypertension');
    // sodium * (1 + (-0.8)) = 2000 * 0.2 = 400
    expect(res.body.data.adjusted.sodium).toBeCloseTo(400);
    // fibre * (1 + 0.5) = 25 * 1.5 = 37.5
    expect(res.body.data.adjusted.fibre).toBeCloseTo(37.5);
  });

  it('returns 400 when nutrients is missing', async () => {
    const res = await request(app)
      .post('/api/nutrition/diseases/hypertension/apply')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
  });

  it('returns 404 for an unknown disease', async () => {
    const res = await request(app)
      .post('/api/nutrition/diseases/unknownDisease/apply')
      .send({ nutrients: { sodium: 2000 } });
    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
  });
});

describe('POST /api/nutrition/influences/combine', () => {
  it('combines influences from multiple diseases', async () => {
    const res = await request(app)
      .post('/api/nutrition/influences/combine')
      .send({ diseases: ['type2Diabetes', 'nafld'] });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.diseases).toEqual(['type2Diabetes', 'nafld']);
    // Both encourage fibre (0.6 + 0.6 = 1.0 after clamping)
    expect(res.body.data.combined.fibre).toBe(1.0);
    // Both restrict sugar
    expect(res.body.data.combined.sugar).toBeLessThan(0);
  });

  it('returns 400 when diseases array is missing or empty', async () => {
    const resMissing = await request(app)
      .post('/api/nutrition/influences/combine')
      .send({});
    expect(resMissing.status).toBe(400);

    const resEmpty = await request(app)
      .post('/api/nutrition/influences/combine')
      .send({ diseases: [] });
    expect(resEmpty.status).toBe(400);
  });
});
