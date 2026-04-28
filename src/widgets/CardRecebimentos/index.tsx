import { type ComponentType } from 'react';
import { createVersionedWidget } from '../_helpers/createVersionedWidget';

const modules = import.meta.glob<Record<string, ComponentType<any>>>('./v*.tsx', {
  eager: true,
});

const widget = createVersionedWidget(modules);

export const CardRecebimentos = widget.component;
export const CardRecebimentosVersions = widget.versions;
export type CardRecebimentosVersion = string;
