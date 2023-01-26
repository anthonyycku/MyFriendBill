import React from 'react';
import CreateButton from "../../../../../global/components/buttons/create-button";

const EmptyTable = () => {

  const handleCreateButton = () => {
  }

  return (
    <div className="flex flex-col justify-center items-center h-full text-gray-200 space-y-2">
      <i className="fa fa-info-circle" style={{ fontSize: '3rem' }}/>
      <p className="font-medium">There is no data to display</p>

      <CreateButton handleClick={handleCreateButton} text="Create new debt"/>
    </div>
  )
};

export default EmptyTable;