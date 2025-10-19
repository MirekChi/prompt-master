// Główne algorytmy optymalizacji promptów (wersja polska)

class PromptOptimizer {
    optimize(userInput, mode, params) {
        throw new Error("Metoda 'optimize' musi być zaimplementowana w klasach podrzędnych");
    }

    // Dodaje ogólne najlepsze praktyki do promptu
    applyCommonPractices(prompt, model, mode, params) {
        let enhancedPrompt = prompt;
        
        // Dodaje "Pomyślmy krok po kroku" dla złożonych zadań, zwłaszcza dla modeli GPT
        if (['Akademicki', 'Techniczny', 'Analityczny'].includes(mode) && model.startsWith('GPT')) {
            enhancedPrompt += "\n\nPrzeanalizujmy to krok po kroku.";
        }

        // Dodaje informację o pożądanej długości odpowiedzi na podstawie parametrów
        if (params.detailLevel < 0.4) {
            enhancedPrompt += "\nUdziel zwięzłej i konkretnej odpowiedzi.";
        } else if (params.detailLevel > 0.7) {
            enhancedPrompt += "\nUdziel wyczerpującej i szczegółowej odpowiedzi.";
        }
        return enhancedPrompt;
    }
}

class Gpt4Optimizer extends PromptOptimizer {
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
class ClaudeOptimizer extends PromptOptimizer {
optimize(userInput, mode, params) {
const structure = `Użytkownik: Cześć. Potrzebuję Twojej pomocy z następującym zadaniem. Proszę, działaj jako pomocny i nieszkodliwy asystent AI z ekspertyzą w dziedzinie: ${mode}. Twoja odpowiedź powinna być etyczna, bezstronna i przemyślana.
Oto kontekst i moje polecenie:
${userInput}
Proszę, udziel szczegółowej i dobrze uzasadnionej odpowiedzi. Jeśli to możliwe, przedstaw swój proces myślowy.
Asystent:`;
return this.applyCommonPractices(structure.trim(), 'Claude', mode, params);
}
}

class GeminiOptimizer extends PromptOptimizer {
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
return this.applyCommonPractiacces(structure.trim(), 'Gemini', mode, params);
}
}
class PerplexityOptimizer extends PromptOptimizer {
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
// Fabryka (Factory) wybierająca odpowiedni optymalizator
const optimizers = {
'GPT-4': new Gpt4Optimizer(),
'GPT-3.5': new Gpt4Optimizer(), // GPT-3.5 używa podobnej struktury
'Claude': new ClaudeOptimizer(),
'Gemini': new GeminiOptimizer(),
'Perplexity': new PerplexityOptimizer(),
};
exports.optimize = (userInput, model, mode, params) => {
const optimizer = optimizers[model];
if (!optimizer) {
// Zwróć oryginalny tekst, jeśli model nie jest znany
return userInput;
}
return optimizer.optimize(userInput, mode, params);
};  