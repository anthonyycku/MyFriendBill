import React from 'react';
import DialogContainer from "../../../global/components/dialog/dialog-container";
import { DialogProps } from "../../../global/components/dialog/models/dialog-props";
import DialogInputBox from "../../../global/components/dialog/components/dialog-input-box";

const CreateDebtDialog = ({ animationClass, modalRef }: DialogProps) => {
  return (
    <DialogContainer animationClass={animationClass} modalRef={modalRef}>
      <>
        <DialogInputBox heading="Hello"/>
      </>
    </DialogContainer>
  )
};

export default CreateDebtDialog;