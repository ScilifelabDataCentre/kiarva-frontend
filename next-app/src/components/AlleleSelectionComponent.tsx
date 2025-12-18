// relies heavily on client side functionality. Could be rewritten in a better way, but may be a lot of work.
// not prioritized imo.

"use client";

import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import DropdownComponent from "@/components/DropdownComponent";
import { IAlleleDropDownConfig } from "@/interfaces/types";

// Main function to render the PlotPage component
export default function AlelleSelectionComponent(prop: {
  alleleSelectionConfig: IAlleleDropDownConfig;
  handleSetSelection: (allele: string) => void;
  plotType: string;
}): ReactElement {
  const { handleSetSelection, plotType } = prop;

  // Initialize state for dropdown selections
  const [currentPicks, setCurrentPicks] = useState({
    geneSegmentDropdown: "",
    geneDropdown: "",
    subtypeDropdown: "",
    alleleDropdown: "",
  });

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
    if (!currentPicks.geneDropdown) {
      setSubtypeDropDownItemsArray(["..."]);
      setAlleleDropDownItemsArray(["..."]);
      return;
    }

    if (!currentPicks.subtypeDropdown) {
      setAlleleDropDownItemsArray(["..."]);
      const currentSelection = currentPicks.geneDropdown;

      const encodedCurrentSelection = encodeURIComponent(currentSelection);

      axios
        .get(geneSelectionEndpoint + encodedCurrentSelection)
        .then((response) => {
          const responseData = response.data;
          setSubtypeDropDownItemsArray(responseData);
        })
        .catch((response) => console.log(response.error));
    } else {
      const currentSelection =
        currentPicks.geneDropdown + currentPicks.subtypeDropdown + "*";

      const encodedCurrentSelection = encodeURIComponent(currentSelection);

      setAlleleDropDownItemsArray([]);
      axios
        .get(geneSelectionEndpoint + encodedCurrentSelection)
        .then((response) => {
          const responseData = response.data;
          setAlleleDropDownItemsArray(responseData);
        })
        .catch((response) => console.log(response.error));
    }
  }, [currentPicks.geneDropdown, currentPicks.subtypeDropdown, geneSelectionEndpoint]);

  useEffect(() => {
    if (!(plotType == "aminoAcidMSA")) {
      if (!currentPicks.alleleDropdown) {
        handleSetSelection("");
      } else {
        handleSetSelection(
          currentPicks.geneDropdown +
            currentPicks.subtypeDropdown +
            "*" +
            currentPicks.alleleDropdown
        );
      }
    } else {
      if (!currentPicks.subtypeDropdown) {
        handleSetSelection("");
      } else {
        handleSetSelection(
          currentPicks.geneDropdown + currentPicks.subtypeDropdown
        );
      }
    }
  }, [
    currentPicks.geneDropdown,
    currentPicks.subtypeDropdown,
    currentPicks.alleleDropdown,
    handleSetSelection,
    plotType,
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
        <p className="text-neutral-content text-xl font-semibold">
          {prop.plotType === "aminoAcidMSA" &&
          currentPicks.geneDropdown &&
          currentPicks.subtypeDropdown ? (
            <>
              Sequence alignments for {currentPicks.geneDropdown}
              {currentPicks.subtypeDropdown}
            </>
          ) : currentPicks.geneDropdown &&
            currentPicks.subtypeDropdown &&
            currentPicks.alleleDropdown ? (
            <>
              Plot for {currentPicks.geneDropdown}
              {currentPicks.subtypeDropdown}*{currentPicks.alleleDropdown}
            </>
          ) : (
            "Please select the gene type, gene and allele above"
          )}
        </p>
      </div>
    </section>
  );
}
