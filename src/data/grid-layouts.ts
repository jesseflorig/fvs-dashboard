import { GridLayout } from '../types/grid-layout';

// Sample layouts for testing
export const SAMPLE_LAYOUTS: GridLayout[] = [
  {
    width: 8,
    height: 4,
    layoutId: 'default',
    name: 'Default Dashboard',
    panels: [
      {
        id: 'panel-interior-temp',
        x: 0,
        y: 0,
        width: 1,
        height: 1,
        contentId: 'interiorTemp'
      },
      {
        id: 'panel-exterior-temp',
        x: 1,
        y: 0,
        width: 1,
        height: 1,
        contentId: 'exteriorTemp'
      },
      {
        id: 'panel-battery',
        x: 0,
        y: 1,
        width: 1,
        height: 1,
        contentId: 'battery'
      },
      {
        id: 'panel-lock',
        x: 1,
        y: 1,
        width: 1,
        height: 1,
        contentId: 'door-lock'
      },
      {
        id: 'panel-fuel',
        x: 2,
        y: 0,
        width: 2,
        height: 1,
        contentId: 'fuel'
      },
      {
        id: 'panel-oil',
        x: 2,
        y: 1,
        width: 2,
        height: 1,
        contentId: 'oil'
      },
      {
        id: 'panel-mileage',
        x: 2,
        y: 2,
        width: 2,
        height: 1,
        contentId: 'mileage'
      },
      {
        id: 'panel-location',
        x: 4,
        y: 0,
        width: 4,
        height: 4,
        contentId: 'location'
      }
    ]
  }
];
