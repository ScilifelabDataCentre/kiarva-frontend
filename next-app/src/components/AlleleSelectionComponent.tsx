// relies heavily on client side functionality. Could be rewritten in a better way, but may be a lot of work.
// not prioritized imo.

"use client";

import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import DropdownComponent from "@/components/DropdownComponent";
import { IAlleleDropDownConfig } from "@/interfaces/types";
import DownloadPlotData from "./DownloadPlotData";
import { getDbName } from "@/lib/APIcalls";
import { axiosConfig } from "@/constants";

// Main function to render the PlotPage component
export default function AlelleSelectionComponent(prop: {
  alleleSelectionConfig: IAlleleDropDownConfig;
  handleSetSelection: (allele: string) => void;
  plotType: string;
}): ReactElement {

  // Initialize state for dropdown selections
  const [currentPicks, setCurrentPicks] = useState({
    geneSegmentDropdown: "",
    geneDropdown: "",
    subtypeDropdown: "",
    alleleDropdown: "",
  });

  const [dbName, setDbName] = useState<string>("");

  // ------------------------
  // temporary data, used until backend with live data is allowed to be published
  // Arrays for dropdown menu items
  const geneSegmentItemsArray =
    prop.alleleSelectionConfig.geneSegmentItemsArray;
  const geneDropDownItemsArray =
    prop.alleleSelectionConfig.geneDropDownItemsArray;

  const [subtypeDropDownItemsArray, setSubtypeDropDownItemsArray] = useState<
    string[]
  >(["..."]);
  const [alleleDropDownItemsArray, setAlleleDropDownItemsArray] = useState<
    string[]
  >(["..."]);
  const geneSelectionEndpoint: string =
    prop.alleleSelectionConfig.geneSelectionEndpoint;

  // Function to update the current pick for dropdowns
  const handleSetCurrentPick = (dropdownName: string, value: string) => {
    setCurrentPicks((prev: typeof currentPicks) => ({
      ...prev,
      [dropdownName]: value,
      ...(dropdownName === "subtypeDropdown" && { alleleDropdown: "" }), // Reset alleleDropdown if subtypeDropdown changes
      ...(dropdownName === "geneDropdown" && {
        alleleDropdown: "",
        subtypeDropdown: "",
      }), // Reset alleleDropdown and subtypeDropdown if geneDropdown changes
      ...(dropdownName === "geneSegmentDropdown" && {
        alleleDropdown: "",
        subtypeDropdown: "",
        geneDropdown: "",
      }), // Reset alleleDropdown, subtypeDropdown, and geneDropdown if geneSegmentDropdown changes
    }));
  };

  useEffect(() => {
    if (!currentPicks.subtypeDropdown) {
      setAlleleDropDownItemsArray(["..."]);
      const currentSelection = currentPicks.geneDropdown;

      const encodedCurrentSelection = encodeURIComponent(currentSelection);

      axios
        .get(geneSelectionEndpoint + encodedCurrentSelection, axiosConfig)
        .then((response) => {
          const responseData = response.data;
          //  responseData.push("...");
          setSubtypeDropDownItemsArray(responseData);
        })
        .catch((response) => console.log(response.error));
    } else {
      const currentSelection =
        currentPicks.geneDropdown + currentPicks.subtypeDropdown + "*";

      const encodedCurrentSelection = encodeURIComponent(currentSelection);

      setAlleleDropDownItemsArray([]);
      axios
        .get(geneSelectionEndpoint + encodedCurrentSelection, axiosConfig)
        .then((response) => {
          const responseData = response.data;
          // responseData.push("...");
          setAlleleDropDownItemsArray(responseData);
        })
        .catch((response) => console.log(response.error));
    }
  }, [currentPicks.geneDropdown, currentPicks.subtypeDropdown]);


  async function awaitDbName() {
    const dbName: string = await getDbName(
      currentPicks.geneDropdown +
      currentPicks.subtypeDropdown +
      "," +
      currentPicks.alleleDropdown)
    
    prop.handleSetSelection(dbName);
    setDbName(dbName);
  }

  useEffect(() => {
    if (!(prop.plotType == "aminoAcidMSA")) {
      // Treat placeholder values as "not selected"
      if (
        !currentPicks.alleleDropdown ||
        currentPicks.alleleDropdown === "..."
      ) {
        prop.handleSetSelection("");
        setDbName("");
      } else {
        awaitDbName();
      }
    } else {
      // Treat placeholder values as "not selected"
      if (
        !currentPicks.subtypeDropdown ||
        currentPicks.subtypeDropdown === "..."
      ) {
        prop.handleSetSelection("");
        setDbName("");
      } else {
        prop.handleSetSelection(
          currentPicks.geneDropdown + currentPicks.subtypeDropdown
        );
        setDbName(currentPicks.geneDropdown + currentPicks.subtypeDropdown + '*');
      }
    }
  }, [
    currentPicks.geneDropdown,
    currentPicks.subtypeDropdown,
    currentPicks.alleleDropdown,
  ]);

  // Render the component
  return (
    <section aria-labelledby="allele-selection-form-heading">
      <h2 id="allele-selection-form-heading" className="sr-only">
        Allele selection form
      </h2>
      <fieldset>
        <legend className="sr-only">
          Select gene segment, gene type, gene and allele
        </legend>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/4">
            <DropdownComponent
              menuName="Loci"
              menuItemsArray={geneSegmentItemsArray}
              currentPick={currentPicks.geneSegmentDropdown}
              setCurrentPick={(value) =>
                handleSetCurrentPick("geneSegmentDropdown", value)
              }
            />
          </div>
          <div
            className={`w-full lg:w-1/4 ${
              currentPicks.geneSegmentDropdown === ""
                ? "cursor-not-allowed pointer-events-none opacity-50"
                : ""
            }`}
            aria-disabled={currentPicks.geneSegmentDropdown === ""}
          >
            <DropdownComponent
              menuName="Gene type"
              menuItemsArray={geneDropDownItemsArray}
              currentPick={currentPicks.geneDropdown}
              setCurrentPick={(value) =>
                handleSetCurrentPick("geneDropdown", value)
              }
            />
          </div>
          <div
            className={`w-full lg:w-1/4 ${
              currentPicks.geneDropdown === ""
                ? "cursor-not-allowed pointer-events-none opacity-50"
                : ""
            }`}
            aria-disabled={currentPicks.geneDropdown === ""}
          >
            <DropdownComponent
              menuName="Gene"
              menuItemsArray={subtypeDropDownItemsArray}
              currentPick={currentPicks.subtypeDropdown}
              setCurrentPick={(value) =>
                handleSetCurrentPick("subtypeDropdown", value)
              }
            />
          </div>
          <div
            className={`w-full lg:w-1/4 ${
              currentPicks.subtypeDropdown === ""
                ? "cursor-not-allowed pointer-events-none opacity-50"
                : ""
            }`}
            aria-disabled={currentPicks.subtypeDropdown === ""}
          >
            {!(prop.plotType == "aminoAcidMSA") && (
              <DropdownComponent
                menuName="Allele"
                menuItemsArray={alleleDropDownItemsArray}
                currentPick={currentPicks.alleleDropdown}
                setCurrentPick={(value) =>
                  handleSetCurrentPick("alleleDropdown", value)
                }
              />
            )}
          </div>
        </div>
      </fieldset>
      <div
        className="flex items-center justify-center pt-8"
        role="status"
        aria-live="polite"
      >
        <div className="w-1/2">
          {(!currentPicks.alleleDropdown ||
            currentPicks.alleleDropdown == "...") &&
          currentPicks.geneDropdown &&
          currentPicks.subtypeDropdown &&
          currentPicks.subtypeDropdown !== "..." ? (
            prop.plotType == "aminoAcidMSA" ? (
              <p className="text-neutral-content text-xl font-semibold">
                Sequence alignments for {currentPicks.geneDropdown}
                {currentPicks.subtypeDropdown}
              </p>
            ) : (
              <div className="flex items-center flex-col">
                <p className="text-neutral-content text-xl font-semibold p-2 text-center">
                  Please select the allele above
                </p>
                <DownloadPlotData
                  alleleOrGene={
                    currentPicks.geneDropdown + currentPicks.subtypeDropdown
                  }
                  tableType={prop.plotType}
                  fullGene={true}
                ></DownloadPlotData>
              </div>
            )
          ) : currentPicks.geneDropdown &&
            currentPicks.subtypeDropdown &&
            currentPicks.alleleDropdown &&
            currentPicks.subtypeDropdown !== "..." &&
            currentPicks.alleleDropdown !== "..." ? (
            <div className="flex items-center flex-col">
              <div className="flex flex-row">
                <DownloadPlotData
                  alleleOrGene={
                    dbName
                  }
                  tableType={prop.plotType}
                  fullGene={false}
                ></DownloadPlotData>
                <DownloadPlotData
                  alleleOrGene={
                    currentPicks.geneDropdown + currentPicks.subtypeDropdown
                  }
                  tableType={prop.plotType}
                  fullGene={true}
                ></DownloadPlotData>
              </div>
              {prop.plotType == "translatedFreqPlot" ?
                <p className="text-neutral-content text-xl font-semibold p-2 text-center">
                  Combined frequency for {dbName} and alleles with the same translated sequence
                </p>
                :
                <p className="text-neutral-content text-xl font-semibold p-2">
                  Plot for {dbName}
                </p>
              }
            </div>
          ) : (
            <p className="text-neutral-content text-xl font-semibold text-center">
              Please select the gene type, gene and allele above
            </p>
          )}
        </div>
      </div>
    </section>
  );
}