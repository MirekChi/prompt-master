import { useState, useEffect } from 'react';
import ModelSelector from './components/ModelSelector';
import OptimizationPanel from './components/OptimizationPanel';
import PromptEditor from './components/PromptEditor';
import PromptPreview from './components/PromptPreview';
import TemplateLibrary from './components/TemplateLibrary';
import { LLM, OptimizationParams, Template } from './types';
import { optimizePrompt } from './services/api';

const llmModels: LLM[] = [
    { id: 'GPT-4', name: 'GPT-4', tokenLimit: '128k', strengths: ['Reasoning', 'Complexity', 'Creativity'] },
    { id: 'GPT-3.5', name: 'GPT-3.5', tokenLimit: '16k', strengths: ['Speed', 'Cost-Effective', 'General Tasks'] },
    { id: 'Claude', name: 'Claude 3 Opus', tokenLimit: '200k', strengths: ['Long Context', 'Safety', 'Literary Analysis'] },
    { id: 'Gemini', name: 'Gemini 1.5 Pro', tokenLimit: '1M', strengths: ['Multimodality', 'Google Integration', 'Scalability'] },
    { id: 'Perplexity', name: 'Perplexity', tokenLimit: 'N/A', strengths: ['Web Search', 'Citations', 'Factual Accuracy'] },
];

/**
 * The main application component. It orchestrates the entire UI and state management.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
    const [selectedModel, setSelectedModel] = useState<LLM>(llmModels[0]);
    const [mode, setMode] = useState<string>('Kreatywny');
    const [params, setParams] = useState<OptimizationParams>({
        temperature: 0.7,
        maxLength: 1000,
        detailLevel: 0.6,
    });
    const [userInput, setUserInput] = useState<string>('');
    const [optimizedPrompt, setOptimizedPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (userInput.trim() !== '') {
                handleOptimize();
            } else {
                setOptimizedPrompt('');
            }
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [userInput, selectedModel, mode, params]);

    /**
     * Handles the optimization of the user's prompt by calling the API.
     * It sets the loading state and updates the optimized prompt.
     */
    const handleOptimize = async () => {
        setIsLoading(true);
        try {
            const response = await optimizePrompt({ userInput, model: selectedModel.id, mode, params });
            setOptimizedPrompt(response.optimizedPrompt);
        } catch (error) {
            console.error("Failed to optimize prompt:", error);
            setOptimizedPrompt("Błąd: Nie można wygenerować promptu.");
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handles the selection of a template from the library.
     * @param {Template} template - The selected template.
     */
    const handleSelectTemplate = (template: Template) => {
        setUserInput(template.prompt);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 lg:p-8 font-sans">
            <header className="text-center mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                    Prompt Master
                </h1>
                <p className="text-gray-400 mt-2">Twój drugi pilot inżynierii promptów AI</p>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                <aside className="lg:col-span-3 space-y-6">
                    <ModelSelector models={llmModels} selectedModel={selectedModel} onSelect={setSelectedModel} />
                    <OptimizationPanel mode={mode} setMode={setMode} params={params} setParams={setParams} />
                    <TemplateLibrary onSelectTemplate={handleSelectTemplate} />
                </aside>

                <main className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PromptEditor value={userInput} onChange={setUserInput} />
                    <PromptPreview prompt={optimizedPrompt} isLoading={isLoading} />
                </main>
            </div>
        </div>
    );
}

export default App;
