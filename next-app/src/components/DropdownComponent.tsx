"use client";

import React from "react";
import { DropdownComponentProps } from "@/interfaces/types";

// Define the DropdownComponent as a functional component that takes DropdownComponentProps as props
const DropdownComponent: React.FC<DropdownComponentProps> = ({
  menuName,
  menuItemsArray,
  currentPick,
  setCurrentPick,
}) => {
  // Define classes for the selected dropdown item
  const selectedRowClasses: string = "text-secondary-content bg-info";

  return (
    <div className="group relative cursor-pointer">
      {/* Group wrapper for the dropdown component */}

      {/* Dropdown button */}
      <div
        className="flex items-center justify-between bg-white px-4"
        role="button"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-label={menuName}
        tabIndex={0}
      >
        <span
          className="my-2 py-2 text-base lg:text-lg font-medium text-neutral-content lg:mx-4"
          aria-live="polite"
        >
          {/* Display the current pick or prompt to pick an item if none is selected */}
          {currentPick === "" ? `${menuName}` : currentPick}
        </span>
        <span aria-hidden="true">
          {/* SVG icon for the dropdown button - arrow down */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 opacity-100 group-hover:hidden group-hover:opacity-0"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
          {/* SVG icon for the dropdown button - arrow up */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 hidden opacity-0 group-hover:inline group-hover:opacity-100"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </span>
      </div>

      {/* Dropdown menu */}
      <ul
        role="listbox"
        className="invisible overflow-y-auto max-h-80 lg:max-h-[500px] opacity-0 absolute z-10 flex flex-col w-full bg-white py-2 px-4 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100"
      >
        {/* Map through the menu items array and create a clickable item for each */}
        {menuItemsArray.map((item, index) => (
          <li key={index} role="option" aria-selected={currentPick === item}>
            <button
              type="button"
              className={`block w-full text-left py-3 font-semibold transition-all duration-300 hover:text-secondary-content hover:bg-info px-2 
                ${
                  currentPick === item ? selectedRowClasses : "text-secondary"
                } `}
              onClick={() => setCurrentPick(item)}
            >
              {/* Display the menu item */}
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownComponent;
