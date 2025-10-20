/**
 * @interface Props
 * @property {string} value - The current value of the text editor.
 * @property {(value: string) => void} onChange - Callback function to handle changes in the editor's content.
 */
interface Props {
    value: string;
    onChange: (value: string) => void;
}

/**
 * A simple text editor component for users to input their prompts.
 * @param {Props} props - The props for the component.
 * @returns {JSX.Element} The rendered PromptEditor component.
 */
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
