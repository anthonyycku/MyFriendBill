import React from 'react';
import { UserTableData } from "../../../../models/user.model";

const SelectedUser = ({
                        user,
                        showUsers,
                        setShowUsers
                      }: { user: UserTableData, showUsers: boolean, setShowUsers: (show: boolean) => void }) => {

  const buttonFocus = (): string => {
    return showUsers ? 'focus:bg-gray-800 bg-gray-800 border border-1 border-gray-400 shadow-[inset_0_0_3px_3px_#323232]' : 'bg-gray-600';
  }

  return (
    <div className="flex items-center mt-2 2xl:mt-0">
      <input value={user.name} type="text" className="h-[36px] w-52 rounded-l bg-gray-500 w-auto 2xl:ml-4 px-2"
             disabled/>
      <button
        onClick={() => setShowUsers(!showUsers)}
        type="button"
        className={`${buttonFocus()} border-r-2 border-gray-500 px-4 py-2 text-sm font-medium rounded-r-lg text-white hover:bg-gray-700 `}
      >
        Find Users
        <i className="fa fa-user ml-2"/>
      </button>
    </div>
  )
};

export default SelectedUser;