import React, { useEffect, useRef, useState } from 'react';
import LoadingDots from "../../../../global/components/loading/loading-dots";
import { createCustomUser, getUsersList } from "../../api/bill-tracking.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { UserTableData } from "../../../../models/user.model";
import { Tooltip } from "react-tooltip";
import { errorHandler } from "../../../../global/functions/error-handler/error-handler";
import "react-tooltip/dist/react-tooltip.css";

const UsersList = ({
                     otherUser,
                     setOtherUser,
                     setShowUsers
                   }: { otherUser: UserTableData, setShowUsers: (show: boolean) => void, setOtherUser: (user: UserTableData) => void }) => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [usersList, setUsersList] = useState<UserTableData[]>([]);
  const [customUsersList, setCustomUsersList] = useState<UserTableData[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [refresh, setRefresh] = useState(false);

  const [toggleInput, setToggleInput] = useState(false);
  const [newUserName, setNewUserName] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLoadingList(true);
    getUsersList(userId!).then(response => {
      const filteredUsers = response.filter((user: UserTableData) => user.id !== userId);
      const usersList = filteredUsers.filter((user: UserTableData) => !user.owner_id).sort((a, b) => a.name.localeCompare(b.name));
      const customUsersList = filteredUsers.filter((user: UserTableData) => user.owner_id).sort((a, b) => a.name.localeCompare(b.name));
      setUsersList(usersList)
      setCustomUsersList(customUsersList);
    }).catch(error => console.error(error))
      .finally(() => setLoadingList(false));
  }, [refresh])

  useEffect(() => {
    if (toggleInput) inputRef.current!.focus();
  }, [toggleInput])

  const handleUserSelect = (user: UserTableData) => {
    setOtherUser(user);
    setShowUsers(false);
  }

  const selectedUserStyle = (currentUser: UserTableData): string => {
    return otherUser.id === currentUser.id ? 'shadow-[inset_0_0_5px_1px_#10b305]' : ''
  }

  const onSubmitNewUser = () => {
    if (newUserName.length === 0) return;
    setToggleInput(false);
    const data: Partial<UserTableData> = { name: newUserName, owner_id: userId }

    createCustomUser(data).then(() => {
      setRefresh(prev => !prev);
    }).catch(error => errorHandler(error));
  }

  return (
    <div className="w-full bg-gray-600 h-40 rounded overflow-auto mt-4 p-2">
      {loadingList ? (
        <LoadingDots text="Fetching users..."/>
      ) : (
        <div className="flex w-full">
          <div className="flex flex-col w-full">
            <p className="self-center font-medium p-2">Existing users</p>
            {usersList.length > 0 && usersList.map(user => (
              <button
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className={`hover:bg-gray-500 text-left p-1 px-4 ${selectedUserStyle(user)} truncate`}
              >
                {user.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col w-full">
            <span className="w-full flex items-center justify-center">
            <p className="font-medium p-2">Your custom users</p>
              <Tooltip anchorId="custom-user-add" content="Add custom user" place="top" variant="info"/>
              <button
                onClick={() => setToggleInput(prev => !prev)}
                id="custom-user-add"
                type="button"
                className="bg-emerald-500 hover:bg-emerald-700 text-white px-1 font-bold rounded-full"
              >
              <i className="fa fa-user-plus"/>
                </button>
            </span>

            {toggleInput && (
              <div className="flex items-center border-b border-emerald-500 mx-2 mb-2">
                <input
                  ref={inputRef}
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  className="appearance-none bg-transparent border-none w-full text-white px-2 leading-tight focus:outline-none"
                  type="text" placeholder="Enter custom user"/>
                <button
                  className="mb-1 flex-shrink-0 bg-teal-500 hover:bg-emerald-700 border-teal-500 hover:border-emerald-700 text-sm border-4 text-white px-2 rounded"
                  type="button"
                  onClick={onSubmitNewUser}
                >
                  Add
                </button>
              </div>
            )}

            {customUsersList.length > 0 && customUsersList.map(user => (
              <button
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className={`hover:bg-gray-500 text-left p-1 px-2 ${selectedUserStyle(user)}`}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
};

export default UsersList;