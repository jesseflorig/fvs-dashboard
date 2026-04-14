# Data Model: Grid Layout System

## Overview

This document defines the TypeScript interfaces for the grid layout system used in the dashboard. It details the structure of panels and layout containers and defines supported panel sizes.

## Panel Interface

The `Panel` interface defines the structure for individual dashboard panels.

```typescript
interface Panel {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  contentId: string;
  config?: PanelConfig;
}
```

### Properties

- **id**: Unique identifier for the panel
- **x**: X-coordinate (column) of the panel's position
- **y**: Y-coordinate (row) of the panel's position
- **width**: Width of the panel in grid units
- **height**: Height of the panel in grid units
- **contentId**: Identifier for the panel's content type
- **config**: Optional configuration object for additional panel properties

## GridLayout Interface

The `GridLayout` interface defines the structure for a complete dashboard layout.

```typescript
interface GridLayout {
  width: number;
  height: number;
  panels: Panel[];
  layoutId?: string;
  name?: string;
}
```

### Properties

- **width**: Total width of the grid in grid units
- **height**: Total height of the grid in grid units
- **panels**: Array of panel objects that compose the layout
- **layoutId**: Optional identifier for the layout
- **name**: Optional name for the layout

## Supported Panel Sizes

The following panel sizes are supported in the layout system:

- **1x1**: Single grid unit in both dimensions
- **2x1**: Two grid units wide, one grid unit tall
- **2x2**: Two grid units wide, two grid units tall
- **2x4**: Two grid units wide, four grid units tall
- **4x4**: Four grid units wide, four grid units tall

These sizes are defined as enums for type safety:

```typescript
type PanelSize = '1x1' | '2x1' | '2x2' | '2x4' | '4x4';

interface PanelSizeConfig {
  width: number;
  height: number;
}
```

### Panel Size Mappings

```typescript
const PANEL_SIZES: Record<PanelSize, PanelSizeConfig> = {
  '1x1': { width: 1, height: 1 },
  '2x1': { width: 2, height: 1 },
  '2x2': { width: 2, height: 2 },
  '2x4': { width: 2, height: 4 },
  '4x4': { width: 4, height: 4 }
};
```

## Panel Configuration

The `PanelConfig` interface provides additional configuration options for panels:

```typescript
interface PanelConfig {
  title?: string;
  showHeader?: boolean;
  refreshInterval?: number;
  [key: string]: unknown;
}
```

### Properties

- **title**: Display title for the panel
- **showHeader**: Whether to display the panel header
- **refreshInterval**: Automatic refresh interval in seconds
- **[key: string]: unknown**: Additional properties that can be added dynamically

## Data Model Usage

The data model will be used by:
1. Dashboard components to render panels
2. Layout service to manage panel arrangements
3. Persistence layer to save and restore layouts