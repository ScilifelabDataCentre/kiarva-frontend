import React from "react";
import { ChangeLogComponentProps } from "../interfaces/types";

  const ChangeLogComponent: React.FC<ChangeLogComponentProps> = ({ title, doi, databaseUpdates, designAndBugFixes, frontEndLink, backEndLink, isCurrent }) => {
    // Conditional variable assignments
    const bgColor = isCurrent ? "bg-accent opacity-60" : "bg-neutral opacity-60";
    const borderColor = isCurrent ? "border-accent" : "border-neutral";
    const buttonColor = isCurrent ? "bg-gradient-to-r from-[rgba(249,250,251,0.65)] to-neutral-200" : "bg-gradient-to-r from-[rgba(74,4,78,0.7)] to-fuchsia-950";
    const textColor = isCurrent ? "text-neutral-content" : "text-info-content";

    // Ensure databaseUpdates & designAndBugFixes is an array
    const updatesDatabaseUpdatesArray = Array.isArray(databaseUpdates) ? databaseUpdates : databaseUpdates.split('\n');
    const updatesDesignAndBugFixesArray = Array.isArray(designAndBugFixes) ? designAndBugFixes : designAndBugFixes.split('\n');

    return (
      <div className="block">
        <div className={`flex flex-col shadow border-2 ${borderColor} border-opacity-60 col-span-2`}>
          <div className={`flex flex-row ${bgColor} p-3 items-center justify-between`}>
            <p className="text-neutral-content/80 font-semibold text-xl -mr-48">{title}</p>
            <p className="text-neutral-content/60 font-extralight text-l italic -ml-32">{doi}</p>
            <a className="flex -mr-48" href={frontEndLink} target="_blank" rel="noopener noreferrer">
            <div className={`${buttonColor} ${textColor} flex justify-center items-center w-44 h-10 font-medium opacity-60 rounded-2xl shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:opacity-90`}>
              Frontend Repository
            </div>
            </a>
            <a className="flex -ml-32" href={backEndLink} target="_blank" rel="noopener noreferrer">
            <div className={`${buttonColor} ${textColor} flex justify-center items-center w-44 h-10 font-medium opacity-60 rounded-2xl shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:opacity-90`}>
              Backend Repository
            </div>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className={`border-r-2 ${borderColor} border-opacity-60 flex flex-col p-3`}>
              <label className="font-bold text-l">Database Updates</label>
              <ul>
              {updatesDatabaseUpdatesArray.map((update, index) => (
                <li key={index}>• {update}</li>
              ))}
            </ul>
            </div>
            <div className="flex flex-col p-3">
              <label className="font-bold text-l">Design & Bug Fixes</label>
              <ul>
              {updatesDesignAndBugFixesArray.map((update, index) => (
                <li key={index}>• {update}</li>
              ))}
            </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ChangeLogComponent;
