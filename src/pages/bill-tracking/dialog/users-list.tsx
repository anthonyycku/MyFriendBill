import React, { FC, useDeferredValue, useEffect, useState } from 'react';
import DialogContainer from "../../../global/components/dialog/dialog-container";
import { DialogProps } from "../../../global/components/dialog/models/dialog-props";
import { getUsersList } from "../api/bill-tracking.api";
import { UserTableData } from "../../../models/user.model";
import LoadingDots from "../../../global/components/loading/loading-dots";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import UserSearchBar from "./components/user-search-bar";
import UserBox from "./components/user-box";
import Divider from "../../../global/components/divider/divider";
import CustomUserBox from "./components/custom-user-box";

interface UsersDialogProps extends DialogProps {
  otherUser: UserTableData;
  setOtherUser: (user: UserTableData) => void;
}

const UsersList: FC<UsersDialogProps> = ({ setOpenDialog, animationClass, modalRef, otherUser, setOtherUser }) => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [usersList, setUsersList] = useState<UserTableData[]>([]);
  const [customUsersList, setCustomUsersList] = useState<UserTableData[]>([]);
  const [guestList, setGuestList] = useState<UserTableData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearch = useDeferredValue(searchQuery);

  const [showGuests, setShowGuests] = useState(false);
  const [refresh, setRefresh] = useState(false);


  const filterBySearch = (data: UserTableData[]) => {
    return data.filter(user => user.name.toLowerCase().includes(deferredSearch.toLowerCase()));
  }

  useEffect(() => {
    setLoadingList(true);
    getUsersList(userId!).then(response => {
      const filteredUsers = response.filter((user: UserTableData) => user.id !== userId);
      const usersList = filteredUsers.filter((user: UserTableData) => !user.owner_id && user.google_id).sort((a, b) => a.name.localeCompare(b.name));
      const customUsersList = filteredUsers.filter((user: UserTableData) => user.owner_id).sort((a, b) => a.name.localeCompare(b.name));
      const guestList = filteredUsers.filter((user: UserTableData) => !user.google_id && !user.owner_id).sort((a, b) => a.name.localeCompare(b.name));
      setUsersList(usersList)
      setCustomUsersList(customUsersList);
      setGuestList(guestList);
    }).catch(error => console.error(error))
      .finally(() => setLoadingList(false));
  }, [refresh])

  return (
    <DialogContainer modalRef={modalRef} animationClass={animationClass} title="Users List">
      <div>
        {loadingList ? (
          <LoadingDots text="Fetching users..."/>
        ) : (
          <div className="space-y-2">
            <span className="flex">
              <UserSearchBar deferredSearch={deferredSearch} setSearchQuery={setSearchQuery}/>
              <div className="flex items-center space-x-2">
                <input type="checkbox" checked={showGuests} onChange={() => setShowGuests(!showGuests)}/>
                <p>Show Guests</p>
              </div>
            </span>
            <div
              className="flex flex-col lg:flex-row lg:justify-between lg:space-y-0 space-y-2 lg:flex-wrap">
              <UserBox title="Authorized Users" data={filterBySearch(usersList)} otherUser={otherUser}
                       setOtherUser={setOtherUser}/>
              <CustomUserBox title="Custom Users" data={filterBySearch(customUsersList)} otherUser={otherUser}
                             setOtherUser={setOtherUser} setRefresh={setRefresh}/>
              {showGuests && <UserBox title="Guest Users" data={filterBySearch(guestList)} otherUser={otherUser}
                                      setOtherUser={setOtherUser}/>}
            </div>

            <Divider/>

            <button
              className="w-[66px] max-h-[40px] bg-amber-600 hover:bg-green-700 text-white p-2 rounded-lg font-medium"
              type="button"
              onClick={() => setOpenDialog!(false)}
            >
              Okay
            </button>
          </div>
        )}
      </div>
    </DialogContainer>
  )
};

export default UsersList;