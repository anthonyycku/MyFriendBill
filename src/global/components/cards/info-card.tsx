import React from 'react';
import { Link } from "react-router-dom";
import './info-card.css';
import billIcon from '../../../assets/images/bill-icon.png';

interface InfoCardProps {
  title: string;
  description?: string[];
  path?: string;
}

const InfoCard = ({ title, description = [], path = "/error" }: InfoCardProps) => {
  return (
    <Link to={path}>
      <div
        className="h-96 w-96 card-border max-w-sm p-6 bg-white border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div className="flex flex-col items-center">
          <img src={billIcon}/>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </div>
        {description.length > 0 && description.map(item => (
          <li key={item}>{item}</li>
        ))}
      </div>
    </Link>
  )
};

export default InfoCard;