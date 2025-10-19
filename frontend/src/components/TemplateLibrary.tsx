import { useState, useEffect } from 'react';
import { Template } from '../types';
import { getTemplates } from '../services/api';
import { Search } from 'lucide-react';

interface Props { onSelectTemplate: (template: Template) => void; }

const TemplateLibrary = ({ onSelectTemplate }: Props) => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTemplates = async () => setTemplates(await getTemplates());
        fetchTemplates();
    }, []);

    const filteredTemplates = templates.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-300 mb-3">3. Biblioteka Szablonów</h3>
            <div className="relative mb-3">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Szukaj szablonów..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-9 pr-3 text-sm"
                />
            </div>
            <div className="max-h-48 overflow-y-auto space-y-2">
                {filteredTemplates.map(template => (
                    <button
                        key={template._id}
                        onClick={() => onSelectTemplate(template)}
                        className="w-full text-left p-2 bg-gray-700/50 hover:bg-gray-700 rounded-md text-sm transition-colors"
                    >
                        {template.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TemplateLibrary;