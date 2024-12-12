'use client';

import { BODY_CLASSES, H_1 } from "@/constants";
import "../globals.css";
import SelectionTabComponent from "@/components/SelectionTabComponent";
import { hasCookie } from "cookies-next";
import DisclaimerPopupComponent from "@/components/DisclaimerPopupComponent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  function setIsDisclaimerPopupOpen(arg0: boolean): void {
    if (arg0) {
        console.log("Disclaimer popup button not implemented.")
    }
  }

  return (
    <div className={BODY_CLASSES}>
      <h1 className={H_1}>Allele frequency in global populations</h1>
        {!hasCookie('password') &&
        <button
          className="bg-warning text-warning-content text-base lg:text-lg flex gap-2 justify-center items-center px-4 order-first lg:px-0 w-full h-12 font-bold rounded-3xl shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:opacity-90"
          onClick={() => setIsDisclaimerPopupOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Disclaimer
        </button>}
        {!hasCookie('password') && setIsDisclaimerPopupOpen && (
          <DisclaimerPopupComponent
            onClose={() => setIsDisclaimerPopupOpen(false)}
            explanation="This page is fully developed and allows you to explore its
                      design and functionality. However, the underlying data has
                      not been officially published yet. Therefore, we can currently only showcase a sample of the data for demonstration purposes."
          />
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
            This page allows users to generate population frequency plots for
            the KI Adaptive Immune Receptor Gene Variant Atlas. You can select
            from various dropdowns to filter by gene segment, gene type, gene,
            and allele. The genomic plot page features associated SNPs and SNiPer scores,
            while the translated plot page features a list of other alleles translating to the same amino acid.
          </span>
        </div>
      <SelectionTabComponent paths={{"Genomic": "genomic", "Translated": "translated"}} /> 
      {children}
    </div>
  );
}
