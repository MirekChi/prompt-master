const Template = require('../models/Template');
const { optimize } = require('../services/optimizationService');

exports.getTemplates = async (req, res) => {
    try {
        const templates = await Template.find();
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ message: "Error fetching templates", error: error.message });
    }
};

exports.createTemplate = async (req, res) => {
    try {
        const { name, prompt, tags } = req.body;
        const newTemplate = new Template({ name, prompt, tags, isCustom: true });
        const savedTemplate = await newTemplate.save();
        res.status(201).json(savedTemplate);
    } catch (error) {
        res.status(500).json({ message: "Error creating template", error: error.message });
    }
};

exports.optimizePrompt = (req, res) => {
    try {
        const { userInput, model, mode, params } = req.body;
        const optimizedPrompt = optimize(userInput, model, mode, params);
        res.status(200).json({ optimizedPrompt });
    } catch (error) {
        res.status(500).json({ message: "Error optimizing prompt", error: error.message });
    }
};