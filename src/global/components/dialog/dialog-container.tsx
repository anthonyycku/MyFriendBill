import React, { ReactNode } from 'react';
import DialogBackground from "./dialog-background";
import Divider from "../divider/divider";

interface ModalContainerProps {
  children: ReactNode;
  animationClass: string;
  modalRef: any;
  title: string;
}

const DialogContainer = ({ children, animationClass, modalRef, title }: ModalContainerProps) => {

  return (
    <DialogBackground>
      <div ref={modalRef}
           className={`${animationClass} min-w-[480px] bg-gray-800 rounded-lg p-8 w-1/3 overflow-auto h-[750px]`}>
        <h1 className="text-white text-3xl font-medium">{title}</h1>
        <Divider/>
        {children}
      </div>
    </DialogBackground>
  )
};

export default DialogContainer;