import React from 'react';

interface DropdownMenuProps<T> {
  value: string;
  menuItems: string[];
  styles?: string;
  setChangeValue: (direction: T) => void;
}

const DropdownMenu = ({ value, menuItems, styles = '', setChangeValue }: DropdownMenuProps<string>) => {

  return (
    <select
      value={value}
      onChange={e => setChangeValue(e.target.value)}
      className={`${styles} cursor-pointer font-medium outline-0 bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full min-w-[80px] p-2 bg-gray-700 border-gray-600 text-gray-400 focus:border-blue-500`}
    >
      {menuItems.length > 0 && menuItems.map(option => (
        <option
          className="font-medium"
          key={option}
        >
          {option}
        </option>
      ))}
    </select>
  )
};

export default DropdownMenu;