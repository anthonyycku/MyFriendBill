import React, { FC } from 'react';
import { Tabs } from "../constants/about.constants";

interface HeaderTabProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const HeaderTab: FC<HeaderTabProps> = ({ setCurrentTab, currentTab }) => {
  return (
    <div className="w-full lg:w-72">
      <button
        className={`w-1/2 h-10 font-medium text-lg  ${currentTab === Tabs.FEATURES ? 'bg-gray-800 shadow-[inset_0_0_3px_3px_#008b17]' : 'bg-gray-700'}`}
        type="button"
        onClick={() => setCurrentTab(Tabs.FEATURES)}
      >
        Guide
      </button>
      <button
        className={`w-1/2 h-10 font-medium text-lg  ${currentTab === Tabs.INFORMATION ? 'bg-gray-800 shadow-[inset_0_0_3px_3px_#008b17]' : 'bg-gray-700'}`}
        type="button"
        onClick={() => setCurrentTab(Tabs.INFORMATION)}
      >
        Information
      </button>
    </div>
  )
};

export default HeaderTab;