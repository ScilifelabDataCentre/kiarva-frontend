import React, { useEffect, useState } from "react";
import { DownloadBoxComponentProps } from "../interfaces/types";

// Define the DownloadBoxComponent as a functional component that takes DownloadBoxComponentProps as props
const DownloadBoxComponent: React.FC<DownloadBoxComponentProps> = ({
  geneSegment,
  geneObjectArray,
  setPropsSelectionArray,
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

  // Effect to update selected genes array when wholeGeneSegmentSelected changes
  useEffect(() => {
    if (wholeGeneSegmentSelected) {
      setGenesSelectedArray(availableGeneObjectArray.map((gene) => gene.name));
    }
  }, [wholeGeneSegmentSelected]);

  // Effect to update wholeGeneSegmentSelected based on the length of genesSelectedArray
  useEffect(() => {
    setPropsSelectionArray(genesSelectedArray);
    if (genesSelectedArray.length === availableGeneObjectArray.length) {
      setWholeGeneSegmentSelected(true);
    } else {
      setWholeGeneSegmentSelected(false);
    }
  }, [genesSelectedArray]);

  return (
    <>
      {/* DownloadBox button */}
      <div className="form-control basis-1/6 rounded-box bg-white transition-all duration-300 shadow-lg hover:shadow-2xl">
        <label className="label justify-start gap-2 cursor-pointer rounded-md mx-4 px-2 py-2 my-3 transition-all duration-300 hover:bg-neutral">
          <input
            type="checkbox"
            className="checkbox"
            checked={wholeGeneSegmentSelected}
            onChange={() => {
              setWholeGeneSegmentSelected(!wholeGeneSegmentSelected);
              if (wholeGeneSegmentSelected) {
                setGenesSelectedArray([]);
              }
            }}
          />
          <span className="label-text font-bold tracking-wide">
            {geneSegment}
          </span>
        </label>
        <div className="divider !my-0 mx-8"></div>

        {/* Map through the geneObjectArray and create a clickable item for each gene */}
        {geneObjectArray.map((gene, index) => (
          <label
            key={index}
            className={`label justify-start gap-2 cursor-pointer rounded-md mx-4 px-2 py-2 my-2 transition-all duration-300 hover:bg-neutral ${
              gene.isAvailable
                ? ""
                : "cursor-not-allowed pointer-events-none opacity-50"
            }`}
          >
            <input
              type="checkbox"
              className="checkbox"
              checked={genesSelectedArray.includes(gene.name)}
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
            />
            <span className="label-text">{gene.name}</span>
          </label>
        ))}
      </div>
    </>
  );
};

export default DownloadBoxComponent;
