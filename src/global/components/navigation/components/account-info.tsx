import React from 'react';

interface accountProps {
  name: string;
  imageUrl: string;
}

const AccountInfo = ({ name, imageUrl }: accountProps) => {
  return (
    <div className="flex flex-col mr-4">
      <p className="text-white">Signed in as:</p>
      <div className="flex">
        <img width={20} src={imageUrl} alt="" referrerPolicy="no-referrer"/>
        <p className="text-white ml-2">{name}</p>
      </div>
    </div>
  )
};

export default AccountInfo;