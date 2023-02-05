import React, { ChangeEvent } from 'react';

interface DialogInputBoxProps<T> {
  heading: string;
  type?: string;
  required?: boolean;
  value: T;
  setValue: (param: T) => void;
  placeholder?: string;
}

const DialogInputBox = (
  {
    heading,
    type = 'text',
    required = false,
    value,
    setValue,
    placeholder = " "
  }: DialogInputBoxProps<any>) => {
  return (
    <div className={`flex min-w-[200px] flex-col 2xl:flex-row`}>
      <label className="w-36 font-medium">{`${heading}:`}</label>
      <input
        className="w-52 focus:text-white bg-gray-500 appearance-none rounded py-2 px-4 text-gray-300 leading-tight focus:outline-none focus:border-purple-500 border border-1 border-gray-600"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => setValue(e.target.value)}
        step="0.01"
        required={required}
      />
    </div>
  )
};

export default DialogInputBox;