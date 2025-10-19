/**
 * @fileoverview This file contains TypeScript type definitions used throughout the frontend application.
 */

/**
 * Represents a Large Language Model (LLM) with its properties.
 * @interface LLM
 * @property {string} id - The unique identifier for the language model.
 * @property {string} name - The display name of the language model.
 * @property {string} tokenLimit - The token limit for the model.
 * @property {string[]} strengths - A list of the model's key strengths.
 */
export interface LLM {
    id: string;
    name: string;
    tokenLimit: string;
    strengths: string[];
}

/**
 * Represents the parameters for optimizing a prompt.
 * @interface OptimizationParams
 * @property {number} temperature - The creativity/randomness level for the model's output.
 * @property {number} maxLength - The maximum length of the generated prompt in tokens.
 * @property {number} detailLevel - The desired level of detail in the response.
 */
export interface OptimizationParams {
    temperature: number;
    maxLength: number;
    detailLevel: number;
}

/**
 * Represents a prompt template.
 * @interface Template
 * @property {string} _id - The unique identifier of the template.
 * @property {string} name - The name of the template.
 * @property {string} prompt - The content of the prompt template.
 */
export interface Template {
    _id: string;
    name: string;
    prompt: string;
}
