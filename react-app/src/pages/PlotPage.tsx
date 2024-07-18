import { ReactElement, useEffect, useState } from "react";
import {
  backendAPI,
  BODY_CLASSES,
  // BUTTON_TYPE_ONE,
  H_1,
} from "../constants";
import { TrackPageViewIfEnabled } from "../util/cookiesHandling";
import FrequencyPlotComponent from "../components/FrequencyPlotComponent";
import { IGeneFrequencyData, IPopulationRegion } from "../interfaces/types";
import axios from "axios";
import DropdownComponent from "../components/DropdownComponent";

// Main function to render the PlotPage component
export default function PlotPage(): ReactElement {
  // Track page views if cookies handling is enabled
  TrackPageViewIfEnabled();

  // Define superpopulations and their corresponding colors
  const superpopulations: string[] = ["AFR", "EUR", "EAS", "SAS", "AMR"];

  const superPopulationColorsDict = {
    AFR: "#f25c5c",
    AMR: "#dab862",
    EAS: "#70c265",
    EUR: "#5480f0",
    SAS: "#999999",
  };

  // Initialize superpopulation frequency data with zero values
  const superpopFreqDataNoSelection: IGeneFrequencyData[] = [];
  for (let i = 0; i < superpopulations.length; i++) {
    superpopFreqDataNoSelection.push({
      frequency: 0,
      n: 0,
      population: superpopulations[i],
    });
  }

  // Define populations and their corresponding color
  const populations: string[] = [
    "ACB",
    "ASW",
    "ESN",
    "GWD",
    "LWK",
    "MSL",
    "YRI",
    "FIN",
    "GBR",
    "IBS",
    "TSI",
    "CDX",
    "CHB",
    "CHS",
    "JPT",
    "KHV",
    "BEB",
    "GIH",
    "ITU",
    "PJL",
    "STU",
    "CLM",
    "MXL",
    "PEL",
    "PUR",
  ];

  // Initialize population frequency data with zero values
  const popFreqDataNoSelection: IGeneFrequencyData[] = [];
  for (let i = 0; i < populations.length; i++) {
    popFreqDataNoSelection.push({
      frequency: 0,
      n: 0,
      population: populations[i],
    });
  }

  // State variables for selected dropdown values and fetched data
  const [superpopFreqAPIData, setSuperpopFreqAPIData] = useState<
    IGeneFrequencyData[]
  >(superpopFreqDataNoSelection);
  const [popFreqAPIData, setPopFreqAPIData] = useState<IGeneFrequencyData[]>(
    popFreqDataNoSelection
  );
  const [superpopulationRegions, setSuperpopulationRegions] = useState<
    IPopulationRegion[]
  >([{ superpopulation: "", population: "" }]);

  // Function to fetch gene frequency data from the backend API
  async function getGeneFreqData(allele: string) {
    let alleleFrequenciesEndpoint: string = backendAPI + "data/frequencies/";
    let superpopulationsEndpoint: string =
      alleleFrequenciesEndpoint + "superpopulations/" + allele;
    await axios
      .get(superpopulationsEndpoint)
      .then((response) => {
        setSuperpopFreqAPIData(response.data);
      })
      .catch((response) => console.log(response.error));

    let populationsEndpoint: string =
      alleleFrequenciesEndpoint + "populations/" + allele;
    await axios
      .get(populationsEndpoint)
      .then((response) => {
        setPopFreqAPIData(response.data);
      })
      .catch((response) => console.log(response.error));
  }

  // Initialize state for dropdown selections
  const [currentPicks, setCurrentPicks] = useState({
    geneSegmentDropdown: "",
    geneDropdown: "",
    subtypeDropdown: "",
    alleleDropdown: "",
  });

  // Fetch gene frequency data when allele dropdown changes
  useEffect(() => {
    getGeneFreqData(
      currentPicks.geneDropdown +
        currentPicks.subtypeDropdown +
        currentPicks.alleleDropdown
    );
  }, [currentPicks.alleleDropdown]);

  useEffect(() => {
    let populationRegionEndpoint: string =
      backendAPI + "data/populationregions";
    axios
      .get(populationRegionEndpoint)
      .then((response) => {
        setSuperpopulationRegions(response.data);
      })
      .catch((response) => console.log(response.error));
  }, []);

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

  // Arrays for dropdown menu items
  let geneDropDownItemsArray = ["IGHV", "IGHD", "IGKJ", "..."];
  let subtypeDropDownItemsArray = ["1-2", "3-4", "..."];
  let alleleDropDownItemsArray = ["*02", "*04", "*05", "*06", "..."];
  let geneSegmentItemsArray = ["IGH", "..."];

  // Render the component
  return (
    <>
      <div className={BODY_CLASSES}>
        <h1 className={H_1}>Generate allele frequency plots</h1>
        <div className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div className="flex flex-col">
            <label className="font-bold">Instructions</label>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              tortor mauris, suscipit eu lacinia non, imperdiet blandit risus.
              Maecenas pellentesque, massa id sodales dictum, urna urna
              tincidunt eros, ac consequat urna lectus vel ligula. Suspendisse
              justo est, auctor et mi id, aliquet bibendum lacus. Quisque
              accumsan egestas felis, vel bibendum nunc fringilla nec. Integer
              accumsan sollicitudin porttitor. rna eros dapibus erat. Nam
              bibendum ac felis quis convallis. Praesent ne
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="basis-1/4">
            <DropdownComponent
              menuName="gene segment"
              menuItemsArray={geneSegmentItemsArray}
              currentPick={currentPicks.geneSegmentDropdown}
              setCurrentPick={(value) =>
                handleSetCurrentPick("geneSegmentDropdown", value)
              }
            />
          </div>
          <div
            className={`basis-1/4 ${
              currentPicks.geneSegmentDropdown === ""
                ? "cursor-not-allowed pointer-events-none opacity-50"
                : ""
            }`}
          >
            <DropdownComponent
              menuName="gene"
              menuItemsArray={geneDropDownItemsArray}
              currentPick={currentPicks.geneDropdown}
              setCurrentPick={(value) =>
                handleSetCurrentPick("geneDropdown", value)
              }
            />
          </div>
          <div
            className={`basis-1/4 ${
              currentPicks.geneDropdown === ""
                ? "cursor-not-allowed pointer-events-none opacity-50"
                : ""
            }`}
          >
            <DropdownComponent
              menuName="subtype"
              menuItemsArray={subtypeDropDownItemsArray}
              currentPick={currentPicks.subtypeDropdown}
              setCurrentPick={(value) =>
                handleSetCurrentPick("subtypeDropdown", value)
              }
            />
          </div>
          <div
            className={`basis-1/4 ${
              currentPicks.subtypeDropdown === ""
                ? "cursor-not-allowed pointer-events-none opacity-50"
                : ""
            }`}
          >
            <DropdownComponent
              menuName="allele"
              menuItemsArray={alleleDropDownItemsArray}
              currentPick={currentPicks.alleleDropdown}
              setCurrentPick={(value) =>
                handleSetCurrentPick("alleleDropdown", value)
              }
            />
          </div>
        </div>
        <div className="flex items-center justify-center pt-8">
          <p className="text-neutral-content text-xl font-semibold">
            Plots for {currentPicks.geneDropdown} {currentPicks.subtypeDropdown}{" "}
            {currentPicks.alleleDropdown}
          </p>
        </div>
        <FrequencyPlotComponent
          superpopulationAPIData={superpopFreqAPIData}
          superpopulationColors={superPopulationColorsDict}
          populationAPIData={popFreqAPIData}
          superpopulationRegions={superpopulationRegions}
        />
      </div>
    </>
  );
}
