import React, { useEffect, useState } from 'react';
import { UserData } from "../create-edit-debt-dialog";
import LoadingDots from "../../../../global/components/loading/loading-dots";
import { getUsersList } from "../../api/bill-tracking.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

const UsersList = ({
                     otherUser,
                     setOtherUser,
                     setShowUsers
                   }: { otherUser: UserData, setShowUsers: (show: boolean) => void, setOtherUser: (user: UserData) => void }) => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [usersList, setUsersList] = useState<UserData[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);

  useEffect(() => {
    getUsersList().then(response => {
      const usersList = response.filter(user => user.id !== userId).sort((a, b) => a.name.localeCompare(b.name));
      setUsersList(usersList)
    }).catch(error => console.error(error))
      .finally(() => setLoadingList(false));
  }, [])

  const handleUserSelect = (user: UserData) => {
    setOtherUser(user);
    setShowUsers(false);
  }

  const selectedUserStyle = (currentUser: UserData): string => {
    return otherUser.id === currentUser.id ? 'shadow-[inset_0_0_5px_1px_#10b305]' : ''
  }

  return (
    <div className="w-full bg-gray-600 h-40 rounded overflow-auto mt-4">
      {loadingList ? (
        <LoadingDots text="Fetching users..."/>
      ) : (
        <div className="grid grid-cols-2 p-2">
          {usersList.length > 0 && usersList.map(user => (
            <button
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className={`hover:bg-gray-500 text-left p-1 px-2 ${selectedUserStyle(user)}`}
            >
              {user.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
};

export default UsersList;