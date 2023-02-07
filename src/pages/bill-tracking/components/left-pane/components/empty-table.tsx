import React, { Suspense } from 'react';
import CreateButton from "../../../../../global/components/buttons/create-button";
import UseDialogHook from "../../../../../global/components/dialog/hooks/use-dialog-hook";
import DialogSpinningLoader from "../../../../../global/components/loading/dialog-spinning-loader";
import CreateEditDebtDialog from "../../../dialog/create-edit-debt-dialog";

const EmptyTable = () => {

  const { modalRef, setOpenDialog, openDialog, animationClass } = UseDialogHook();

  return (
    <div className="flex flex-col justify-center items-center h-full text-gray-200 space-y-2">
      <Suspense fallback={<DialogSpinningLoader/>}>
        {openDialog &&
            <CreateEditDebtDialog animationClass={animationClass} modalRef={modalRef} setOpenDialog={setOpenDialog}/>}
      </Suspense>


      <i className="fa fa-info-circle" style={{ fontSize: '3rem' }}/>
      <p className="font-medium">There is no data to display</p>

      <CreateButton handleClick={() => setOpenDialog(true)} text="Create new bill"/>
    </div>
  )
};

export default EmptyTable;