import React from 'react';
import ReportBugButton from "./components/report-bug-button";

const Footer = () => {
  return (
    <div className="flex items-center bg-gray-800 text-white p-2 w-full">
      <ReportBugButton/>
    </div>
  )
};

export default Footer;