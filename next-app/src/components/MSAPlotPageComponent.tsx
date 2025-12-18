// Handles API requests, which should probably be done on a server component. Other than that uses a lot of
// state changes based on user, so should be client.

"use client";

import { ReactElement, useCallback, useEffect, useState } from "react";
import { backendAPI, LINK_CLASSES } from "@/constants";
import {
  ISequenceData,
  IAlleleDropDownConfig,
  IMSAData,
} from "@/interfaces/types";
import AlelleSelectionComponent from "@/components/AlleleSelectionComponent";
import axios from "axios";
import MSAViewer from "@/components/MSAViewer";

// Main function to render the PlotPage component
export default function MSAPlotPageComponent(): ReactElement {
  // config for AlleleSelectionComponent which sets up the allele segment dropdown menu
  const alleleDropdownConfig: IAlleleDropDownConfig = {
    geneSegmentItemsArray: ["IGH"],
    geneDropDownItemsArray: ["IGHV"],
    geneSelectionEndpoint: backendAPI + "data/plotoptions?current_selection=",
  };

  const [selectedGene, setSelectedGene] = useState<string>("");

  const [sequenceData, setSequenceData] = useState<ISequenceData[]>([
    { allele: "Allele", sequence: "SEQUENCE" },
  ]);
  const [aminoAcidSequence, setAminoAcidSequence] = useState<ISequenceData[]>([
    { allele: "Allele", sequence: "SEQUENCE" },
  ]);

  async function AlignedSequenceData(gene: string) {
    const encodedGene = encodeURIComponent(gene);
    const alignedSequenceDataEndpoint: string =
      backendAPI + "data/sequences/alignedsequences?gene_name=" + encodedGene;

    await axios
      .get(alignedSequenceDataEndpoint)
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
      AlignedSequenceData(selectedGene);
    } else {
      setSequenceData([{ allele: "Allele", sequence: "SEQUENCE" }]);
      setAminoAcidSequence([{ allele: "Allele", sequence: "SEQUENCE" }]);
    }
  }, [selectedGene]);

  // function to be passed as prop to AlleleSelectionComponent, so that it can modify
  // state in parent component
  const handleSetSelection = useCallback((allele: string) => {
    setSelectedGene(allele);
  }, []);

  // Render the component
  return (
    <>
      <AlelleSelectionComponent
        alleleSelectionConfig={alleleDropdownConfig}
        handleSetSelection={handleSetSelection}
        plotType={"aminoAcidMSA"}
      />
      <div
        className="divider pt-4 lg:-mx-20 xl:-mx-28 2xl:-mx-36 min-[1920px]:-mx-80 min-[2200px]:-mx-96"
        aria-hidden="true"
      ></div>
      <section aria-labelledby="nucleotide-alignment">
        <h2
          id="nucleotide-alignment-heading"
          className="text-black lg:-mx-20 xl:-mx-28 2xl:-mx-36 min-[1920px]:-mx-80 min-[2200px]:-mx-96"
        >
          Nucleotide sequence alignment
        </h2>
        <MSAViewer sequenceData={sequenceData} />
      </section>
      <div
        className="divider pt-4 lg:-mx-20 xl:-mx-28 2xl:-mx-36 min-[1920px]:-mx-80 min-[2200px]:-mx-96"
        aria-hidden="true"
      ></div>
      <section aria-labelledby="translated-alignment">
        <h2
          id="translated-alignment-heading"
          className="text-black lg:-mx-20 xl:-mx-28 2xl:-mx-36 min-[1920px]:-mx-80 min-[2200px]:-mx-96"
        >
          Translated sequence alignment
        </h2>
        <MSAViewer sequenceData={aminoAcidSequence} />
      </section>
      <aside className="pt-24" aria-label="Alignment method information">
        <p className="text-sm lg:text-base">
          Nucleotide sequences are aligned using{" "}
          <a
            className={`${LINK_CLASSES} italic`}
            href="https://mafft.cbrc.jp/alignment/software/source.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            MAFFT v7.525
          </a>
          . Translated sequence alignments are based off of the MAFFT output for the nucleotide sequences, 
          but aligned with a{" "}
          <a
            className={`${LINK_CLASSES} italic`}
            href="https://github.com/ScilifelabDataCentre/kiarva-backend/blob/dev/services/alignment.py"
            target="_blank"
            rel="noopener noreferrer"
          >
            custom script
          </a>
          .
        </p>
      </aside>
    </>
  );
}
