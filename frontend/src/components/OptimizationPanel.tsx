import { OptimizationParams } from '../types';

interface Props {
    mode: string;
    setMode: (mode: string) => void;
    params: OptimizationParams;
    setParams: (params: OptimizationParams) => void;
}

const modes = ['Akademicki', 'Kreatywny', 'Techniczny', 'Biznesowy', 'Analityczny'];

const OptimizationPanel = ({ mode, setMode, params, setParams }: Props) => {
    const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParams({ ...params, [e.target.name]: parseFloat(e.target.value) });
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-300 mb-3">2. Skonfiguruj Optymalizację</h3>
            <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Tryb</label>
                <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-sm focus:ring-indigo-500 focus:border-indigo-500">
                    {modes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
            </div>
            <div className="space-y-4 mt-4">
                <div>
                    <label htmlFor="temperature" className="block text-xs font-medium text-gray-400">Temperatura: <span className="font-semibold text-indigo-400">{params.temperature}</span></label>
                    <input type="range" id="temperature" name="temperature" min="0" max="1" step="0.1" value={params.temperature} onChange={handleParamChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                    <label htmlFor="maxLength" className="block text-xs font-medium text-gray-400">Maks. Długość: <span className="font-semibold text-indigo-400">{params.maxLength}</span></label>
                    <input type="range" id="maxLength" name="maxLength" min="50" max="4000" step="50" value={params.maxLength} onChange={handleParamChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                    <label htmlFor="detailLevel" className="block text-xs font-medium text-gray-400">Poziom Szczegółów: <span className="font-semibold text-indigo-400">{(params.detailLevel * 100).toFixed(0)}%</span></label>
                    <input type="range" id="detailLevel" name="detailLevel" min="0.1" max="1" step="0.1" value={params.detailLevel} onChange={handleParamChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default OptimizationPanel;