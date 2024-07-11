import React from 'react';
import { NewsComponentProps } from '../interfaces/types';

const NewsComponent: React.FC<NewsComponentProps> = ({title, date, text, bgColor }) => {
 
  const textColor = bgColor !== 'bg-white' ? 'text-secondary-content' : 'text-neutral-content';
 
  return (
    <div className={`flex items-center ${bgColor}`}>
      <div className={`flex flex-col items-start p-6 ${textColor} space-y-0.5`}>
      <h1 className="text-lg font-semibold">{title}</h1>
            <p className="italic pt-2">Date: {date}</p>
            <p className="pt-1">{text}</p>
        </div>
      </div>
  );
};

export default NewsComponent;