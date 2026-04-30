import { type ComponentType } from 'react';
import { createVersionedWidget } from '../_helpers/createVersionedWidget';

const modules = import.meta.glob<Record<string, ComponentType<any>>>('./v*.tsx', {
  eager: true,
});

const widget = createVersionedWidget(modules);

export const CardMeuAgente = widget.component;
export const CardMeuAgenteVersions = widget.versions;
export type CardMeuAgenteVersion = string;

export const CardMeuAgenteStates = [
  { id: 'fixo', label: 'Fixo' },
  { id: 'flutuante', label: 'Flutuante' },
] as const;
