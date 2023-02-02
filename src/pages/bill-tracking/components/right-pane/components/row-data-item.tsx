import React from 'react';
import { textColorFormat } from "../../../state/functions/bill-tracking.functions";

interface RowDataItemProps {
  heading: string;
  data: any;
  inline?: boolean;
  rawData?: any
}

const RowDataItem = ({ heading, data, inline = true, rawData }: RowDataItemProps) => {

  return (
    <div className={`grid grid-flow-row-dense grid-cols-4 ${!inline && 'flex-col'}`}>
      <p className={`font-medium col-span-1`}>{heading}</p>
      {heading === 'Due Date' ? (
        <div className="flex items-center space-x-2 col-span-3">
          <p className={`${rawData === null ? 'text-gray-300' : textColorFormat(rawData)}`}>{data}</p>
          {textColorFormat(rawData) && <i className={`fa fa-exclamation-triangle ${textColorFormat(rawData)}`}/>}
        </div>
      ) : (
        <p className={`text-gray-300 col-span-3`}>{data}</p>
      )}
    </div>
  )
};

export default RowDataItem;