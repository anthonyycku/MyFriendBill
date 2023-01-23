import React from 'react';
import '../card-animations.css'
import databaseIcon from '../../../../assets/images/database-icon.png'
import githubIcon from '../../../../assets/images/cat-icon.png'

const DevCard = () => {
  return (
    <div className="flex flex-col w-96">

      <a href="https://app.supabase.com/project/xzxeqvnxhdhbaqwjhtrv" target="_blank" rel="noreferrer">
        <div
          className="flex flex-col justify-between card-border p-6 border shadow-[1px_1px_3px_0] shadow-lime-800 bg-gray-800 hover:bg-gray-700">
          <span className="flex flex-col items-center">
            <img src={databaseIcon} alt=""/>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Go to Database</h5>
          </span>
        </div>
      </a>

      <a href="https://github.com/anthonyycku/MyFriendBill" target="_blank" rel="noreferrer">
        <div
          className="flex flex-col justify-between card-border p-6 border shadow-[1px_1px_3px_0] shadow-lime-800 bg-gray-800 hover:bg-gray-700">
          <span className="flex flex-col items-center">
            <img src={githubIcon} alt=""/>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Go to GitHub</h5>
          </span>
        </div>
      </a>

    </div>
  )
};

export default DevCard;