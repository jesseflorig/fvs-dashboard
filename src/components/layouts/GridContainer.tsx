import React from 'react';
import { GridLayout } from '../../types/grid-layout';

interface GridContainerProps {
  layout: GridLayout;
  children?: React.ReactNode;
}

const GridContainer: React.FC<GridContainerProps> = ({ layout, children }) => {
  const gridTemplateColumns = `repeat(${layout.width}, 1fr)`;
  const gridTemplateRows = `repeat(${layout.height}, 1fr)`;

  return (
    <div 
      className="grid gap-2 p-2 bg-gray-50 rounded-lg"
      style={{
        gridTemplateColumns,
        gridTemplateRows,
        minHeight: '500px'
      }}
    >
      {children}
    </div>
  );
};

export default GridContainer;