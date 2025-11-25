// Should be server component, has no user interactivity.

"use client";

import React from "react";
import { PublicationComponentProps } from "@/interfaces/types";

const PublicationComponent: React.FC<PublicationComponentProps> = ({
  linkUrl,
  title,
  authors,
  journal,
  bgColor,
}) => {
  return (
    <article
      className={`flex flex-row p-4 transition-all duration-500 hover:bg-base-100 hover:shadow-lg ${bgColor}`}
    >
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-start text-pretty space-y-2 w-full"
        aria-label={`View publication: ${title} by ${authors}`}
      >
        <h3 className="text-lg lg:text-xl font-semibold underline underline-offset-auto text-neutral-content">
          {title}
        </h3>
        <p className="text-base lg:text-lg pt-2 text-neutral-content">
          {authors}
        </p>
        <p className="text-base lg:text-lg pt-1 text-neutral-content">
          {journal}
        </p>
      </a>
    </article>
  );
};

export default PublicationComponent;
