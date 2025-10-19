import axios from 'axios';
import { OptimizationParams, Template } from '../types';

const apiClient = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
});

/**
 * @interface OptimizePayload
 * @property {string} userInput - The user's raw prompt.
 * @property {string} model - The ID of the selected language model.
 * @property {string} mode - The selected optimization mode.
 * @property {OptimizationParams} params - The optimization parameters.
 */
interface OptimizePayload {
    userInput: string;
    model: string;
    mode: string;
    params: OptimizationParams;
}

/**
 * Sends a request to the backend to optimize a prompt.
 * @param {OptimizePayload} payload - The data needed for optimization.
 * @returns {Promise<{ optimizedPrompt: string }>} A promise that resolves to the optimized prompt.
 */
export const optimizePrompt = async (payload: OptimizePayload): Promise<{ optimizedPrompt: string }> => {
    const response = await apiClient.post('/templates/optimize', payload);
    return response.data;
};

/**
 * Fetches all prompt templates from the backend.
 * @returns {Promise<Template[]>} A promise that resolves to an array of templates.
 */
export const getTemplates = async (): Promise<Template[]> => {
    const response = await apiClient.get('/templates');
    return response.data;
};

/**
 * Saves a new custom template to the backend.
 * @param {{ name: string; prompt: string; tags: string[] }} templateData - The data for the new template.
 * @returns {Promise<Template>} A promise that resolves to the saved template object.
 */
export const saveTemplate = async (templateData: { name: string; prompt: string; tags: string[] }): Promise<Template> => {
    const response = await apiClient.post('/templates', templateData);
    return response.data;
};
