import React from "react";
import { DownloadBoxComponentProps } from "../interfaces/types";

// Define the DropdownComponent as a functional component that takes DownloadBoxComponentProps as props
const DownloadBoxComponent: React.FC<DownloadBoxComponentProps> = ({
  geneSegment,
  geneObjectArray,
}) => {
  // Define classes for the selected DownloadBox item
  // const selectedRowClasses: string = "text-secondary-content bg-info";

  return (
    <>
      {/* DownloadBox button */}
      <div className="form-control basis-1/6 rounded-box bg-white transition-all duration-300 shadow-lg hover:shadow-2xl">
        <label className="label justify-start gap-2 cursor-pointer rounded-md mx-4 px-2 py-2 my-3 transition-all duration-300 hover:bg-neutral">
          <input type="checkbox" className="checkbox" />
          <span className="label-text font-bold tracking-wide">
            {geneSegment}
          </span>
        </label>
        <div className="divider !my-0 mx-8"></div>

        {/* Map through the object items array and create a clickable item for each */}
        {/* onClick={() => addToDownloadList(gene)} */}
        {geneObjectArray.map((gene, index) => (
          <label
            key={index}
            className={`label justify-start gap-2 cursor-pointer rounded-md mx-4 px-2 py-2 my-3 transition-all duration-300 hover:bg-neutral ${
              gene.isAvailable
                ? ""
                : "cursor-not-allowed pointer-events-none opacity-50"
            }`}
          >
            <input type="checkbox" className="checkbox" />
            <span className="label-text">
              {/* Display the gene name */}
              {gene.name}
            </span>
          </label>
        ))}
      </div>
    </>
  );
};

export default DownloadBoxComponent;
