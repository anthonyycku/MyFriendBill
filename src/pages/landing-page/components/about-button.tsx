import React from 'react';
import { Link } from "react-router-dom";

const AboutButton = () => {

  return (
    <Link to="/about">
      <button
        type="button"
        className="flex justify-center items-center space-x-2 w-[234px] font-bold py-2.5 px-5 mr-2 mb-2 bg-blue-700 text-sm text-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:text-white focus:z-10 hover:bg-blue-800 hover:bg-blue-700 focus:outline-none"
      >
        <i className="fa fa-info-circle"/>
        <p>Learn about this app</p>
      </button>
    </Link>
  )
};

export default AboutButton;