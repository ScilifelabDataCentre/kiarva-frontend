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
            linkUrl=""
            title="Ultra-high throughput IGH genotyping reveals individual and population level diversity and provides a comprehensive resource for future adaptive immune analysis"
            authors="Martin Corcoran, Sanjana Narang*, Mateusz Kaduk*, Mark Chernyshev*, Christopher Sundling, Anna Färnert, and Gunilla B. Karlsson Hedestam"
            journal="Pre-print August 2024"
            bgColor="bg-neutral"
          />
        </div>
      </div>
    </>
  );
}
