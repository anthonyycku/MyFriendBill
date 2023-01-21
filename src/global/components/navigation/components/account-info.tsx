import React, { useEffect, useState } from 'react';

interface accountProps {
  name: string;
  imageUrl: string;
  onClick: () => void;
}

const AccountInfo = ({ onClick, name, imageUrl }: accountProps) => {
  const [showName, setShowName] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 950) {
        setShowName(false);
      } else {
        setShowName(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div
      className="flex font-medium mr-1 text-black bg-white rounded px-2 border-b-2 border-green-500 items-center">
      <img width={25} src={imageUrl} alt="" referrerPolicy="no-referrer" className="rounded-xl"/>
      {showName && <p className="mx-2">{name}</p>}
      <button onClick={onClick} className="hover:text-blue-400">(Sign out)</button>
    </div>
  )
};

export default AccountInfo;