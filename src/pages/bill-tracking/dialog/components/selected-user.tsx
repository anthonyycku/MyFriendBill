import React from 'react';
import { UserData } from "../create-edit-debt-dialog";

const SelectedUser = ({ user }: { user: UserData }) => {
  return (
    <>
      <input value={user.name} type="text" className="rounded-l bg-gray-500 min-w-56 w-auto ml-4 px-2" disabled/>
      <button
        type="button"
        className={`border-r-2 bg-gray-600 border-gray-500 px-4 py-2 text-sm font-medium rounded-r-lg text-white hover:bg-gray-700 `}
      >
        Find Users
        <i className="fa fa-user ml-2"/>
      </button>

    </>
  )
};

export default SelectedUser;