import React from 'react';
import { Link } from "react-router-dom";
import './info-card.css';


interface InfoCardProps {
  title: string;
  description?: string[];
  path?: string;
  image: string;
}

const InfoCard = ({ title, description = [], image, path = "/error" }: InfoCardProps) => {
  return (
    <Link to={path}>
      <div
        className="flex flex-col h-96 w-96 card-border p-6 border shadow-[1px_1px_3px_0] shadow-lime-800 bg-gray-800 hover:bg-gray-700">
        <div className="flex flex-col items-center">
          <img src={image} alt=""/>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </div>
        <div className="flex flex-col flex-grow py-8">
          {description.length > 0 && description.map(item => (
            <div className="pl-8 flex items-center space-x-1 mb-6" key={item}>
              <i className="fa fa-chevron-right"/>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
};

export default InfoCard;