const mongoose = require('mongoose');

/**
 * Mongoose schema for a prompt template.
 * @typedef {object} TemplateSchema
 * @property {string} name - The name of the template.
 * @property {string} prompt - The content of the prompt template.
 * @property {string[]} tags - A list of tags for categorizing the template.
 * @property {boolean} isCustom - A flag to indicate if the template is user-created.
 */
const TemplateSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    prompt: { type: String, required: true },
    tags: { type: [String], default: [] },
    isCustom: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Template', TemplateSchema);
