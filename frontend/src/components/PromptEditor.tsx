interface Props { value: string; onChange: (value: string) => void; }

const PromptEditor = ({ value, onChange }: Props) => (
    <div className="bg-gray-800 rounded-lg shadow-lg h-full flex flex-col">
        <div className="p-3 border-b border-gray-700">
            <h2 className="font-semibold text-lg text-gray-200">Edytor Promptu</h2>
            <p className="text-xs text-gray-400">Opisz zadanie, które chcesz wykonać.</p>
        </div>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full p-4 bg-gray-800 text-gray-200 resize-none focus:outline-none rounded-b-lg font-mono text-sm"
            placeholder="Np. 'Napisz krótki email do klienta...'"
        />
    </div>
);

export default PromptEditor;