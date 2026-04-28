import type { WidgetId } from './widget-registry';

export type WidgetConfig = {
  id: WidgetId;
  enabled: boolean;
  version: string;
};

export type PlaygroundConfig = {
  widgets: WidgetConfig[];
};
