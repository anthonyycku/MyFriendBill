import React, { useState } from 'react';
import ReportBugForm from "../../../forms/report-bug-form";

const ReportBugButton = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        className="flex space-x-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        onClick={() => setOpenForm(true)}
      >
        <i className="fa fa-bug self-center"/>
        <p>Report a bug</p>
      </button>
      {openForm && <ReportBugForm openForm={openForm} setOpenForm={setOpenForm}/>}
    </>
  )
};

export default ReportBugButton;