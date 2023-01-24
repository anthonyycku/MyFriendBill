import React, { ReactNode } from 'react';

const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full p-4 space-x-4">
      {children}
    </div>
  )
};

export default PageContainer;