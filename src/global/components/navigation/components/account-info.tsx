import React from 'react';

interface accountProps {
  name: string;
  imageUrl: string;
  onClick: () => void;
}

const AccountInfo = ({ onClick, name, imageUrl }: accountProps) => {
  return (
    <div className="flex font-medium mr-1 text-black bg-white rounded px-2 border-b-2 border-green-500 items-center">
      <img width={25} src={imageUrl} alt="" referrerPolicy="no-referrer"/>
      <p className="mx-2">{name}</p>
      <button onClick={onClick} className="hover:text-blue-400">(Sign out)</button>
    </div>
  )
};

export default AccountInfo;