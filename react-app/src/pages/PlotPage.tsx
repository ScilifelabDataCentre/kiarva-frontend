import { ReactElement, useEffect, useState } from "react";
import {
  backendAPI,
  BODY_CLASSES,
  // BUTTON_TYPE_ONE,
  H_1,
} from "../constants";
import { TrackPageViewIfEnabled } from "../util/cookiesHandling";
import FrequencyPlotComponent from "../components/FrequencyPlotComponent";
import { IGeneFrequencyData, IgSNPerData, IPopulationRegion } from "../interfaces/types";
import axios from "axios";
import DropdownComponent from "../components/DropdownComponent";
import PopupComponent from "../components/PopupComponent";

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

  // Initialize state for dropdown selections
  const [currentPicks, setCurrentPicks] = useState({
    geneSegmentDropdown: "",
    geneDropdown: "",
    subtypeDropdown: "",
    alleleDropdown: "",
  });

  const [igSNPerScore, setIgSNPerScore] = useState<string>("")
  const [igSNPerSNPs, setIgSNPerSNPs] = useState<string[]>([])

  // Arrays for dropdown menu items
  let geneSegmentItemsArray = ["IGH", "..."];
  let geneDropDownItemsArray = ["IGHV", "IGHD", "IGHJ", "..."];
  const [subtypeDropDownItemsArray, setSubtypeDropDownItemsArray] = useState<
    string[]
  >(["..."]);
  const [alleleDropDownItemsArray, setAlleleDropDownItemsArray] = useState<
    string[]
  >(["..."]);
  const geneSelectionEndpoint: string = backendAPI + "data/plotoptions/";

  // Function to fetch gene frequency data from the backend API
  async function getGeneFreqData(allele: string) {
    let alleleFrequenciesEndpoint: string = backendAPI + "data/frequencies/";
    let superpopulationsEndpoint: string =
      alleleFrequenciesEndpoint + "superpopulations/" + allele;

    console.log(superpopulationsEndpoint);
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

  async function getGeneIgSNPerData(allele: string) {
    let alleleIgSNPerDataEndpoint: string = backendAPI + "data/igsnperdata/" + allele;
    console.log(alleleIgSNPerDataEndpoint);
    await axios
      .get(alleleIgSNPerDataEndpoint)
      .then((response) => {
        let responseData: IgSNPerData = response.data;
        if (responseData.igSNPer_score || responseData.igSNPer_score === 0) {
          let scoreString = responseData.igSNPer_score.toString();
          if (scoreString.length === 1) {
            setIgSNPerScore(scoreString + ".0");
          } else {
            setIgSNPerScore(scoreString);
          }
        }
        else {
          setIgSNPerScore("Missing");
        }
        setIgSNPerSNPs(responseData.igSNPer_SNPs);
      })
      .catch((response) => console.log(response.error));
  }
  // Fetch gene frequency data when allele dropdown changes
  useEffect(() => {
    getGeneFreqData(
      currentPicks.geneDropdown +
        currentPicks.subtypeDropdown +
        currentPicks.alleleDropdown
    );
    getGeneIgSNPerData(
      currentPicks.geneDropdown +
        currentPicks.subtypeDropdown +
        currentPicks.alleleDropdown
    );
  }, [currentPicks.alleleDropdown]);

  useEffect(() => {
    if (!currentPicks.alleleDropdown) {
      setIgSNPerScore("");
      setIgSNPerSNPs([]);
    }
  }, [currentPicks.geneSegmentDropdown, currentPicks.geneDropdown, currentPicks.subtypeDropdown])

  // fetch region data (which subpopulation belongs to which superpopulation)
  // either on page load or when currentPicks is changed
  // (should be on page load, but seemed a bit slow or unresponsive sometimes
  // so added currentPicks for safety)
  useEffect(() => {
    let populationRegionEndpoint: string =
      backendAPI + "data/populationregions";
    axios
      .get(populationRegionEndpoint)
      .then((response) => {
        setSuperpopulationRegions(response.data);
      })
      .catch((response) => console.log(response.error));
  }, [, currentPicks]);

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

  // fetch next selection options after gene is selected
  useEffect(() => {
    if (!currentPicks.subtypeDropdown) {
      setAlleleDropDownItemsArray(["..."]);
      let currentSelection = currentPicks.geneDropdown;
      axios
        .get(geneSelectionEndpoint + currentSelection)
        .then((response) => {
          let responseData = response.data;
          responseData.push("...");
          setSubtypeDropDownItemsArray(responseData);
        })
        .catch((response) => console.log(response.error));
    } else {
      let currentSelection =
        currentPicks.geneDropdown + currentPicks.subtypeDropdown + "*";
      setAlleleDropDownItemsArray([]);
      axios
        .get(geneSelectionEndpoint + currentSelection)
        .then((response) => {
          let responseData = response.data;
          responseData.push("...");
          setAlleleDropDownItemsArray(responseData);
        })
        .catch((response) => console.log(response.error));
    }
  }, [currentPicks.geneDropdown, currentPicks.subtypeDropdown]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
          <span className="text-sm lg:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            tortor mauris, suscipit eu lacinia non, imperdiet blandit risus.
            Maecenas pellentesque, massa id sodales dictum, urna urna tincidunt
            eros, ac consequat urna lectus vel ligula. Suspendisse justo est,
            auctor et mi id, aliquet bibendum lacus. Quisque accumsan egestas
            felis, vel bibendum nunc fringilla nec. Integer accumsan
            sollicitudin porttitor. rna eros dapibus erat. Nam bibendum ac felis
            quis convallis. Praesent ne
          </span>
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/4">
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
            className={`w-full lg:w-1/4 ${
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
            className={`w-full lg:w-1/4 ${
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
            className={`w-full lg:w-1/4 ${
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
        <div className="flex flex-col lg:flex-row items-start justify-between pt-8 gap-4">
          <p className="text-neutral-content text-lg lg:text-xl font-semibold lg:w-1/4">
            SNiPer SCORE: {igSNPerScore}
          </p>
          <div className="overflow-x-auto lg:w-1/4">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-neutral text-base-content">
                  <thead className="bg-neutral">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-lg lg:text-xl font-semibold"
                      >
                        Associated SNPs
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral text-base lg:text-lg">
                    {igSNPerSNPs.map(value => {
                      return (
                      <tr key={value}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {value}
                        </td>
                      </tr>)
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="lg:w-1/4"></div>
          <button
            className="bg-gradient-to-r from-neutral to-secondary text-base-content text-base lg:text-lg flex gap-2 justify-center items-center px-4 order-first lg:order-4 lg:px-0 lg:w-1/4 h-12 font-bold rounded-3xl shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:opacity-90"
            onClick={() => setIsPopupOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            Population abbreviations
          </button>
        </div>
        {isPopupOpen && (
          <PopupComponent onClose={() => setIsPopupOpen(false)} />
        )}
      </div>
    </>
  );
}
