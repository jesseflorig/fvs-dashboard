# Quickstart: Grid Layout System Data Model

## Overview

This quickstart guide explains how to use the grid layout system data models in your TypeScript project.

## Usage

```typescript
import { Panel, GridLayout, PanelSize } from './types/layout';

// Create a panel
const myPanel: Panel = {
  id: 'panel-1',
  x: 0,
  y: 0,
  width: 2,
  height: 2,
  contentId: 'sensor-status'
};

// Create a layout
const myLayout: GridLayout = {
  width: 12,
  height: 8,
  panels: [myPanel]
};
```

## Supported Sizes

```typescript
// Use standard panel sizes
const panelSize: PanelSize = '2x2';

// Or use direct grid units
const panelSize = {
  width: 2,
  height: 2
};
```

## Persistence

The data model is designed to be serializable for persistence.