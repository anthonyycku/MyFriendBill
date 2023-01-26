import React from 'react';
import ReportBugForm from "../../forms/report-bug-form";
import OpenModalHook from "../../modal/hooks/open-modal.hook";

const ReportBugButton = () => {
  const { modalRef, setOpenModal, animationClass, openModal } = OpenModalHook();

  return (
    <>
      <button
        type="button"
        className="flex space-x-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        onClick={() => setOpenModal(true)}
      >
        <i className="fa fa-bug self-center"/>
        <p>Report a bug</p>
      </button>
      {openModal && (
        <ReportBugForm
          animationClass={animationClass}
          modalRef={modalRef}
        />
      )}
    </>
  )
};

export default ReportBugButton;