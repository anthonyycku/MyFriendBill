import React from 'react';
import './css/loading-dots.css'

const LoadingDots = ({ text }: { text: string }) => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="bg-gray-500 py-2 px-5 rounded-lg flex items-center flex-col">
        <div className="loader-dots block relative w-20 h-5 mt-2">
          <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
          <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
          <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
          <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-white text-xs font-medium mt-2 text-center">
          {text}
        </div>
      </div>
    </div>
  )
};

export default LoadingDots;