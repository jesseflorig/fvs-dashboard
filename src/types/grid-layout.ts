export interface Panel {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  contentId: string;
  config?: PanelConfig;
}

export interface GridLayout {
  width: number;
  height: number;
  panels: Panel[];
  layoutId?: string;
  name?: string;
}

export type PanelSize = '1x1' | '2x1' | '2x2' | '2x4' | '4x4';

export interface PanelSizeConfig {
  width: number;
  height: number;
}

export const PANEL_SIZES: Record<PanelSize, PanelSizeConfig> = {
  '1x1': { width: 1, height: 1 },
  '2x1': { width: 2, height: 1 },
  '2x2': { width: 2, height: 2 },
  '2x4': { width: 2, height: 4 },
  '4x4': { width: 4, height: 4 }
};

export interface PanelConfig {
  title?: string;
  showHeader?: boolean;
  refreshInterval?: number;
  [key: string]: unknown;
}