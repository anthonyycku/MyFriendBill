import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="flex flex-grow text-white bg-gray-900 pb-24">
      {children}
    </div>
  )
};

export default PageContainer;