/**
 * @fileoverview This file contains the core logic for optimizing prompts for various AI models.
 * It uses a factory pattern to select the appropriate optimization strategy based on the target model.
 */

/**
 * Base class for all prompt optimizers.
 * Provides a common interface for optimization and applies general best practices.
 */
class PromptOptimizer {
    /**
     * Placeholder for the optimization method. Must be implemented by subclasses.
     * @param {string} userInput - The user's original prompt.
     * @param {string} mode - The desired optimization mode (e.g., 'Akademicki', 'Techniczny').
     * @param {object} params - Additional parameters for optimization (e.g., detailLevel, maxLength).
     * @throws {Error} If the method is not implemented in a subclass.
     */
    optimize(userInput, mode, params) {
        throw new Error("Metoda 'optimize' musi być zaimplementowana w klasach podrzędnych");
    }

    /**
     * Applies general best practices to a prompt.
     * @param {string} prompt - The prompt to enhance.
     * @param {string} model - The target AI model.
     * @param {string} mode - The optimization mode.
     * @param {object} params - Additional optimization parameters.
     * @returns {string} The enhanced prompt.
     */
    applyCommonPractices(prompt, model, mode, params) {
        let enhancedPrompt = prompt;
        
        if (['Akademicki', 'Techniczny', 'Analityczny'].includes(mode) && model.startsWith('GPT')) {
            enhancedPrompt += "\n\nPrzeanalizujmy to krok po kroku.";
        }

        if (params.detailLevel < 0.4) {
            enhancedPrompt += "\nUdziel zwięzłej i konkretnej odpowiedzi.";
        } else if (params.detailLevel > 0.7) {
            enhancedPrompt += "\nUdziel wyczerpującej i szczegółowej odpowiedzi.";
        }
        return enhancedPrompt;
    }
}

/**
 * Optimizer for GPT-4 and similar models.
 */
class Gpt4Optimizer extends PromptOptimizer {
    /**
     * Optimizes the user input for GPT-4.
     * @param {string} userInput - The user's original prompt.
     * @param {string} mode - The optimization mode.
     * @param {object} params - Additional parameters.
     * @returns {string} The optimized prompt.
     */
    optimize(userInput, mode, params) {
        const structure = `---
Rola: Działaj jako ekspert w dziedzinie: ${mode}.
Kontekst: Użytkownik chce zrealizować zadanie związane z jego poleceniem. Oczekiwany ton wypowiedzi jest ${mode.toLowerCase()}.
Zadanie: Przeanalizuj poniższe polecenie użytkownika i udziel odpowiedzi najwyższej jakości.
Polecenie Użytkownika: "${userInput}"
Ograniczenia:
Długość odpowiedzi powinna wynosić około ${params.maxLength} tokenów.
Ściśle przestrzegaj wymaganego formatu wyjściowego.
Nie wymyślaj faktów. Jeśli czegoś nie wiesz, przyznaj to.
Temperatura generowania odpowiedzi powinna wynosić około ${params.temperature}.
Format Wyjściowy:
Przedstaw odpowiedź w jasnym, dobrze ustrukturyzowanym formacie. Jeśli to stosowne, użyj składni Markdown do formatowania.
---`;
        return this.applyCommonPractices(structure.trim(), 'GPT-4', mode, params);
    }
}

/**
 * Optimizer for Claude models.
 */
class ClaudeOptimizer extends PromptOptimizer {
    /**
     * Optimizes the user input for Claude.
     * @param {string} userInput - The user's original prompt.
     * @param {string} mode - The optimization mode.
     * @param {object} params - Additional parameters.
     * @returns {string} The optimized prompt.
     */
    optimize(userInput, mode, params) {
        const structure = `Użytkownik: Cześć. Potrzebuję Twojej pomocy z następującym zadaniem. Proszę, działaj jako pomocny i nieszkodliwy asystent AI z ekspertyzą w dziedzinie: ${mode}. Twoja odpowiedź powinna być etyczna, bezstronna i przemyślana.
Oto kontekst i moje polecenie:
${userInput}
Proszę, udziel szczegółowej i dobrze uzasadnionej odpowiedzi. Jeśli to możliwe, przedstaw swój proces myślowy.
Asystent:`;
        return this.applyCommonPractices(structure.trim(), 'Claude', mode, params);
    }
}

