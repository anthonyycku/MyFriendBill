import React from 'react';
import { DevFeaturesKey } from "../../../global/constants/local-storage.constants";

interface DevToggleButtonProps {
  devFeatures: boolean;
  setDevFeatures: (devFeatures: boolean) => void;
}

const DevToggleButton = ({ devFeatures, setDevFeatures }: DevToggleButtonProps) => {

  const handleToggleChange = (checked: boolean) => {
    localStorage.setItem(DevFeaturesKey, `${checked}`);
    setDevFeatures(checked);
  }

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={devFeatures}
        onChange={e => handleToggleChange(e.target.checked)}
        className="sr-only peer"
      />
      <div
        className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle Dev Pages</span>
    </label>
  )
};

export default DevToggleButton;