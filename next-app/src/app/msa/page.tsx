"use client";

import MSAPlotPageComponent from "@/components/MSAPlotPageComponent";
import { BODY_CLASSES, H_1 } from "@/constants";
import { hasCookie } from "cookies-next";
import { ReactElement } from "react";

// Main function to render the PlotPage component
export default function AminoAcidPlotPage(): ReactElement {
  return (
    <div className={BODY_CLASSES}>
      <h1 className={H_1}>Multiple sequence alignments</h1>
      {!hasCookie("password") && (
        <div className="alert alert-info bg-info text-info-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M12 7v2" />
            <path d="M12 13h.01" />
          </svg>
          <span className="text-sm lg:text-base">
            You are currently exploring the demo version of KIARVA. The full
            version will be released once the underlying data has been
            published. Until then, the pages are visible as a demonstration but
            without full data access.
          </span>
        </div>
      )}

      <div className="bg-muted alert">
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
          This page allows users to see sequence alignments for nucleotide and
          translated sequences in the KI Adaptive Immune Receptor Gene Variant
          Atlas. You can select from various dropdowns to filter by gene
          segment, gene type and gene.
        </span>
      </div>
      <MSAPlotPageComponent />
    </div>
  );
}
