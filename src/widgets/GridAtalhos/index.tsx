import { type ComponentType } from 'react';
import { createVersionedWidget } from '../_helpers/createVersionedWidget';

const modules = import.meta.glob<Record<string, ComponentType<any>>>('./v*.tsx', {
  eager: true,
});

const widget = createVersionedWidget(modules);

export const GridAtalhos = widget.component;
export const GridAtalhosVersions = widget.versions;
export type GridAtalhosVersion = string;
