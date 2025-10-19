const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    prompt: { type: String, required: true },
    tags: { type: [String], default: [] },
    isCustom: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Template', TemplateSchema);