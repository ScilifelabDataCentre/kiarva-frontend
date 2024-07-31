import React from "react";
import { ProfileComponentProps } from "../interfaces/types";

const ProfileComponent: React.FC<ProfileComponentProps> = ({
  imageUrl,
  linkUrl,
  name,
  title,
  bgColor,
}) => {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="!mt-0 block"
    >
      <div
        className={`flex flex-row items-center p-4 transition-all duration-500 hover:bg-base-100 hover:shadow-lg ${bgColor}`}
      >
        <div className="flex items-center lg:p-2 lg:w-1/3">
          <div className="avatar pr-4">
            <div className="w-24 lg:w-36 rounded-full">
              <img src={imageUrl} alt={name} />
            </div>
          </div>
          <div className="text-left lg:w-2/3">
            <h1 className="text-2xl text-ellipsis lg:text-5xl lg:text-nowrap font-normal text-neutral-content">
              {name}
            </h1>
            <p className="text-lg lg:text-xl lg:text-nowrap italic pt-2 text-neutral-content">
              {title}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProfileComponent;
