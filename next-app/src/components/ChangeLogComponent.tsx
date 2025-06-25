"use client";

import React from "react";
import { ChangeLogComponentProps } from "@/interfaces/types";
import { Button } from "@/components/ui/button";

const ChangeLogComponent: React.FC<ChangeLogComponentProps> = ({
  title,
  databaseUpdates,
  designAndBugFixes,
  frontEndLink,
  backEndLink,
  isCurrent,
}) => {
  // Conditional variable assignments
  const bgColor = isCurrent ? "bg-accent opacity-60" : "bg-neutral opacity-60";
  const borderColor = isCurrent ? "border-accent" : "border-neutral";
  const textColor = isCurrent ? "text-neutral-content" : "text-info-content";

  // Ensure databaseUpdates & designAndBugFixes is an array
  const updatesDatabaseUpdatesArray = Array.isArray(databaseUpdates)
    ? databaseUpdates
    : databaseUpdates.split("\n");
  const updatesDesignAndBugFixesArray = Array.isArray(designAndBugFixes)
    ? designAndBugFixes
    : designAndBugFixes.split("\n");

  return (
    <div className="block">
      <div
        className={`flex flex-col lg:shadow border-2 ${borderColor} border-opacity-60 col-span-2`}
      >
        <div
          className={`flex flex-col lg:flex-row ${bgColor} p-3 items-center justify-between`}
        >
          <div className="justify-self-start mb-2 lg:mb-0">
            <p className="text-neutral-content/80 font-semibold text-lg lg:text-xl">
              {title}
            </p>
          </div>
          <div className="flex flex-row justify-self-end gap-2 lg:gap-x-2.5">
            <Button variant="default" size="sm" asChild>
              <a href={frontEndLink} target="_blank" rel="noopener noreferrer">
                Frontend Repository
              </a>
            </Button>
            <Button variant="default" size="sm" asChild>
              <a href={backEndLink} target="_blank" rel="noopener noreferrer">
                Backend Repository
              </a>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            className={`lg:border-r-2 ${borderColor} border-opacity-60 flex flex-col p-3`}
          >
            <label className="font-bold text-base">Database Updates</label>
            <ul className="text-sm lg:text-base">
              {updatesDatabaseUpdatesArray.map((update, index) => (
                <li key={index}>• {update}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col p-3">
            <label className="font-bold text-base">Design & Bug Fixes</label>
            <ul className="text-sm lg:text-base">
              {updatesDesignAndBugFixesArray.map((update, index) => (
                <li key={index}>• {update}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeLogComponent;
