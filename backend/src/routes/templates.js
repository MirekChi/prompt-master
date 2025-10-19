const express = require('express');
const router = express.Router();
const { getTemplates, createTemplate, optimizePrompt } = require('../controllers/promptController');

/**
 * @route   GET /api/templates
 * @desc    Get all prompt templates
 * @access  Public
 */
router.get('/', getTemplates);

/**
 * @route   POST /api/templates
 * @desc    Create a new custom prompt template
 * @access  Public
 */
router.post('/', createTemplate);

/**
 * @route   POST /api/templates/optimize
 * @desc    Optimize a user's prompt
 * @access  Public
 */
router.post('/optimize', optimizePrompt);

module.exports = router;
