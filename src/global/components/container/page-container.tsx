import React, { ReactNode } from 'react';

const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex space-x-4 w-full h-full p-4">
      {children}
    </div>
  )
};

export default PageContainer;