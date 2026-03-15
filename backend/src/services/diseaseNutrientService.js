/**
 * Disease–Nutrient Influence Service
 *
 * Provides utilities for working with disease–nutrient influence values,
 * including retrieving influences for specific diseases and applying
 * them to compute adjusted nutrient targets.
 */

import { DISEASE_NUTRIENT_INFLUENCES } from '../constants/diseaseNutrientInfluences.js';

/**
 * Returns the list of supported disease identifiers.
 *
 * @returns {string[]} Array of disease keys
 */
export function getSupportedDiseases() {
  return Object.keys(DISEASE_NUTRIENT_INFLUENCES);
}

/**
 * Retrieves the nutrient influence map for a given disease.
 *
 * @param {string} diseaseKey - The disease identifier (e.g. 'type2Diabetes')
 * @returns {Object|null} Nutrient-to-influence mapping, or null if not found
 */
export function getInfluencesForDisease(diseaseKey) {
  return DISEASE_NUTRIENT_INFLUENCES[diseaseKey] ?? null;
}

/**
 * Applies disease–nutrient influences to a set of base nutrient values.
 *
 * Each nutrient value is adjusted by multiplying by (1 + influence), where:
 *   - A negative influence reduces the target (restriction)
 *   - A positive influence increases the target (encouragement)
 * The result is clamped to a minimum of 0.
 *
 * @param {string} diseaseKey - The disease identifier
 * @param {Object} baseNutrients - Map of nutrient names to numeric base values
 * @returns {Object|null} Adjusted nutrient values, or null if disease not found
 */
export function applyDiseaseInfluences(diseaseKey, baseNutrients) {
  const influences = getInfluencesForDisease(diseaseKey);
  if (!influences) return null;

  const adjusted = { ...baseNutrients };
  Object.entries(influences).forEach(([nutrient, influence]) => {
    if (Object.prototype.hasOwnProperty.call(adjusted, nutrient)) {
      adjusted[nutrient] = Math.max(0, adjusted[nutrient] * (1 + influence));
    }
  });
  return adjusted;
}

/**
 * Combines influence maps from multiple diseases by summing influence values
 * and clamping to the valid range [−1.0, +1.0].
 *
 * @param {string[]} diseaseKeys - Array of disease identifiers
 * @returns {Object} Merged nutrient-to-influence mapping
 */
export function combineInfluences(diseaseKeys) {
  const combined = {};
  diseaseKeys.forEach((key) => {
    const influences = getInfluencesForDisease(key);
    if (!influences) return;
    Object.entries(influences).forEach(([nutrient, influence]) => {
      combined[nutrient] = Math.min(1.0, Math.max(-1.0, (combined[nutrient] ?? 0) + influence));
    });
  });
  return combined;
}
