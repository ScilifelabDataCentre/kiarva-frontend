import React from "react";
import { ChangeLogComponentProps } from "../interfaces/types";

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
  const buttonColor = isCurrent
    ? "bg-gradient-to-r from-[rgba(249,250,251,0.65)] to-neutral-200"
    : "bg-gradient-to-r from-[rgba(74,4,78,0.7)] to-fuchsia-950";
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
            <a
              className="flex"
              href={frontEndLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={`${buttonColor} ${textColor} flex justify-center items-center w-full px-1 lg:px-0 lg:w-44 h-10 font-medium opacity-60 rounded-2xl shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:opacity-90`}
              >
                Frontend Repository
              </div>
            </a>
            <a
              className="flex"
              href={backEndLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={`${buttonColor} ${textColor} flex justify-center items-center w-full px-1 lg:px-0 lg:w-44 h-10 font-medium opacity-60 rounded-2xl shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:opacity-90`}
              >
                Backend Repository
              </div>
            </a>
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
