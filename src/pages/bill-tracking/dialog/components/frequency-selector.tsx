import React from 'react';
import DropdownMenu from "../../../../global/components/menu/dropdown-menu";
import { FrequencyOptions } from "../../constants/bill-tracking.constants";

const FrequencySelector = ({ setFrequency }: { setFrequency: (freq: string | null) => void }) => {

  const frequencyOptions = [
    FrequencyOptions.ONE_TIME, FrequencyOptions.EVERY_WEEK, FrequencyOptions.BIWEEKLY, FrequencyOptions.MONTHLY, FrequencyOptions.MONTHLY_TWO, FrequencyOptions.MONTHLY_THREE, FrequencyOptions.MONTHLY_SIX, FrequencyOptions.ANNUALLY
  ];

  return (
    <div className="flex items-center">
      <label className="w-36 font-medium">Frequency:</label>

      <span className="w-40">
      <DropdownMenu
        defaultValue={FrequencyOptions.EVERY_WEEK}
        menuItems={frequencyOptions}
        setChangeValue={setFrequency}
      />
        </span>
    </div>
  )
};

export default FrequencySelector;