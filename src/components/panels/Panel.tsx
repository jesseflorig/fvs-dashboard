import React from 'react';
import { Panel } from '../../types/grid-layout';

interface PanelProps {
  panel: Panel;
  children?: React.ReactNode;
}

const PanelComponent: React.FC<PanelProps> = ({ panel, children }) => {
  // Apply grid positioning via CSS
  const style = {
    gridColumn: `${panel.x + 1} / span ${panel.width}`,
    gridRow: `${panel.y + 1} / span ${panel.height}`,
  };

  return (
    <div 
      className="h-full w-full"
      style={style}
    >
      {children}
    </div>
  );
};

export default PanelComponent;