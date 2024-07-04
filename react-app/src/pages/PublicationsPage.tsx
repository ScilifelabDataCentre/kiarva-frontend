import { ReactElement } from "react";
import PublicationComponent from "../components/PublicationComponent";
import { BODY_CLASSES, H_1 } from "../constants";
import { TrackPageViewIfEnabled } from "../util/cookiesHandling";

export default function PublicationsPage(): ReactElement {
  TrackPageViewIfEnabled();

  var pageTitle: string = "Publications";

  return (
    <>
      <div className={BODY_CLASSES}>
        <div className={H_1}>{pageTitle}</div>

        <div className="alert my-10 py-8">
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
          <div className="flex flex-col">
            <span>
              This page shows scientific publications that referenced the KI Adaptive Immune Receptor Variant Atlas. Please inform the research group when you
              referenced the KI Adaptive Immune Receptor Variant Atlas and published your results.
            </span>
          </div>
        </div>

        <div className="pt-2 pb-4">
          <PublicationComponent
            linkUrl="https://ki.se/en/people/gunilla-karlsson-hedestam"
            title="Multivalent antigen display on nanoparticle immunogens increases B cell clonotype diversity and neutralization breadth to pneumoviruses."
            authors="Ols S, Lenart K, Arcoverde Cerveira R, Miranda MC, Brunette N, Kochmann J, Corcoran M, Skotheim R, Philomin A, Cagigi A, Fiala B, Wrenn S, Marcandalli J, Hellgren F, Thompson EA, Lin A, Gegenfurtner F, Kumar A, Chen M, Phad GE, Graham BS, Perez L, Borst AJ, Karlsson Hedestam GB, Ruckwardt TJ, King NP, Loré K"
            journal="Immunity 2023 Sep;():"
            bgColor="bg-neutral"
          />
        </div>
      </div>
    </>
  );
}
