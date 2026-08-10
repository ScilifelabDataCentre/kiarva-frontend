"use client";

import { ReactElement, useEffect, useState } from "react";
import {
  GeneType,
  IAlleleDropDownConfig,
  Locus,
} from "@/interfaces/types";
import { getMetaVersion } from "@/lib/APIcalls";
import AlelleSelectionComponent from "./AlleleSelectionComponent";
import AbbreviationPopupComponent from "@/components/AbbreviationPopupComponent";
import dynamic from 'next/dynamic'
import Loading from '@/components/Loading';
import { Suspense } from 'react';
import IgSNPerDisplay from "./IgSNPerDisplay";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import AminoAcidAllelesDisplay from "./AminoAcidAllelesDisplay";

type PlotProps = {
  selectedAllele: string;
};

// The plot components are loaded lazily and client-side only, because
// plotly.js touches the DOM at module scope.
//
// The import specifiers must be static string literals. This previously built
// the path at runtime, as `import('@/components/' + plotName)`. Webpack
// tolerated that by compiling the whole directory into a lazy context module,
// but Turbopack does not resolve computed specifiers the same way, and the
// translated tab silently rendered GenomicPlot instead of AminoAcidPlot — so
// both tabs fetched and plotted genomic frequencies.
//
// These are also declared at module scope rather than inside the component.
// Calling dynamic() during render produces a new component type on every
// render, which remounts the plot and refetches its data.
const PLOT_COMPONENTS: Record<string, React.ComponentType<PlotProps>> = {
  genomicFreqPlot: dynamic<PlotProps>(
    () => import("@/components/GenomicPlot"),
    { ssr: false, loading: () => <Loading /> },
  ),
  translatedFreqPlot: dynamic<PlotProps>(
    () => import("@/components/AminoAcidPlot"),
    { ssr: false, loading: () => <Loading /> },
  ),
};

// Main function to render the PlotPage component
export default function PlotPageParent(prop: { plotType: string }): ReactElement {

  // config for AlleleSelectionComponent which sets up the allele segment dropdown menu
  interface IGeneTypesByLocus {
    IGH:GeneType[];
    TRG?:GeneType[];
  }

  const loci: Locus[] = ["IGH"];
  const geneTypeByLocus: IGeneTypesByLocus = {
    IGH: ["IGHV"]
  };

  // Fetch and set isPrepubEnv, a variable which is set to false by default, but changed to true if
  // the app is fed the environmental variable NEXT_PUBLIC_CURRENT_ENV = "prepub".
  const [isPrepubEnv, setIsPrepubEnv] = useState<boolean>(false);

  useEffect(() => {
    getMetaVersion().then((data) => {
      if (data) setIsPrepubEnv(data.currentEnv === 'prepub');
    });
  }, []);

  if (isPrepubEnv) {
    loci.push("TRG");
    geneTypeByLocus.TRG = ["TRGV"];
  }

  const alleleDropdownConfig: IAlleleDropDownConfig = {
    loci: loci,
    geneTypesByLocus: geneTypeByLocus,
  };

  const [selectedAllele, setSelectedAllele] = useState<string>("");

  // function to be passed as prop to AlleleSelectionComponent, so that it can modify
  // state in parent component
  function handleSetSelection(allele: string) {
    setSelectedAllele(allele);
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function displayAssociatedData(plotType: string) {
    const props = {selectedAllele:selectedAllele}
    if (plotType == "genomicFreqPlot") {
      return (
        <>
          <section
            aria-labelledby="igsnper-data-heading"
            className="flex flex-col lg:flex-row items-start justify-between pb-8 gap-4"
          >
            <IgSNPerDisplay {...props}/>
            <div className="lg:w-1/8" aria-hidden="true"></div>
            <Button
              variant="default"
              size="lg"
              className="order-first lg:order-4"
              onClick={() => setIsPopupOpen(true)}
              aria-label="View population abbreviations"
            >
              <Info aria-hidden="true" />
              Population abbreviations
            </Button>
          </section>
          {isPopupOpen && (
            <AbbreviationPopupComponent onClose={() => setIsPopupOpen(false)} />
          )}
        </>
      )
    }
    else if (plotType == "translatedFreqPlot") {
      return(
        <>
          <section
            aria-labelledby="alleles-table-heading"
            className="flex flex-col lg:flex-row items-start justify-between pb-8 gap-4"
          >
            <AminoAcidAllelesDisplay {...props}/>
            <Button
              variant="default"
              size="lg"
              className="order-first lg:order-4"
              onClick={() => setIsPopupOpen(true)}
              aria-label="View population abbreviations"
            >
              <Info aria-hidden="true" />
              Population abbreviations
            </Button>
          </section>
          {isPopupOpen && (
            <AbbreviationPopupComponent onClose={() => setIsPopupOpen(false)} />
          )}
        </>
      )
    }
  }

  function displayElement(plotType: string) {
    const PlotPageComponent = PLOT_COMPONENTS[plotType];
    if (!PlotPageComponent) return null;

    return (
      <>
        <Suspense fallback={<Loading />}>
          <PlotPageComponent selectedAllele={selectedAllele} />
        </Suspense>
      </>
    )
  }

  // Render the component
  return (
    <>
      {displayAssociatedData(prop.plotType)}
      <AlelleSelectionComponent
        alleleSelectionConfig={alleleDropdownConfig}
        handleSetSelection={handleSetSelection}
        plotType={prop.plotType}
      />
      {displayElement(prop.plotType)}
    </>
  );
}
