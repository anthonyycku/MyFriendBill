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
    <div className="my-4 flex items-center min-w-[200px]">
      <label className="w-36 font-medium">{`Due Date:`}</label>

      <div>
        <DatePicker
          selected={dueDate}
          onChange={(date: Date) => setDueDate(date)}
          className={`${disabled ? 'bg-gray-900' : 'bg-gray-500'} rounded p-2 w-40`}
          disabled={disabled}
        />
      </div>

      <button type="button"
              className={`hover:bg-orange-600 flex items-center space-x-1 border border-gray-500 rounded px-4 py-1.5 ml-2 ${disabledStyle()}`}
              onClick={disableInput}
      >
        <i className="fa fa-calendar-times-o"/>
        <p>No Due Date</p>
      </button>
    </div>
  )
};

export default DueDateInput;