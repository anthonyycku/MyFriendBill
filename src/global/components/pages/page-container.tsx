import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="text-white bg-gray-900 pb-24 pt-12">
      {children}
    </div>
  )
};

export default PageContainer;