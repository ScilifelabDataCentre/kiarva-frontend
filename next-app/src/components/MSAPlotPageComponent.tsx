"use client";

import { ReactElement, useEffect, useState } from "react";
import { backendAPI } from "@/constants";
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

  const [axiosConfig, setAxiosConfig] = useState({
    headers: {
      "X-api-key": "",
    },
  });

  // config for AlleleSelectionComponent which sets up the allele segment dropdown menu
  const alleleDropdownConfig: IAlleleDropDownConfig = {
    geneSegmentItemsArray: ["IGH"],
    geneDropDownItemsArray: ["IGHV"],
    geneSelectionEndpoint: backendAPI + "data/plotoptions/",
  };

  const [selectedGene, setSelectedGene] = useState<string>("");

  const [sequenceData, setSequenceData] = useState<ISequenceData[]>([
    { allele: "Allele", sequence: "SEQUENCE" },
  ]);
  const [aminoAcidSequence, setAminoAcidSequence] = useState<ISequenceData[]>([
    { allele: "Allele", sequence: "SEQUENCE" },
  ]);

  async function AlignedSequenceData(gene: string) {
    // allele names sometimes contain slashes, which breaks the functionality of the API as it interprets it as a path
    // replace with '&slash&' and replace again with '/' in the api
    gene = gene.replace("/", "&slash&");
    const AlignedSequenceDataEndpoint: string =
      backendAPI + "data/sequences/alignedsequences/" + gene;

    await axios
      .get(AlignedSequenceDataEndpoint, axiosConfig)
      .then((response) => {
        const responseData: IMSAData[] = response.data;
        let item: IMSAData;
        const tmpSequenceData = [];
        const tmpAminoAcidSequence = [];
        for (item of responseData) {
          tmpSequenceData.push({
            allele: item.allele,
            sequence: item.sequence_nt,
          });
          tmpAminoAcidSequence.push({
            allele: item.allele,
            sequence: item.sequence_aa,
          });
        }
        setSequenceData(tmpSequenceData);
        setAminoAcidSequence(tmpAminoAcidSequence);
      })
      .catch((response) => console.log(response.error));
  }

  // Fetch data when allele dropdown changes
  useEffect(() => {
    if (selectedGene) {
      if (!hasCookie("password")) {
        const tmpAminoAcidSequenceLite = [];
        const tmpSequenceDataLite = [];
        let item;
        for (item of sampleMSAData) {
          tmpSequenceDataLite.push({
            allele: item.allele,
            sequence: item.sequence_nt,
          });
          tmpAminoAcidSequenceLite.push({
            allele: item.allele,
            sequence: item.sequence_aa,
          });
        }
        setSequenceData(tmpSequenceDataLite);
        setAminoAcidSequence(tmpAminoAcidSequenceLite);
      } else {
        AlignedSequenceData(selectedGene);
      }
    } else {
      setSequenceData([{ allele: "Allele", sequence: "SEQUENCE" }]);
      setAminoAcidSequence([{ allele: "Allele", sequence: "SEQUENCE" }]);
    }
  }, [selectedGene]);

  // check on page load if password cookie has been set yet, and if it has add to axios headers for all requests to backend
  useEffect(() => {
    if (hasCookie("password")) {
      setAxiosConfig({
        headers: {
          "X-api-key": getCookie("password") as string,
        },
      });
    }
  }, []);

  // function to be passed as prop to AlleleSelectionComponent, so that it can modify
  // state in parent component
  function handleSetSelection(allele: string) {
    setSelectedGene(allele);
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
      <div className="divider pt-4 lg:-mx-20 xl:-mx-28 2xl:-mx-36 min-[1920px]:-mx-80 min-[2200px]:-mx-96"></div>
      <h1 className="text-black lg:-mx-20 xl:-mx-28 2xl:-mx-36 min-[1920px]:-mx-80 min-[2200px]:-mx-96">
        Nucleotide sequence alignment
      </h1>
      <MSAViewer sequenceData={sequenceData} />
      <div className="divider pt-4 lg:-mx-20 xl:-mx-28 2xl:-mx-36 min-[1920px]:-mx-80 min-[2200px]:-mx-96"></div>
      <h1 className="text-black lg:-mx-20 xl:-mx-28 2xl:-mx-36 min-[1920px]:-mx-80 min-[2200px]:-mx-96">
        Translated sequence alignment
      </h1>
      <MSAViewer sequenceData={aminoAcidSequence} />
    </>
  );
}
