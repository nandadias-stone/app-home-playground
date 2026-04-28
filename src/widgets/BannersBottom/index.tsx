import { type ComponentType } from 'react';
import { createVersionedWidget } from '../_helpers/createVersionedWidget';

const modules = import.meta.glob<Record<string, ComponentType<any>>>('./v*.tsx', {
  eager: true,
});

const widget = createVersionedWidget(modules);

export const BannersBottom = widget.component;
export const BannersBottomVersions = widget.versions;
export type BannersBottomVersion = string;
