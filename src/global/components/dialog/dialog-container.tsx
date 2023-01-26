import React, { ReactNode } from 'react';
import DialogBackground from "./dialog-background";

interface ModalContainerProps {
  children: ReactNode;
  animationClass: string;
  modalRef: any;
}

const DialogContainer = ({ children, animationClass, modalRef }: ModalContainerProps) => {

  return (
    <DialogBackground>
      <div ref={modalRef} className={`${animationClass} bg-gray-800 rounded-lg p-8 w-1/3 overflow-auto`}>
        {children}
      </div>
    </DialogBackground>
  )
};

export default DialogContainer;