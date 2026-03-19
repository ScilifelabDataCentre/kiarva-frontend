"use client";

import { ReactElement, useState } from "react";
import { backendAPI } from "@/constants";
import {
  IAlleleDropDownConfig,
} from "@/interfaces/types";
import AlelleSelectionComponent from "./AlleleSelectionComponent";
import AbbreviationPopupComponent from "@/components/AbbreviationPopupComponent";
import dynamic from 'next/dynamic'
import Loading from '@/components/Loading';
import { Suspense } from 'react';
import IgSNPerDisplay from "./IgSNPerDisplay";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import AminoAcidAllelesDisplay from "./AminoAcidAllelesDisplay";

// Main function to render the PlotPage component
export default function PlotPageParent(prop: { plotType: string }): ReactElement {

//   // config for AlleleSelectionComponent which sets up the allele segment dropdown menu
//   const alleleDropdownConfig: IAlleleDropDownConfig = {
//     geneSegmentItemsArray: ["IGH"],
//     geneDropDownItemsArray: ["IGHV"],
//     geneSelectionEndpoint: backendAPI + "data/plotoptions?current_selection=",
//   };

  // config for AlleleSelectionComponent which sets up the allele segment dropdown menu
  const alleleDropdownConfig: IAlleleDropDownConfig = {
    loci: ["IGH", "TRG"],
    geneTypesByLocus: {
      IGH: ["IGHV"],
      TRG: ["TRGV"],
    },

    geneSelectionEndpoint: backendAPI + "data/plotoptions?current_selection=",
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
    let plotName = "";
    if (plotType == "genomicFreqPlot") {
      plotName = "GenomicPlot";
    }
    else if (plotType == "translatedFreqPlot") {
      plotName = "AminoAcidPlot";
    }

    type PlotProps = {
      selectedAllele: string;
    };

    const PlotPageComponent = dynamic<PlotProps>(() => import('@/components/' + plotName), {
      ssr: false,
      loading: () => <Loading />,
    })

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
