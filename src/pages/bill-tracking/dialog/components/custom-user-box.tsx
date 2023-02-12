import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { UserBoxProps } from "./user-box";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { UserTableData } from "../../../../models/user.model";
import { createCustomUser } from "../../api/bill-tracking.api";
import { errorHandler } from "../../../../global/functions/error-handler/error-handler";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

interface CustomUserBox extends UserBoxProps {
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

const CustomUserBox: FC<CustomUserBox> = ({ setOpenDialog, title, data, otherUser, setOtherUser, setRefresh }) => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [toggleInput, setToggleInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [newUserName, setNewUserName] = useState<string>('')

  const onSubmitNewUser = () => {
    if (newUserName.length === 0) return;
    setToggleInput(false);
    const data: Partial<UserTableData> = { name: newUserName, owner_id: userId }

    createCustomUser(data).then(() => {
      setRefresh(prev => !prev);
    }).catch(error => errorHandler(error));
  }

  useEffect(() => {
    if (toggleInput) inputRef.current!.focus();
  }, [toggleInput])

  return (
    <div
      className="flex flex-col bg-gray-600 p-x-2 overflow-y-auto overflow-x-hidden h-40 lg:h-60 divide-y divide-gray-100 rounded lg:w-[49%]">
      {toggleInput ? (
        <div className="flex items-center border-b border-emerald-500 mx-2 my-1">
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
      ) : (
        <div className="p-2 sticky top-0 text-center bg-gray-700 w-full font-medium flex justify-center space-x-2">
          <p>{title}</p>
          <button
            onClick={() => setToggleInput(prev => !prev)}
            id="custom-user-add"
            type="button"
            className="bg-emerald-500 hover:bg-emerald-700 text-white px-1 font-bold rounded-full"
          >
            <i className="fa fa-user-plus"/>
          </button>
          <Tooltip anchorId="custom-user-add" content="Add custom user" place="top" variant="info"/>
        </div>
      )}

      {data.length > 0 && data.map(item => (
        <button
          className={`truncate min-h-[35px] px-2 hover:bg-blue-600 hover:text-blue-200 ${otherUser.id === item.id ? 'shadow-[inset_0_0_5px_1px_#10b305] text-emerald-500' : ''}`}
          key={item.id}
          type="button"
          onClick={() => {
            setOtherUser(item);
            setOpenDialog(false);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
};

export default CustomUserBox;