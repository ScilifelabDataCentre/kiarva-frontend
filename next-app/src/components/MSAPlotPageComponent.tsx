'use client';

import { ReactElement, useEffect, useState } from "react";
import {
  backendAPI,
} from "@/constants";
import { TrackPageViewIfEnabled } from "@/util/cookiesHandling";
import {
  ISequenceData,
  IAlleleDropDownConfig,
  IMSAData,
} from "@/interfaces/types";
import { getCookie, hasCookie } from "cookies-next";
import AlelleSelectionComponent from "@/components/AlleleSelectionComponent";
import { sampleMSAData } from "@/content/localPlotData";
import axios from "axios";
import MSAViewer from "@/components/MSAViewer";

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
    'geneSelectionEndpoint': backendAPI + "data/aminoacidplotoptions/"
  }

  const [selectedAllele, setSelectedAllele] = useState<string>("");

  const [sequenceData, setSequenceData] = useState<ISequenceData[]>([{'allele': 'Allele', 'sequence': 'SEQUENCE'}]);
  const [aminoAcidSequence, setAminoAcidSequence] = useState<ISequenceData[]>([{'allele': 'Allele', 'sequence': 'SEQUENCE'}]);

  async function AASequenceData(allele: string) {
    const AASequenceDataEndpoint: string = backendAPI + "data/sequences/aminoacidalleles/" + allele;

    await axios
      .get(AASequenceDataEndpoint, axiosConfig)
      .then((response) => {
        const responseData: IMSAData[] = response.data;
        let item: IMSAData;
        const tmpAminoAcidSequence = [];
        const tmpSequenceData = [];
        for (item of responseData) {
          tmpAminoAcidSequence.push({'allele': item.aa_allele, 'sequence': item.aa_sequence});
          tmpSequenceData.push(item.allele_data[0])
        }
        setAminoAcidSequence(tmpAminoAcidSequence);
        setSequenceData(tmpSequenceData);
      })
      .catch((response) => console.log(response.error));
  }

  // Fetch data when allele dropdown changes
  useEffect(() => {
    if (selectedAllele) {
      if (!hasCookie('password')) {
        const allele_data_sample: string = "IGHV1-18*01_AA"
        const strToKey = allele_data_sample as keyof typeof sampleMSAData[0];
        setSequenceData(sampleMSAData[0][strToKey].allele_data)
        setAminoAcidSequence([{'allele': "IGHV1-18*01", 'sequence': sampleMSAData[0][strToKey].aa_sequence}])
      }
      else {
        AASequenceData(selectedAllele);
      }
    }
    else {
      setSequenceData([{'allele': 'Allele', 'sequence': 'SEQUENCE'}]);
      setAminoAcidSequence([{'allele': 'Allele', 'sequence': 'SEQUENCE'}]);
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
      <div className="divider pt-4 "></div>
      <h1 className="text-black">Nucleotide sequence alignment</h1>
      <MSAViewer sequenceData={sequenceData} />
      <div className="divider pt-4 "></div>
      <h1 className="text-black">Translated sequence alignment</h1>
      <MSAViewer sequenceData={aminoAcidSequence} />
    </>
  );
}
