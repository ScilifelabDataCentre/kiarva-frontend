import React from "react";
import { DropdownComponentProps } from "../interfaces/types";

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  menuName,
  menuItemsArray,
  currentPick,
  setCurrentPick,
}) => {
  // Conditional variable assignments
  // const bgColor = booleanVar ? "bg-accent opacity-60" : "bg-neutral opacity-60";

  // Ensure databaseUpdates & designAndBugFixes is an array
  // const updatesDatabaseUpdatesArray = Array.isArray(databaseUpdates) ? databaseUpdates : databaseUpdates.split('\n');
  // const updatesDesignAndBugFixesArray = Array.isArray(designAndBugFixes) ? designAndBugFixes : designAndBugFixes.split('\n');

  const selectedRowClasses: string = "text-secondary-content bg-info";

  return (
    <div className="group relative cursor-pointer">
      {/*<div className={`${buttonColor} ${textColor} flex justify-center items-center w-44 h-10 font-medium opacity-60 rounded-2xl shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:opacity-90`}>
          Backend Repository
        </div> */}
      <div className="flex items-center justify-between bg-white px-4">
        <a className="my-2 py-2 text-lg font-medium text-neutral-content lg:mx-4">
          {currentPick === "" ? `Pick ${menuName}` : currentPick}
        </a>
        <span>
          {/* We have two SVGs here to deal with the visibility behavior of the dropdown list. 
            The standard one displays an arrow-down. If the dropdown menu is hovered, 
            this one becomes hidden and another SVG becomes visible (by turning into an inline element). 
            This SVG is an arrow-up. */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6 opacity-100 group-hover:hidden group-hover:opacity-0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6 hidden opacity-0 group-hover:inline group-hover:opacity-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </span>
      </div>

      <div className="invisible opacity-0 absolute z-10 flex flex-col w-full bg-white py-2 px-4 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
        {menuItemsArray.map((item, index) => (
          <a
            key={index}
            className={`block py-3 font-semibold  transition-all duration-300 hover:text-secondary-content hover:bg-info md:px-2 
              ${currentPick === item ? selectedRowClasses : "text-secondary"} `}
            onClick={() => setCurrentPick(item)}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

export default DropdownComponent;
