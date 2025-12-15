// Models Index - Entry point for all invoice models/templates

export { classicModel } from './classic';
export { elegantModel } from './elegant';
export type { TemplateModel, ModelCapabilities } from './types';
export { defaultCapabilities } from './types';

// Available models list
import { classicModel } from './classic';
import { elegantModel } from './elegant';
import { TemplateModel } from './types';

/**
 * All available template models
 * Add new models here as they are created
 */
export const availableModels: TemplateModel[] = [
    classicModel,
    elegantModel,
];

/**
 * Get the default model (isDefault=true)
 */
export const getDefaultModel = (): TemplateModel => {
    return availableModels.find(m => m.isDefault) || classicModel;
};

/**
 * Get a model by ID
 */
export const getModelById = (id: string): TemplateModel | undefined => {
    return availableModels.find(m => m.id === id);
};
