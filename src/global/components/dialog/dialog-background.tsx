import React from 'react';

interface ModalBackgroundProps {
  children: React.ReactNode;
}

const DialogBackground = ({ children }: ModalBackgroundProps) => {

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center p-6 bg-black bg-opacity-75 overflow-hidden">
      {children}
    </div>
  )
};

export default DialogBackground;