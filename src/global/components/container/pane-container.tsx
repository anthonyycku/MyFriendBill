import React, { ReactNode } from 'react';

interface PaneContainerProps {
  width?: string;
  children: ReactNode;
}

const PaneContainer = ({ width = "w-full", children }: PaneContainerProps) => {
  return (
    <div
      className={`${width} h-full border-solid border-2 border-emerald-600 rounded-lg p-3 bg-gray-800 shadow-[1px_1px_3px_0] shadow-blue-500 overflow-hidden`}>
      {children}
    </div>
  )
};

export default PaneContainer;