import React from 'react';
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="my-4 text-lg font-bold">Page not found</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
        onClick={() => navigate(-1)}
      >
        Back to previous page
      </button>
    </div>
  );
};

export default PageNotFound;