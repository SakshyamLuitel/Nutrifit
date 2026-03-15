/**
 * Tests for Disease–Nutrient Influence constants
 */

import {
  DISEASE_NUTRIENT_INFLUENCES,
  INFLUENCE_SCALE,
} from '../constants/diseaseNutrientInfluences.js';

describe('INFLUENCE_SCALE', () => {
  it('defines the three-point ordinal scale values', () => {
    expect(INFLUENCE_SCALE.MILD).toBe(0.3);
    expect(INFLUENCE_SCALE.MODERATE).toBe(0.5);
    expect(INFLUENCE_SCALE.STRONG).toBe(0.8);
  });
});

describe('DISEASE_NUTRIENT_INFLUENCES', () => {
  it('contains all four required diseases', () => {
    expect(DISEASE_NUTRIENT_INFLUENCES).toHaveProperty('type2Diabetes');
    expect(DISEASE_NUTRIENT_INFLUENCES).toHaveProperty('hypertension');
    expect(DISEASE_NUTRIENT_INFLUENCES).toHaveProperty('ckdStage3');
    expect(DISEASE_NUTRIENT_INFLUENCES).toHaveProperty('nafld');
  });

  it('all influence values are within [-1.0, +1.0]', () => {
    Object.entries(DISEASE_NUTRIENT_INFLUENCES).forEach(([, nutrients]) => {
      Object.values(nutrients).forEach((value) => {
        expect(value).toBeGreaterThanOrEqual(-1.0);
        expect(value).toBeLessThanOrEqual(1.0);
      });
    });
  });

  describe('type2Diabetes', () => {
    const { type2Diabetes } = DISEASE_NUTRIENT_INFLUENCES;

    it('restricts sugar strongly (−0.9)', () => {
      expect(type2Diabetes.sugar).toBe(-0.9);
    });

    it('restricts carbohydrates moderately (−0.5)', () => {
      expect(type2Diabetes.carbohydrates).toBe(-0.5);
    });

    it('encourages fibre (+0.6)', () => {
      expect(type2Diabetes.fibre).toBe(0.6);
    });
  });

  describe('hypertension', () => {
    const { hypertension } = DISEASE_NUTRIENT_INFLUENCES;

    it('restricts sodium strongly (−0.8)', () => {
      expect(hypertension.sodium).toBe(-0.8);
    });

    it('restricts saturated fat (−0.4)', () => {
      expect(hypertension.saturatedFat).toBe(-0.4);
    });

    it('encourages fibre (+0.5)', () => {
      expect(hypertension.fibre).toBe(0.5);
    });
  });

  describe('ckdStage3', () => {
    const { ckdStage3 } = DISEASE_NUTRIENT_INFLUENCES;

    it('restricts sodium (−0.6)', () => {
      expect(ckdStage3.sodium).toBe(-0.6);
    });

    it('restricts protein mildly (−0.3)', () => {
      expect(ckdStage3.protein).toBe(-0.3);
    });

    it('restricts phosphorus moderately (−0.5)', () => {
      expect(ckdStage3.phosphorus).toBe(-0.5);
    });
  });

  describe('nafld', () => {
    const { nafld } = DISEASE_NUTRIENT_INFLUENCES;

    it('restricts fat moderately (−0.5)', () => {
      expect(nafld.fat).toBe(-0.5);
    });

    it('restricts sugar (−0.6)', () => {
      expect(nafld.sugar).toBe(-0.6);
    });

    it('encourages fibre (+0.6)', () => {
      expect(nafld.fibre).toBe(0.6);
    });
  });
});
