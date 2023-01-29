import React from 'react';
import { UserData } from "../create-edit-debt-dialog";

const SelectedUser = ({
                        user,
                        showUsers,
                        setShowUsers
                      }: { user: UserData, showUsers: boolean, setShowUsers: (show: boolean) => void }) => {

  const buttonFocus = (): string => {
    return showUsers ? 'focus:bg-gray-800 bg-gray-800 border border-1 border-gray-400 shadow-[inset_0_0_3px_3px_#323232]' : 'bg-gray-600';
  }

  return (
    <>
      <input value={user.name} type="text" className="rounded-l bg-gray-500 min-w-56 w-auto ml-4 px-2" disabled/>
      <button
        onClick={() => setShowUsers(!showUsers)}
        type="button"
        className={`${buttonFocus()} border-r-2 border-gray-500 px-4 py-2 text-sm font-medium rounded-r-lg text-white hover:bg-gray-700 `}
      >
        Find Users
        <i className="fa fa-user ml-2"/>
      </button>
    </>
  )
};

export default SelectedUser;