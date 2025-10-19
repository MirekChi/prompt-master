import { LLM } from '../types';
import { Info } from 'lucide-react';

interface Props {
    models: LLM[];
    selectedModel: LLM;
    onSelect: (model: LLM) => void;
}

const ModelSelector = ({ models, selectedModel, onSelect }: Props) => (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <label htmlFor="model-select" className="block text-sm font-medium text-gray-300 mb-2">1. Wybierz Model LLM</label>
        <select
            id="model-select"
            value={selectedModel.id}
            onChange={(e) => onSelect(models.find(m => m.id === e.target.value)!)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
        >
            {models.map(model => <option key={model.id} value={model.id}>{model.name}</option>)}
        </select>
        <div className="mt-4 p-3 bg-gray-900/50 rounded-md text-xs text-gray-400">
            <p className="font-bold text-gray-200 flex items-center"><Info size={14} className="mr-2" /> Specyfikacja: {selectedModel.name}</p>
            <p className="mt-2"><strong>Limit tokenów:</strong> {selectedModel.tokenLimit}</p>
            <p className="mt-1"><strong>Mocne strony:</strong> {selectedModel.strengths.join(', ')}</p>
        </div>
    </div>
);

export default ModelSelector;