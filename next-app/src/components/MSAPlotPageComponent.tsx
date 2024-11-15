'use client';

import { ReactElement, useEffect, useState } from "react";
import {
  backendAPI,
} from "@/constants";
import { TrackPageViewIfEnabled } from "@/util/cookiesHandling";
import {
  IAlleleData,
  IAlleleDropDownConfig,
  IMSAData,
} from "@/interfaces/types";
import { getCookie, hasCookie } from "cookies-next";
import AlelleSelectionComponent from "./AlleleSelectionComponent";
import { sampleMSAData } from "@/content/localPlotData";
import axios from "axios";
import MSAViewer from "./MSAViewer";

// Main function to render the PlotPage component
export default function MSAPlotPageComponent(): ReactElement {
  // Track page views if cookies handling is enabled
  TrackPageViewIfEnabled();

  const [axiosConfig, setAxiosConfig] = useState({
    headers: {
      "X-api-key": "",
    }
  })

  // config for AlleleSelectionComponent which sets up the allele segment dropdown menu
  const alleleDropdownConfig: IAlleleDropDownConfig = {
    'geneSegmentItemsArray': ["IGH"],
    'geneDropDownItemsArray': ["IGHV"],
    'geneSelectionEndpoint': backendAPI + "data/plotoptions/"
  }

  const [selectedAllele, setSelectedAllele] = useState<string>("");

  const [sequenceData, setSequenceData] = useState<IAlleleData[]>([]);
  const [aminoAcidSequence, setAminoAcidSequence] = useState<string>("");

  async function AASeuqnceData(allele: string) {
    const AASequenceDataEndpoint: string = backendAPI + "data/sequences/aminoacidallelesfasta/" + allele;

    await axios
      .get(AASequenceDataEndpoint, axiosConfig)
      .then((response) => {
        const responseData: IMSAData = response.data;
        setAminoAcidSequence(responseData.aa_sequence);
        setSequenceData(responseData.alleleData);
      })
      .catch((response) => console.log(response.error));
  }

  // Fetch data when allele dropdown changes
  useEffect(() => {
    if (selectedAllele) {
      if (!hasCookie('password')) {
        const strToKey = selectedAllele as keyof typeof sampleMSAData;
        setSequenceData(sampleMSAData[strToKey].alleleData)
        setAminoAcidSequence(sampleMSAData[strToKey].aa_sequence)
      }
      else {
        AASeuqnceData(selectedAllele);
      }
    }
  }, [
    selectedAllele
  ]);

  // check on page load if password cookie has been set yet, and if it has add to axios headers for all requests to backend
  useEffect(() => {
    if (hasCookie('password')) {
      setAxiosConfig({
        headers: {
            'X-api-key': getCookie('password') as string,
        }
      })
    }
  }, [])

  // function to be passed as prop to AlleleSelectionComponent, so that it can modify
  // state in parent component
  function handleSetSelection(allele: string) {
    setSelectedAllele(allele);
  }

  // Render the component
  return (
    <>
      <div>
        <AlelleSelectionComponent 
          alleleSelectionConfig={alleleDropdownConfig}
          handleSetSelection={handleSetSelection}
          plotType={"aminoAcidMSA"}
        />
      </div>
      <h2>Translated sequence:</h2>
      <p>{aminoAcidSequence}</p>
      <MSAViewer alleleSequenceData={sequenceData} />
    </>
  );
}
