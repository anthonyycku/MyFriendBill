import React, { ReactNode } from 'react';

const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row w-full p-4 md:space-x-4 space-y-2 md:space-y-0">
      {children}
    </div>
  )
};

export default PageContainer;