/**
 * Optimizer for Google Gemini models.
 */
class GeminiOptimizer extends PromptOptimizer {
    /**
     * Optimizes the user input for Gemini.
     * @param {string} userInput - The user's original prompt.
     * @param {string} mode - The optimization mode.
     * @param {object} params - Additional parameters.
     * @returns {string} The optimized prompt.
     */
     optimize(userInput, mode, params) {
        const structure = `**Prompt dla Google Gemini:**
Cel: Wygeneruj odpowiedź na zapytanie użytkownika jako ekspert w dziedzinie: ${mode}.
Zapytanie Użytkownika: "${userInput}"
Instrukcje:
Analiza Zapytania: Zdekonstruuj polecenie użytkownika, aby zrozumieć jego główną intencję.
Wyszukiwanie Informacji (jeśli potrzebne): Jeśli zapytanie wymaga informacji w czasie rzeczywistym, użyj wyszukiwarki Google, aby pobrać najnowsze dane.
Synteza Odpowiedzi: Stwórz kompleksową, wieloaspektową odpowiedź.
Struktura Wyjściowa: Sformatuj odpowiedź w przejrzysty sposób. Jeśli zapytanie sugeruje listę, tabelę lub kod, użyj odpowiedniego formatowania Markdown.
Wskazówka Multimodalna: (Uwaga dla użytkownika: Jeśli to stosowne, rozważ dodanie obrazu do tego promptu tekstowego w celu zapytania multimodalnego).`;
        return this.applyCommonPractices(structure.trim(), 'Gemini', mode, params);
    }
}

/**
 * Optimizer for Perplexity AI.
 */
class PerplexityOptimizer extends PromptOptimizer {
    /**
     * Optimizes the user input for Perplexity AI.
     * @param {string} userInput - The user's original prompt.
     * @param {string} mode - The optimization mode.
     * @param {object} params - Additional parameters.
     * @returns {string} The optimized prompt.
     */
    optimize(userInput, mode, params) {
        const structure = `Zapytanie zoptymalizowane dla Perplexity AI
Główny Temat: ${userInput}
Koncentracja: ${mode}
Instrukcje:
Znajdź najbardziej trafne i aktualne informacje na podany temat.
Zsyntetyzuj znalezione informacje w jasną i zwięzłą odpowiedź.
Podaj cytaty i bezpośrednie linki do użytych źródeł.
Jeśli tryb to 'Akademicki' lub 'Techniczny', priorytetyzuj źródła naukowe lub techniczne.`;
        return this.applyCommonPractices(structure.trim(), 'Perplexity', mode, params);
    }
}

const optimizers = {
    'GPT-4': new Gpt4Optimizer(),
    'GPT-3.5': new Gpt4Optimizer(), // GPT-3.5 uses a similar structure
    'Claude': new ClaudeOptimizer(),
    'Gemini': new GeminiOptimizer(),
    'Perplexity': new PerplexityOptimizer(),
};

/**
 * Factory function that selects the appropriate optimizer based on the model and optimizes the user's prompt.
 * @param {string} userInput - The user's original prompt.
 * @param {string} model - The target AI model (e.g., 'GPT-4', 'Claude').
 * @param {string} mode - The optimization mode.
 * @param {object} params - Additional optimization parameters.
 * @returns {string} The optimized prompt, or the original input if the model is not supported.
 */
exports.optimize = (userInput, model, mode, params) => {
    const optimizer = optimizers[model];
    if (!optimizer) {
        return userInput;
    }
    return optimizer.optimize(userInput, mode, params);
};
