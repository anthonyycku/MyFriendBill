import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="w-full h-full text-white bg-gray-900 pb-12">
      {children}
    </div>
  )
};

export default PageContainer;