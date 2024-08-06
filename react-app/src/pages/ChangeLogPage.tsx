import { ReactElement } from "react";
import { TrackPageViewIfEnabled } from "../util/cookiesHandling";
import { BODY_CLASSES, H_1, currentVersion } from "../constants";
import ChangeLogComponent from "../components/ChangeLogComponent";

export default function ChangeLogPage(): ReactElement {
  TrackPageViewIfEnabled();

  var pageTitle: string = "Change log";

  return (
    <div className={BODY_CLASSES}>
      <div className={H_1}>{pageTitle}</div>
      <div className="alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="text-sm lg:text-base">
          The change log provides a comprehensive overview of all releases of
          the KI Adaptive Immune Receptor Gene Variant Atlas. Each version's
          card features two buttons: 'Frontend Repository' and 'Backend
          Repository'. Clicking a button on the current version card will direct
          you to the respective GitHub repository. For previous versions,
          clicking a button will take you to the relevant GitHub pull request.
          In the near future, we will include instructions in the README file on
          how to run the selected version locally.
        </span>
      </div>

      <div className="divider pt-4">Current version</div>
      <div className="pt-2 pb-4">
        <ChangeLogComponent
          title={`Version ${currentVersion}`}
          databaseUpdates={["Initial release with IGHV data only"]}
          designAndBugFixes={["Initial release"]}
          isCurrent={true}
          frontEndLink="https://github.com/ScilifelabDataCentre/kiarva-frontend"
          backEndLink="https://github.com/ScilifelabDataCentre/kiarva-backend"
        />
      </div>
      {/*}
      <div className="divider pt-4">Previous versions</div>
      <div className="pt-2 pb-4">
        <ChangeLogComponent
          title="Version 0.1.0"
          databaseUpdates={[
            "Initial release with IGHV data only",
          ]}
          designAndBugFixes={[
            "Initial release",
          ]}
          isCurrent={false}
          frontEndLink="https://github.com/ScilifelabDataCentre/immunediscover-service-frontend"
          backEndLink="https://github.com/ScilifelabDataCentre/immunediscover-service-backend"
        />
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
      </div>
      <div className="py-4">
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
      </div>
      */}
    </div>
  );
}
