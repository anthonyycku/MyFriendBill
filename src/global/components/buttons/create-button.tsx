import React from 'react';

const CreateButton = ({ handleClick, text }: { handleClick: any, text: string }) => {

  return (
    <button
      className="truncate min-h-[40px] flex items-center space-x-2 text-green-500 border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-3 text-center border-green-500 hover:text-white hover:bg-green-600"
      onClick={handleClick}
    >
      <i className="fa fa-plus-circle" style={{ fontSize: '1.3rem' }}/>
      <p>{text}</p>
    </button>
  )
};

export default CreateButton;