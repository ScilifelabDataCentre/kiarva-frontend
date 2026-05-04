// Should be server component, has no user interactivity.

"use client";

import { ReactElement} from "react";
import { BODY_CLASSES, H_1 } from "@/constants";
import ChangeLogComponent from "@/components/ChangeLogComponent";
import { changeLogCurrent, changeLogHistory } from "@/content/ChangeLog";

export default function ChangeLogPage(): ReactElement {
  const pageTitle: string = "Change log";

  enum updateTypeEnum {
    databaseUpdate = "databaseUpdates",
    designAndBugfixesUpdate = "designAndBugFixes",
  }

  // Function that looks at a given update type (of either database or design and bugfixes), goes 
  // through the change log history and finds the most recent version where anything was updated for that type.
  // For example, if the changelog had database changes in version 1.2.1 and no changes after that, and the current
  // version is 1.2.9, then the function will return "1.2.1".
  // This is then used on the website to display "No updates. Last updated in version 1.2.1." for version
  // 1.2.9.
  function findLatestUpdate(updateType: updateTypeEnum, compareToVersion: string): string {
    const updateTypeKey = updateType as keyof typeof changeLogHistory[number];

    for (let i = 0; i < changeLogHistory.length; i++) {
      if (changeLogHistory[i].version < compareToVersion) {
          for (let j = 0; j < changeLogHistory[i][updateTypeKey].length; j++) {
            if (changeLogHistory[i][updateTypeKey][j]) {
              return changeLogHistory[i].version;
            }
          }
      }
    }
    // Should in practice not be reached as long as ChangeLog.ts is not empty.
    // Needed so that return type can be string instead of string | null.
    return "N/A"
  }

  return (
    <main className={BODY_CLASSES}>
      <h1 className={H_1}>{pageTitle}</h1>

      <aside className="alert bg-neutral border-none" role="note" aria-label="Change log information">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <p className="text-sm lg:text-base">
          The change log provides a comprehensive overview of all releases of
          the KI Adaptive Immune Receptor Gene Variant Atlas. Each
          version&apos;s card features two buttons: &apos;Frontend
          Repository&apos; and &apos;Backend Repository&apos;. Clicking these buttons
          will direct you to the relevant release for that version.
          <br/><br/>
          The version number works in the following way:
          Increments of the first integer represents major data changes. Increments of 
          the second integer indicates smaller fixes related to the data or how it 
          is processed. Increments of the third integer indicates minor bug fixes or UI 
          changes on the website.
        </p>
      </aside>

      <section aria-labelledby="current-version-heading">
        <h2 id="current-version-heading" className="divider pt-4">
          Current version
        </h2>
        <article className="pt-2 pb-4">
          <ChangeLogComponent
            title={`Version ${changeLogCurrent.version}`}
            databaseUpdates={
                  (changeLogCurrent.databaseUpdates.length >0) ?
                    changeLogCurrent.databaseUpdates.map((dbUpdate) =>
                      dbUpdate
                    )
                    :
                    `No updates. Last updated in version ${findLatestUpdate(updateTypeEnum.databaseUpdate, changeLogCurrent.version)}.`
                }
            designAndBugFixes={
                  (changeLogCurrent.designAndBugFixes.length >0) ?
                    changeLogCurrent.designAndBugFixes.map((designAndFixesUpdate) =>
                      designAndFixesUpdate
                    )
                    :
                    `No updates. Last updated in version ${findLatestUpdate(updateTypeEnum.designAndBugfixesUpdate, changeLogCurrent.version)}.`
                }
            isCurrent={true}
            frontEndLink="https://github.com/ScilifelabDataCentre/kiarva-frontend/releases/latest"
            frontEndTag={changeLogCurrent.frontendReleaseTag}
            backEndLink="https://github.com/ScilifelabDataCentre/kiarva-backend/releases/latest"
            backEndTag={changeLogCurrent.backendReleaseTag}
          />
        </article>
      </section>
      <section aria-labelledby="previous-versions-heading">
        <h2 id="previous-versions-heading" className="divider pt-4">Previous versions</h2>
        <div className="pt-2 pb-4">
          {changeLogHistory.map((item, index) => 
            <article key={index}>
              <ChangeLogComponent
                title={`Version ${item.version}`}
                databaseUpdates={
                  (item.databaseUpdates.length >0) ?
                    item.databaseUpdates.map((dbUpdate) =>
                      dbUpdate
                    )
                    :
                    `No updates. Last updated in version ${findLatestUpdate(updateTypeEnum.databaseUpdate, item.version)}.`
                }
                designAndBugFixes={
                  (item.designAndBugFixes.length >0) ?
                    item.designAndBugFixes.map((designAndFixesUpdate) =>
                      designAndFixesUpdate
                    )
                    :
                    `No updates. Last updated in version ${findLatestUpdate(updateTypeEnum.designAndBugfixesUpdate, item.version)}.`
                }
                isCurrent={false}
                frontEndLink={`https://github.com/ScilifelabDataCentre/kiarva-frontend/releases/tag/v${item.frontendReleaseTag}`}
                frontEndTag={`v${item.frontendReleaseTag}`}
                backEndLink={`https://github.com/ScilifelabDataCentre/kiarva-backend/releases/tag/v${item.backendReleaseTag}`}
                backEndTag={`v${item.backendReleaseTag}`}
              />
            </article>          
            )
          }
        </div>
      </section>
    </main>
  );
}
