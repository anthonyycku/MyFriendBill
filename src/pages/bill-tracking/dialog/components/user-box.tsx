import React, { FC } from 'react';
import { UserTableData } from "../../../../models/user.model";

export interface UserBoxProps {
  title: string;
  data: UserTableData[];
  otherUser: UserTableData;
  setOtherUser: (user: UserTableData) => void;
}

const UserBox: FC<UserBoxProps> = ({ title, data, otherUser, setOtherUser }) => {

  return (
    <div
      className="flex flex-col bg-gray-600 overflow-y-auto h-40 lg:h-60 divide-y divide-gray-100 rounded lg:w-[49%] lg:mb-2">
      <div className="p-2 sticky top-0 text-center bg-gray-700 w-full font-medium">{title}</div>
      {data.length > 0 && data.map(item => (
        <button
          className={`truncate min-h-[35px] px-2 hover:bg-blue-600 hover:text-blue-200 ${otherUser.id === item.id ? 'shadow-[inset_0_0_5px_1px_#10b305] text-emerald-500' : ''}`}
          key={item.id}
          type="button"
          onClick={() => setOtherUser(item)}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
};

export default UserBox;