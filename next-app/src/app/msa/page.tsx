import MSAPlotPageComponent from "@/components/MSAPlotPageComponent";
import { BODY_CLASSES, H_1 } from "@/constants";

// Main function to render the PlotPage component
export default function AminoAcidPlotPage() {
  return (
    <main className={BODY_CLASSES}>
      <h1 className={H_1}>Multiple sequence alignments</h1>

      <aside
        className="bg-neutral alert border-none rounded-2xl"
        role="note"
        aria-label="MSA page instructions"
      >
        <div className="flex flex-row items-center p-4">
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
          <p className="text-sm lg:text-base pl-4">
            This page allows users to see sequence alignments for nucleotide and
            translated sequences in the KI Adaptive Immune Receptor Gene Variant
            Atlas. You can select from various dropdowns to filter by gene
            segment, gene type and gene.
          </p>
        </div>
      </aside>
      <MSAPlotPageComponent />
    </main>
  );
}
