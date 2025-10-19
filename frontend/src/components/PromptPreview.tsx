import { Clipboard, Download } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props { prompt: string; isLoading: boolean; }

const PromptPreview = ({ prompt, isLoading }: Props) => {
    const copyToClipboard = () => navigator.clipboard.writeText(prompt);

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg h-full flex flex-col">
            <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                <h2 className="font-semibold text-lg text-gray-200">Zoptymalizowany Prompt</h2>
                <div className="flex items-center gap-2">
                    <button onClick={copyToClipboard} className="p-2 rounded-md hover:bg-gray-700" title="Kopiuj"><Clipboard size={16} /></button>
                </div>
            </div>
            <div className="p-4 overflow-auto h-full relative">
                {isLoading && <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center"><p>Generowanie...</p></div>}
                <SyntaxHighlighter language="markdown" style={atomDark} customStyle={{ background: 'transparent', margin: 0, padding: 0 }}>
                    {prompt || "Tutaj pojawi się zoptymalizowany prompt..."}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default PromptPreview;