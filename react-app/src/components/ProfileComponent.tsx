import React from 'react';
import { ProfileComponentProps } from '../interfaces/types';

const ProfileComponent: React.FC<ProfileComponentProps> = ({ imageUrl, linkUrl, name, title, bgColor }) => {
  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="!mt-0 block">
    <div className={`h-56 flex items-center transition-all duration-500 hover:bg-base-100 hover:shadow-lg ${bgColor}`}>
    <div className=" flex items-center pl-6">
          <div className="avatar pr-4">
            <div className="w-36 rounded-full">
              <img src={imageUrl} alt={name} />
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-normal text-neutral-content">{name}</h1>
            <p className="text-xl italic pt-2 pl-1 text-neutral-content">{title}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProfileComponent;