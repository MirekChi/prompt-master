const express = require('express');
const router = express.Router();
const { getTemplates, createTemplate, optimizePrompt } = require('../controllers/promptController');

router.get('/', getTemplates);
router.post('/', createTemplate);
router.post('/optimize', optimizePrompt);

module.exports = router;