"use client";

import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import DropdownComponent from "@/components/DropdownComponent";
import { getCookie, hasCookie } from "cookies-next";
import { IAlleleDropDownConfig } from "@/interfaces/types";

// Main function to render the PlotPage component
export default function AlelleSelectionComponent(prop: {
  alleleSelectionConfig: IAlleleDropDownConfig;
  handleSetSelection: (allele: string) => void;
  plotType: string;
}): ReactElement {
  const [axiosConfig, setAxiosConfig] = useState({
    headers: {
      "X-api-key": "",
    },
  });

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
    if (!hasCookie("password")) {
      if (prop.plotType == "genomicFreqPlot") {
        setSubtypeDropDownItemsArray(["1-2"]);
        setAlleleDropDownItemsArray(["*02_S4953", "*04", "*06"]);
      } else if (prop.plotType == "aminoAcidFreqPlot") {
        setSubtypeDropDownItemsArray(["1-18"]);
        setAlleleDropDownItemsArray(["*01_AA"]);
      } else if (prop.plotType == "aminoAcidMSA") {
        setSubtypeDropDownItemsArray(["1-18"]);
        setAlleleDropDownItemsArray(["*01_AA"]);
      } else {
        setSubtypeDropDownItemsArray(["..."]);
        setAlleleDropDownItemsArray(["..."]);
      }
    } else {
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
          currentPicks.geneDropdown + currentPicks.subtypeDropdown + '*';

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
    }
  }, [currentPicks.geneDropdown, currentPicks.subtypeDropdown]);

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

  useEffect(() => {
    if (!(prop.plotType == "aminoAcidMSA")) {
      if (!currentPicks.alleleDropdown) {
        prop.handleSetSelection("");
      } else {
        prop.handleSetSelection(
          currentPicks.geneDropdown +
            currentPicks.subtypeDropdown +
            "*" +
            currentPicks.alleleDropdown
        );
      }
    } else {
      if (!currentPicks.subtypeDropdown) {
        prop.handleSetSelection("");
      } else {
        prop.handleSetSelection(
          currentPicks.geneDropdown + currentPicks.subtypeDropdown
        );
      }
    }
  }, [
    currentPicks.geneDropdown,
    currentPicks.subtypeDropdown,
    currentPicks.alleleDropdown,
  ]);

  // Render the component
  return (
    <>
      <div>
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
        <div className="flex items-center justify-center pt-8">
          <p className="text-neutral-content text-xl font-semibold">
            {currentPicks.geneDropdown &&
            currentPicks.subtypeDropdown &&
            currentPicks.alleleDropdown ? (
              <>
                Plot for {currentPicks.geneDropdown}
                {currentPicks.subtypeDropdown}{currentPicks.alleleDropdown}
              </>
            ) : (
              "Please select the gene type, gene and allele above"
            )}
          </p>
        </div>
      </div>
    </>
  );
}
