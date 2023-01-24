import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const AppContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="flex flex-grow text-white bg-gray-900 pb-16">
      {children}
    </div>
  )
};

export default AppContainer;