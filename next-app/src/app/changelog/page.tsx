// Should be server component, has no user interactivity.

"use client";

import { ReactElement } from "react";
import { BODY_CLASSES, H_1, currentVersion } from "@/constants";
import ChangeLogComponent from "@/components/ChangeLogComponent";

export default function ChangeLogPage(): ReactElement {
  const pageTitle: string = "Change log";

  return (
    <main className={BODY_CLASSES}>
      <h1 className={H_1}>{pageTitle}</h1>

      <aside className="alert" role="note" aria-label="Change log information">
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
          Repository&apos; and &apos;Backend Repository&apos;. Clicking a button
          on the current version card will direct you to the respective GitHub
          repository. For previous versions, clicking a button will take you to
          the relevant GitHub pull request. In the near future, we will include
          instructions in the README file on how to run the selected version
          locally. The links to the Github repositiories are not functional
          until the publication of the data.
        </p>
      </aside>

      <section aria-labelledby="current-version-heading">
        <h2 id="current-version-heading" className="divider pt-4">
          Current version
        </h2>
        <article className="pt-2 pb-4">
          <ChangeLogComponent
            title={`Version ${currentVersion}`}
            databaseUpdates={[
              "Initial release containing IGH data.",
            ]}
            designAndBugFixes={["Initial release"]}
            isCurrent={true}
            frontEndLink="https://github.com/ScilifelabDataCentre/kiarva-frontend"
            backEndLink="https://github.com/ScilifelabDataCentre/kiarva-backend"
          />
        </article>
      </section>
      {/*}
      <section aria-labelledby="previous-versions-heading">
        <h2 id="previous-versions-heading" className="divider pt-4">Previous versions</h2>
        <div className="pt-2 pb-4">
          <article>
            <ChangeLogComponent
              title="Version 0.1.0"
              databaseUpdates={[
                "TBD",
              ]}
              designAndBugFixes={[
                "Initial release",
              ]}
              isCurrent={false}
              frontEndLink="https://github.com/ScilifelabDataCentre/immunediscover-service-frontend"
              backEndLink="https://github.com/ScilifelabDataCentre/immunediscover-service-backend"
            />
          </article>
          <article>
            <ChangeLogComponent
              title="Version 0.0.0"
              databaseUpdates={[
                "TBD",
              ]}
              designAndBugFixes={[
                "TBD",
              ]}
              isCurrent={false}
              frontEndLink="https://github.com/ScilifelabDataCentre/kiarva-frontend"
              backEndLink="https://github.com/ScilifelabDataCentre/kiarva-backend"
            />
          </article>
        </div>
      </section>
      <section>
        <article>
          <ChangeLogComponent
            title="Version 0.0.0"
            databaseUpdates={[
              "TBD",
            ]}
            designAndBugFixes={[
              "TBD",
            ]}
            isCurrent={false}
            frontEndLink="https://github.com/ScilifelabDataCentre/kiarva-frontend"
            backEndLink="https://github.com/ScilifelabDataCentre/kiarva-backend"
          />
        </article>
      </section>
      */}
    </main>
  );
}
