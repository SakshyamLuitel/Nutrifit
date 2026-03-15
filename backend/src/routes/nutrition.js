/**
 * Nutrition Routes
 *
 * Exposes endpoints for disease–nutrient influence data.
 */

import { Router } from 'express';
import {
  getSupportedDiseases,
  getInfluencesForDisease,
  applyDiseaseInfluences,
  combineInfluences,
} from '../services/diseaseNutrientService.js';

const router = Router();

/**
 * GET /api/nutrition/diseases
 * Returns the list of supported disease identifiers.
 */
router.get('/diseases', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: getSupportedDiseases(),
  });
});

/**
 * GET /api/nutrition/diseases/:diseaseKey/influences
 * Returns the nutrient influence map for a specific disease.
 */
router.get('/diseases/:diseaseKey/influences', (req, res) => {
  const { diseaseKey } = req.params;
  const influences = getInfluencesForDisease(diseaseKey);

  if (!influences) {
    return res.status(404).json({
      status: 'error',
      message: `Disease '${diseaseKey}' not found`,
    });
  }

  return res.status(200).json({
    status: 'success',
    data: { disease: diseaseKey, influences },
  });
});

/**
 * POST /api/nutrition/diseases/:diseaseKey/apply
 * Applies disease–nutrient influences to provided base nutrient values.
 *
 * Request body: { nutrients: { [nutrientName]: number } }
 */
router.post('/diseases/:diseaseKey/apply', (req, res) => {
  const { diseaseKey } = req.params;
  const { nutrients } = req.body;

  if (!nutrients || typeof nutrients !== 'object' || Array.isArray(nutrients)) {
    return res.status(400).json({
      status: 'error',
      message: 'Request body must include a "nutrients" object',
    });
  }

  const adjusted = applyDiseaseInfluences(diseaseKey, nutrients);
  if (!adjusted) {
    return res.status(404).json({
      status: 'error',
      message: `Disease '${diseaseKey}' not found`,
    });
  }

  return res.status(200).json({
    status: 'success',
    data: { disease: diseaseKey, adjusted },
  });
});

/**
 * POST /api/nutrition/influences/combine
 * Combines influence maps from multiple diseases.
 *
 * Request body: { diseases: string[] }
 */
router.post('/influences/combine', (req, res) => {
  const { diseases } = req.body;

  if (!Array.isArray(diseases) || diseases.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Request body must include a non-empty "diseases" array',
    });
  }

  const combined = combineInfluences(diseases);
  return res.status(200).json({
    status: 'success',
    data: { diseases, combined },
  });
});

export default router;
