import React, { ReactNode } from 'react';

interface ModalContainerProps {
  children: ReactNode;
  animationClass: string;
  modalRef: any;
}

const ModalContainer = ({ children, animationClass, modalRef }: ModalContainerProps) => {

  return (
    <div ref={modalRef} className={`${animationClass} bg-gray-800 rounded-lg p-8 w-1/3`}>
      {children}
    </div>
  )
};

export default ModalContainer;