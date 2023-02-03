import React, { useEffect, useState } from 'react';
import LoadingDots from "../../../../global/components/loading/loading-dots";
import { getUsersList } from "../../api/bill-tracking.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { UserTableData } from "../../../../models/user.model";

const UsersList = ({
                     otherUser,
                     setOtherUser,
                     setShowUsers
                   }: { otherUser: UserTableData, setShowUsers: (show: boolean) => void, setOtherUser: (user: UserTableData) => void }) => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [usersList, setUsersList] = useState<UserTableData[]>([]);
  const [customUsersList, setCustomUsersList] = useState<UserTableData[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);

  useEffect(() => {
    getUsersList(userId!).then(response => {
      const filteredUsers = response.filter((user: UserTableData) => user.id !== userId);
      const usersList = filteredUsers.filter((user: UserTableData) => !user.owner_id).sort((a, b) => a.name.localeCompare(b.name));
      const customUsersList = filteredUsers.filter((user: UserTableData) => user.owner_id).sort((a, b) => a.name.localeCompare(b.name));
      setUsersList(usersList)
      setCustomUsersList(customUsersList);
    }).catch(error => console.error(error))
      .finally(() => setLoadingList(false));
  }, [])

  const handleUserSelect = (user: UserTableData) => {
    setOtherUser(user);
    setShowUsers(false);
  }

  const selectedUserStyle = (currentUser: UserTableData): string => {
    return otherUser.id === currentUser.id ? 'shadow-[inset_0_0_5px_1px_#10b305]' : ''
  }

  return (
    <div className="w-full bg-gray-600 h-40 rounded overflow-auto mt-4">
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
                className={`hover:bg-gray-500 text-left p-1 px-4 ${selectedUserStyle(user)}`}
              >
                {user.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col w-full">
            <div className="self-center font-medium p-2">Your custom users</div>
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