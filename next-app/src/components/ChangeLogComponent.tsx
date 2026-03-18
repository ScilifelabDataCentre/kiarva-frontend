// Should probably be server component, has no user interactivity except for buttons. But since they are
// children, could probably have them as client components while keeping this as server component.

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
  const bgColor = isCurrent ? "bg-accent" : "bg-neutral";
  const borderColor = isCurrent ? "border-accent" : "border-neutral";

  // Ensure databaseUpdates & designAndBugFixes is an array
  const updatesDatabaseUpdatesArray = Array.isArray(databaseUpdates)
    ? databaseUpdates
    : databaseUpdates.split("\n");
  const updatesDesignAndBugFixesArray = Array.isArray(designAndBugFixes)
    ? designAndBugFixes
    : designAndBugFixes.split("\n");

  return (
    <article
      className={`flex flex-col lg:shadow border-2 ${borderColor} border-opacity-60 col-span-2`}
    >
      <header
        className={`flex flex-col lg:flex-row ${bgColor} p-3 items-center justify-between`}
      >
        <h3 className="justify-self-start mb-2 lg:mb-0 text-neutral-content/80 font-semibold text-lg lg:text-xl">
          {title}
        </h3>
        <nav
          aria-label={`${title} repository links`}
          className="flex flex-row justify-self-end gap-2 lg:gap-x-2.5"
        >
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
        </nav>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section
          aria-labelledby={`${title}-database-updates-heading`}
          className={`lg:border-r-2 ${borderColor} border-opacity-60 flex flex-col p-3`}
        >
          <h4
            id={`${title}-database-updates-heading`}
            className="font-bold text-base"
          >
            Database Updates
          </h4>
          <ul className="text-sm lg:text-base">
            {updatesDatabaseUpdatesArray.map((update, index) => (
              <li key={index}>• {update}</li>
            ))}
          </ul>
        </section>
        <section
          aria-labelledby={`${title}-design-fixes-heading`}
          className="flex flex-col p-3"
        >
          <h4
            id={`${title}-design-fixes-heading`}
            className="font-bold text-base"
          >
            Design & Bug Fixes
          </h4>
          <ul className="text-sm lg:text-base">
            {updatesDesignAndBugFixesArray.map((update, index) => (
              <li key={index}>• {update}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
};

export default ChangeLogComponent;
