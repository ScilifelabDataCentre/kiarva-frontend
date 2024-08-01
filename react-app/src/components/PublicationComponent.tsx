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
        className={`flex flex-row p-4 transition-all duration-500 hover:bg-base-100 hover:shadow-lg ${bgColor}`}
      >
        <div className="flex flex-col items-start text-pretty space-y-2">
          <h1 className="text-lg lg:text-xl font-semibold underline underline-offset-auto text-neutral-content">
            {title}
          </h1>
          <p className="text-base lg:text-lg pt-2 text-neutral-content">
            {authors}
          </p>
          <p className="text-base lg:text-lg pt-1 text-neutral-content">
            {journal}
          </p>
        </div>
      </div>
    </a>
  );
};

export default PublicationComponent;
