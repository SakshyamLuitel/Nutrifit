/**
 * Disease–Nutrient Influence Modelling
 *
 * Encodes dietary modification guidelines for chronic conditions as continuous
 * influence values in the range [−1.0, +1.0], where:
 *   - Negative values indicate nutrient restriction
 *   - Positive values indicate nutrient encouragement
 *
 * Values are assigned on a three-point ordinal scale based on recommendation
 * strength stated in clinical practice guidelines, following the weighted
 * constraint encoding methodology described in Tran et al. [6]:
 *   - 0.3 = mild
 *   - 0.5 = moderate
 *   - 0.8 = strong
 *
 * References:
 *   [9]  Type 2 Diabetes dietary guidelines
 *   [10] Hypertension dietary guidelines
 *   [11] Chronic Kidney Disease (CKD) Stage 3 dietary guidelines
 *   [12] Non-Alcoholic Fatty Liver Disease (NAFLD) dietary guidelines
 */

/**
 * Influence scale constants for documentation and validation.
 */
export const INFLUENCE_SCALE = {
  MILD: 0.3,
  MODERATE: 0.5,
  STRONG: 0.8,
};

/**
 * Disease–nutrient influence map.
 * Each disease maps to an object of nutrient names to influence values.
 */
export const DISEASE_NUTRIENT_INFLUENCES = {
  /**
   * Type 2 Diabetes
   * Sugar restricted very strongly (−0.9), Carbohydrates restricted moderately (−0.5),
   * Fibre encouraged (+ 0.6). [9]
   */
  type2Diabetes: {
    sugar: -0.9,
    carbohydrates: -0.5,
    fibre: 0.6,
  },

  /**
   * Hypertension
   * Sodium restricted strongly (−0.8), Saturated Fat restricted (−0.4),
   * Fibre encouraged moderately (+0.5). [10]
   */
  hypertension: {
    sodium: -0.8,
    saturatedFat: -0.4,
    fibre: 0.5,
  },

  /**
   * Chronic Kidney Disease (CKD) Stage 3
   * Sodium restricted (−0.6), Protein restricted mildly (−0.3),
   * Phosphorus restricted moderately (−0.5). [11]
   */
  ckdStage3: {
    sodium: -0.6,
    protein: -0.3,
    phosphorus: -0.5,
  },

  /**
   * Non-Alcoholic Fatty Liver Disease (NAFLD)
   * Fat restricted moderately (−0.5), Sugar restricted (−0.6),
   * Fibre encouraged (+0.6). [12]
   */
  nafld: {
    fat: -0.5,
    sugar: -0.6,
    fibre: 0.6,
  },
};

export default DISEASE_NUTRIENT_INFLUENCES;
