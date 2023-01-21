import React from 'react';
import ReportBugButton from "./components/report-bug/report-bug-button";

const Footer = () => {
  return (
    <div className="flex items-center bg-gray-800 text-white p-2 fixed bottom-0 w-full">
      <ReportBugButton/>
    </div>
  )
};

export default Footer;