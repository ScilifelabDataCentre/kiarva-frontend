"use client";

import React, { useEffect, useState } from "react";
import { DownloadBoxComponentProps } from "@/interfaces/types";
import { Checkbox } from "@/components/ui/checkbox"

// Define the DownloadBoxComponent as a functional component that takes DownloadBoxComponentProps as props
const DownloadBoxComponent: React.FC<DownloadBoxComponentProps> = ({
  geneSegment,
  geneObjectArray,
  setPropsSelectionArray,
  radialSelected,
}) => {
  // State to track if the whole gene segment is selected
  const [wholeGeneSegmentSelected, setWholeGeneSegmentSelected] =
    useState(false);

  // State to track selected genes
  const [genesSelectedArray, setGenesSelectedArray] = useState<string[]>([]);

  // Filter available genes from the geneObjectArray
  const availableGeneObjectArray = geneObjectArray.filter(
    (gene) => gene.isAvailable
  );

  useEffect(() => {
    setGenesSelectedArray([]);
    setWholeGeneSegmentSelected(false);
  }, [radialSelected]);

  // Effect to update selected genes array when wholeGeneSegmentSelected changes
  useEffect(() => {
    if (wholeGeneSegmentSelected) {
      setGenesSelectedArray(availableGeneObjectArray.map((gene) => gene.name));
    }
  }, [wholeGeneSegmentSelected]);

  // Effect to update wholeGeneSegmentSelected based on the length of genesSelectedArray
  useEffect(() => {
    setPropsSelectionArray(genesSelectedArray);
    if (genesSelectedArray.length === availableGeneObjectArray.length && genesSelectedArray.length > 0) {
      setWholeGeneSegmentSelected(true);
    } else {
      setWholeGeneSegmentSelected(false);
    }
  }, [genesSelectedArray]);

  return (
    <fieldset className="form-control basis-1/6 rounded-box mt-4 lg:mt-6 bg-white transition-all duration-300 shadow-lg hover:shadow-2xl">
      <legend className="sr-only">{geneSegment} gene selection</legend>
      <label className="label text-black justify-start gap-2 cursor-pointer rounded-md mx-4 px-2 py-2 my-3 transition-all duration-300 hover:bg-neutral">
        <Checkbox 
          checked={wholeGeneSegmentSelected} 
          onCheckedChange={() => {
            setWholeGeneSegmentSelected(!wholeGeneSegmentSelected);
            if (wholeGeneSegmentSelected) {
              setGenesSelectedArray([]);
            }
          }}
          aria-label={`Select all ${geneSegment} genes`}
           />
        {/* <input
          type="checkbox"
          className="checkbox checkbox-neutral"
          checked={wholeGeneSegmentSelected}
          onChange={() => {
            setWholeGeneSegmentSelected(!wholeGeneSegmentSelected);
            if (wholeGeneSegmentSelected) {
              setGenesSelectedArray([]);
            }
          }}
          aria-label={`Select all ${geneSegment} genes`}
        /> */}
        <span className="label-text font-bold tracking-wide">
          {geneSegment}
        </span>
      </label>
      <div className="divider my-0! mx-8" aria-hidden="true"></div>

      {/* Map through the geneObjectArray and create a clickable item for each gene */}
      {geneObjectArray.map((gene, index) => (
        <label
          key={index}
          className={`label text-black justify-start gap-2 cursor-pointer rounded-md mx-4 px-2 py-2 my-2 transition-all duration-300 hover:bg-neutral ${
            gene.isAvailable
              ? ""
              : "cursor-not-allowed pointer-events-none opacity-30"
          }`}
        >
          <Checkbox 
            checked={genesSelectedArray.includes(gene.name)} 
            disabled={!gene.isAvailable}
            aria-disabled={!gene.isAvailable}
            onCheckedChange={() => {
              setGenesSelectedArray((prevGenesSelectedArray) => {
                if (!prevGenesSelectedArray.includes(gene.name)) {
                  // If the gene is not already selected, add it to the array
                  return [...prevGenesSelectedArray, gene.name];
                } else {
                  // If the gene is already selected, remove it from the array
                  return prevGenesSelectedArray.filter(
                    (selectedGene) => selectedGene !== gene.name
                  );
                }
              });
            }}
          />
          {/* <input
            type="checkbox"
            className="checkbox"
            checked={genesSelectedArray.includes(gene.name)}
            disabled={!gene.isAvailable}
            aria-disabled={!gene.isAvailable}
            onChange={() => {
              setGenesSelectedArray((prevGenesSelectedArray) => {
                if (!prevGenesSelectedArray.includes(gene.name)) {
                  // If the gene is not already selected, add it to the array
                  return [...prevGenesSelectedArray, gene.name];
                } else {
                  // If the gene is already selected, remove it from the array
                  return prevGenesSelectedArray.filter(
                    (selectedGene) => selectedGene !== gene.name
                  );
                }
              });
            }}
          /> */}
          <span className="label-text">{gene.name}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default DownloadBoxComponent;
