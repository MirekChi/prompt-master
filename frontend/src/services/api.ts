import axios from 'axios';
import { OptimizationParams, Template } from '../types';

// Teraz baseURL wskazuje na ścieżkę, którą przechwyci nasze proxy.
const apiClient = axios.create({
    baseURL: '/api', // <-- KLUCZOWA ZMIANA!
    headers: { 'Content-Type': 'application/json' },
});

interface OptimizePayload {
    userInput: string;
    model: string;
    mode: string;
    params: OptimizationParams;
}

export const optimizePrompt = async (payload: OptimizePayload): Promise<{ optimizedPrompt: string }> => {
    // Teraz ścieżka to /templates/optimize, co razem z baseURL da /api/templates/optimize
    const response = await apiClient.post('/templates/optimize', payload);
    return response.data;
};

export const getTemplates = async (): Promise<Template[]> => {
    // Podobnie tutaj: /api/templates
    const response = await apiClient.get('/templates');
    return response.data;
};

export const saveTemplate = async (templateData: { name: string; prompt: string; tags: string[] }): Promise<Template> => {
    const response = await apiClient.post('/templates', templateData);
    return response.data;
};