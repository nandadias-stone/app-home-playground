import { type ComponentType } from 'react';
import { createVersionedWidget } from '../_helpers/createVersionedWidget';

const modules = import.meta.glob<Record<string, ComponentType<any>>>('./v*.tsx', {
  eager: true,
});

const widget = createVersionedWidget(modules);

export const CardCartaoFatura = widget.component;
export const CardCartaoFaturaVersions = widget.versions;
export type CardCartaoFaturaVersion = string;
