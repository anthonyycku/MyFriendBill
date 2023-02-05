import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DueDateInput = ({ dueDate, setDueDate }: { dueDate: Date | null, setDueDate: (date: Date | null) => void }) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const disableInput = () => {
    setDisabled(() => !disabled);
    setDueDate(null);
  }

  const disabledStyle = (): string => {
    return disabled ? 'bg-red-600' : ''
  }

  return (
    <div className="my-4 flex flex-col 2xl:flex-row">
      <label className="w-36 font-medium">{`Due Date:`}</label>

      <div>
        <DatePicker
          selected={dueDate}
          onChange={(date: Date) => setDueDate(date)}
          className={`${disabled ? 'bg-gray-900' : 'bg-gray-500'} rounded p-2 w-40`}
          disabled={disabled}
          placeholderText={disabled ? "" : "No Due Date"}
        />
      </div>

      <button type="button"
              className={`w-40 min-w-[150px] mt-1 2xl:mt-0 2xl:ml-2 hover:bg-orange-600 flex items-center space-x-1 border border-gray-500 rounded px-4 py-1.5 ${disabledStyle()}`}
              onClick={disableInput}
      >
        <i className="fa fa-calendar-times-o"/>
        <p>No Due Date</p>
      </button>
    </div>
  )
};

export default DueDateInput;