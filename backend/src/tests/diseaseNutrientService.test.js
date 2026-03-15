/**
 * Tests for Disease–Nutrient Influence Service
 */

import {
  getSupportedDiseases,
  getInfluencesForDisease,
  applyDiseaseInfluences,
  combineInfluences,
} from '../services/diseaseNutrientService.js';

describe('getSupportedDiseases', () => {
  it('returns an array of disease keys', () => {
    const diseases = getSupportedDiseases();
    expect(Array.isArray(diseases)).toBe(true);
    expect(diseases).toContain('type2Diabetes');
    expect(diseases).toContain('hypertension');
    expect(diseases).toContain('ckdStage3');
    expect(diseases).toContain('nafld');
  });
});

describe('getInfluencesForDisease', () => {
  it('returns the influence map for a known disease', () => {
    const influences = getInfluencesForDisease('type2Diabetes');
    expect(influences).not.toBeNull();
    expect(influences).toHaveProperty('sugar', -0.9);
    expect(influences).toHaveProperty('carbohydrates', -0.5);
    expect(influences).toHaveProperty('fibre', 0.6);
  });

  it('returns null for an unknown disease', () => {
    expect(getInfluencesForDisease('unknownDisease')).toBeNull();
  });
});

describe('applyDiseaseInfluences', () => {
  it('adjusts base nutrients according to disease influences', () => {
    const base = { sugar: 100, carbohydrates: 200, fibre: 25 };
    const adjusted = applyDiseaseInfluences('type2Diabetes', base);

    expect(adjusted).not.toBeNull();
    // sugar * (1 + (-0.9)) = 100 * 0.1 = 10
    expect(adjusted.sugar).toBeCloseTo(10);
    // carbohydrates * (1 + (-0.5)) = 200 * 0.5 = 100
    expect(adjusted.carbohydrates).toBeCloseTo(100);
    // fibre * (1 + 0.6) = 25 * 1.6 = 40
    expect(adjusted.fibre).toBeCloseTo(40);
  });

  it('does not adjust nutrients not mentioned in the disease influences', () => {
    const base = { sugar: 100, protein: 50 };
    const adjusted = applyDiseaseInfluences('type2Diabetes', base);
    // protein is not in type2Diabetes influences, should remain unchanged
    expect(adjusted.protein).toBe(50);
  });

  it('clamps adjusted values to a minimum of 0', () => {
    const base = { sugar: 5 };
    const adjusted = applyDiseaseInfluences('type2Diabetes', base);
    expect(adjusted.sugar).toBeGreaterThanOrEqual(0);
  });

  it('returns null for an unknown disease', () => {
    expect(applyDiseaseInfluences('unknownDisease', { sugar: 100 })).toBeNull();
  });
});

describe('combineInfluences', () => {
  it('merges influence maps from multiple diseases', () => {
    const combined = combineInfluences(['type2Diabetes', 'nafld']);
    // Both diseases restrict sugar; combined value clamped to [-1, 1]
    expect(combined.sugar).toBeLessThan(0);
    // Only type2Diabetes has carbohydrates
    expect(combined.carbohydrates).toBe(-0.5);
    // Both diseases encourage fibre: 0.6 + 0.6 clamped to 1.0
    expect(combined.fibre).toBe(1.0);
  });

  it('returns an empty object for an empty disease list', () => {
    expect(combineInfluences([])).toEqual({});
  });

  it('ignores unknown disease keys gracefully', () => {
    const combined = combineInfluences(['unknownDisease', 'hypertension']);
    expect(combined).toHaveProperty('sodium', -0.8);
    expect(combined).toHaveProperty('fibre', 0.5);
  });

  it('clamps combined values within [-1.0, +1.0]', () => {
    const combined = combineInfluences(['type2Diabetes', 'nafld', 'hypertension', 'ckdStage3']);
    Object.values(combined).forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(-1.0);
      expect(value).toBeLessThanOrEqual(1.0);
    });
  });
});
