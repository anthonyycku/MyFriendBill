import React from 'react';

interface ModalBackgroundProps {
  children: React.ReactNode;
}

const ModalBackground = ({ children }: ModalBackgroundProps) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 bg-black bg-opacity-75">
      {children}
    </div>
  )
};

export default ModalBackground;