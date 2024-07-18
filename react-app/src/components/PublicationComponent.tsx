import React from "react";
import { PublicationComponentProps } from "../interfaces/types";

const PublicationComponent: React.FC<PublicationComponentProps> = ({
  linkUrl,
  title,
  authors,
  journal,
  bgColor,
}) => {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div
        className={`min-h-56 flex items-center transition-all duration-500 hover:bg-base-100 hover:shadow-lg ${bgColor}`}
      >
        <div className=" flex flex-col items-start p-6 text-pretty space-y-0.5">
          <h1 className="text-xl font-semibold underline underline-offset-auto text-neutral-content">
            {title}
          </h1>
          <p className="text-xl pt-2 text-neutral-content">{authors}</p>
          <p className="text-xl italic pt-1 text-neutral-content">{journal}</p>
        </div>
      </div>
    </a>
  );
};

export default PublicationComponent;
