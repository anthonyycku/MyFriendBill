import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const AppContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="flex h-full text-white bg-gray-900 overflow-auto mb-20 md:mb-0">
      {children}
    </div>
  )
};

export default AppContainer;