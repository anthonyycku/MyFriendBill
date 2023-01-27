import React from 'react';

export interface MenuItems {
  name: string;
}

interface DropdownMenuProps<T> {
  defaultValue: string;
  menuItems: MenuItems[];
  ml?: number;
  mr?: number;
  setChangeValue: (direction: T) => void;
}

const DropdownMenu = ({ menuItems, defaultValue, ml = 0, mr = 0, setChangeValue }: DropdownMenuProps<string>) => {

  return (
    <select
      defaultValue={defaultValue}
      onChange={e => setChangeValue(e.target.value)}
      className={`cursor-pointer font-medium outline-0 mr-${mr} ml-${ml} bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full min-w-[80px] p-2 bg-gray-700 border-gray-600 text-gray-400 focus:border-blue-500`}
    >
      {menuItems.length > 0 && menuItems.map((item: MenuItems) => (
        <option
          className="font-medium "
          key={item.name}
        >
          {item.name}
        </option>
      ))}
    </select>
  )
};

export default DropdownMenu;