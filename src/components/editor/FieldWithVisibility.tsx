"use client";

import { Eye, EyeOff, Trash2, Plus } from 'lucide-react';
import { CustomField } from '@/types/invoice';

interface FieldWithVisibilityProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    visible: boolean;
    onToggleVisibility: () => void;
    type?: 'text' | 'email' | 'textarea';
    rows?: number;
}

export const FieldWithVisibility = ({
    label,
    value,
    onChange,
    visible,
    onToggleVisibility,
    type = 'text',
    rows = 2
}: FieldWithVisibilityProps) => {
    const baseInputClass = `w-full px-4 py-2.5 text-sm border border-gray-300 bg-white transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${!visible ? 'opacity-50 bg-gray-50' : ''}`;

    return (
        <div className={!visible ? 'opacity-60' : ''}>
            <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <button
                    type="button"
                    onClick={onToggleVisibility}
                    className={`p-1 rounded-md transition-colors ${visible ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-400 hover:bg-gray-100'}`}
                    title={visible ? 'Cacher ce champ' : 'Afficher ce champ'}
                >
                    {visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
            </div>
            {type === 'textarea' ? (
                <textarea
                    className={`${baseInputClass} resize-none`}
                    rows={rows}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    type={type}
                    className={baseInputClass}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </div>
    );
};

interface CustomFieldsEditorProps {
    fields: CustomField[];
    onAdd: () => void;
    onUpdate: (id: string, updates: Partial<CustomField>) => void;
    onRemove: (id: string) => void;
}

export const CustomFieldsEditor = ({
    fields,
    onAdd,
    onUpdate,
    onRemove
}: CustomFieldsEditorProps) => {
    return (
        <div className="space-y-3 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 uppercase">Lignes personnalisées</span>
                <button
                    type="button"
                    onClick={onAdd}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition-colors"
                >
                    <Plus className="w-3 h-3" />
                    Ajouter
                </button>
            </div>

            {fields.map((field) => (
                <div key={field.id} className="flex gap-2 items-start">
                    <input
                        type="text"
                        placeholder="Label"
                        value={field.label}
                        onChange={(e) => onUpdate(field.id, { label: e.target.value })}
                        className="w-1/3 px-3 py-2 text-sm border border-gray-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    />
                    <input
                        type="text"
                        placeholder="Valeur"
                        value={field.value}
                        onChange={(e) => onUpdate(field.id, { value: e.target.value })}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    />
                    <button
                        type="button"
                        onClick={() => onRemove(field.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
};
