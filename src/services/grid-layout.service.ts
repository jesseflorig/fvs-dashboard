import { Panel, GridLayout, PanelSize, PANEL_SIZES } from '../types/grid-layout';

export class GridLayoutService {
  /**
   * Validates if a panel fits within the grid boundaries
   */
  static validatePanelBounds(panel: Panel, layout: GridLayout): boolean {
    return (
      panel.x >= 0 &&
      panel.y >= 0 &&
      panel.x + panel.width <= layout.width &&
      panel.y + panel.height <= layout.height
    );
  }

  /**
   * Validates if a panel has a valid size
   */
  static validatePanelSize(panel: Panel): boolean {
    // Check if the panel size is one of the valid sizes
    const validSizes = Object.keys(PANEL_SIZES) as PanelSize[];
    const panelSize = `${panel.width}x${panel.height}` as PanelSize;
    
    return validSizes.includes(panelSize);
  }

  /**
   * Validates if panels in a layout don't overlap with each other
   */
  static validateNoOverlaps(layout: GridLayout): boolean {
    for (let i = 0; i < layout.panels.length; i++) {
      const panelA = layout.panels[i];
      
      for (let j = i + 1; j < layout.panels.length; j++) {
        const panelB = layout.panels[j];
        
        // Check if panels overlap
        if (
          panelA.x < panelB.x + panelB.width &&
          panelA.x + panelA.width > panelB.x &&
          panelA.y < panelB.y + panelB.height &&
          panelA.y + panelA.height > panelB.y
        ) {
          return false;
        }
      }
    }
    
    return true;
  }

  /**
   * Validates if a proposed panel position is valid within the layout
   */
  static validatePanelPosition(panel: Panel, layout: GridLayout): boolean {
    // Check if panel position is within bounds
    if (!this.validatePanelBounds(panel, layout)) {
      return false;
    }
    
    // Check if panel has valid size
    if (!this.validatePanelSize(panel)) {
      return false;
    }
    
    return true;
  }

  /**
   * Validates the entire layout for correctness
   */
  static validateLayout(layout: GridLayout): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check if all panels fit within boundaries
    for (const panel of layout.panels) {
      if (!this.validatePanelBounds(panel, layout)) {
        errors.push(`Panel ${panel.id} is out of grid bounds`);
      }
      
      // Check if panel has valid size
      if (!this.validatePanelSize(panel)) {
        errors.push(`Panel ${panel.id} has invalid size`);
      }
    }
    
    // Check for overlaps
    if (!this.validateNoOverlaps(layout)) {
      errors.push('Overlapping panels detected');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}