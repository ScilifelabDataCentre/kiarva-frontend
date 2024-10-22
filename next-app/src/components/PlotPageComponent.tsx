'use client';

import { ReactElement, useEffect, useState } from "react";
import {
  backendAPI,
  // backendAPI,
  BODY_CLASSES,
  // BUTTON_TYPE_ONE,
  H_1,
} from "@/constants";
import { TrackPageViewIfEnabled } from "@/util/cookiesHandling";
import FrequencyPlotComponent from "@/components/FrequencyPlotComponent";
import {
  IGeneFrequencyData,
  IgSNPerData,
  IPopulationRegion,
} from "@/interfaces/types";
import axios from "axios";
import DropdownComponent from "@/components/DropdownComponent";
import AbbreviationPopupComponent from "@/components/AbbreviationPopupComponent";
import DisclaimerPopupComponent from "@/components/DisclaimerPopupComponent";
import { getCookie, hasCookie } from "cookies-next";

// Main function to render the PlotPage component
export default function PlotPage(): ReactElement {
  // Track page views if cookies handling is enabled
  TrackPageViewIfEnabled();

  const [axiosConfig, setAxiosConfig] = useState({
    headers: {
      "X-api-key": "",
    }
  })

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

  const [igSNPerScore, setIgSNPerScore] = useState<string>("");
  const [igSNPerSNPs, setIgSNPerSNPs] = useState<string[]>([]);


  // ------------------------
  // temporary data, used until backend with live data is allowed to be published
  // Arrays for dropdown menu items
  const geneSegmentItemsArray = ["IGH"];
  const geneDropDownItemsArray = ["IGHV"];


  
  const [subtypeDropDownItemsArray, setSubtypeDropDownItemsArray] = useState<
    string[]
  >(["..."]);
  const [alleleDropDownItemsArray, setAlleleDropDownItemsArray] = useState<
    string[]
  >(["..."]);
  const geneSelectionEndpoint: string = backendAPI + "data/plotoptions/";

  async function getGeneFreqData(allele: string) {
    const alleleFrequenciesEndpoint: string = backendAPI + "data/frequencies/";
    // allele names sometimes contain slashes, which breaks the functionality of the API as it interprets it as a path
    // replace with '&slash&' and replace again with '/' in the api
    allele = allele.replace('/', '&slash&');
    const superpopulationsEndpoint: string =
      alleleFrequenciesEndpoint + "superpopulations/" + allele;

    await axios
      .get(superpopulationsEndpoint, axiosConfig)
      .then((response) => {
        setSuperpopFreqAPIData(response.data);
      })
      .catch((response) => console.log(response.error));

    const populationsEndpoint: string =
      alleleFrequenciesEndpoint + "populations/" + allele;
    await axios
      .get(populationsEndpoint, axiosConfig)
      .then((response) => {
        setPopFreqAPIData(response.data);
      })
      .catch((response) => console.log(response.error));
  }

  async function getGeneIgSNPerData(allele: string) {
    const alleleIgSNPerDataEndpoint: string =
      backendAPI + "data/igsnperdata/" + allele;
    await axios
      .get(alleleIgSNPerDataEndpoint, axiosConfig)
      .then((response) => {
        const responseData: IgSNPerData = response.data;
        if (responseData.igSNPer_score || responseData.igSNPer_score === 0) {
          const scoreString = responseData.igSNPer_score.toString();
          if (scoreString.length === 1) {
            setIgSNPerScore(scoreString + ".0");
          } else {
            setIgSNPerScore(scoreString);
          }
        } else {
          setIgSNPerScore("Missing");
        }
        setIgSNPerSNPs(responseData.igSNPer_SNPs);
      })
      .catch((response) => console.log(response.error));
  }

  // Fetch gene frequency data when allele dropdown changes
  useEffect(() => {
    const tmpAlleleData = {
      'IGHV1-2*02_S4953': 
      {
        'superpopulation':
        [
          {
            "frequency": 0.031073446327683617,
            "n": 22,
            "population": "AFR"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "EUR"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "EAS"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "SAS"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "AMR"
          }
        ],
        'population':
        [
          {
            "frequency": 0.0379746835443038,
            "n": 3,
            "population": "ACB"
          },
          {
            "frequency": 0.03225806451612903,
            "n": 2,
            "population": "ASW"
          },
          {
            "frequency": 0.035398230088495575,
            "n": 4,
            "population": "ESN"
          },
          {
            "frequency": 0.008403361344537815,
            "n": 1,
            "population": "GWD"
          },
          {
            "frequency": 0.01680672268907563,
            "n": 2,
            "population": "LWK"
          },
          {
            "frequency": 0.02040816326530612,
            "n": 2,
            "population": "MSL"
          },
          {
            "frequency": 0.06779661016949153,
            "n": 8,
            "population": "YRI"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "FIN"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "GBR"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "IBS"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "TSI"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "CDX"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "CHB"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "CHS"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "JPT"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "KHV"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "BEB"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "GIH"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "ITU"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "PJL"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "STU"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "CLM"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "MXL"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "PEL"
          },
          {
            "frequency": 0.0,
            "n": 0,
            "population": "PUR"
          }
        ],
        'SNPscore': "0.0",
        'SNPsnips': [
          "rs373342578(T:261,106452929)"
        ],
      },
      'IGHV1-2*04':
      {
        'superpopulation':
        [
          {
            "frequency": 0.211864406779661,
            "n": 150,
            "population": "AFR"
          },
          {
            "frequency": 0.5942028985507246,
            "n": 246,
            "population": "EUR"
          },
          {
            "frequency": 0.40925925925925927,
            "n": 221,
            "population": "EAS"
          },
          {
            "frequency": 0.387037037037037,
            "n": 209,
            "population": "SAS"
          },
          {
            "frequency": 0.4142857142857143,
            "n": 116,
            "population": "AMR"
          }
        ],
        'population':
        [
          {
            "frequency": 0.12658227848101267,
            "n": 10,
            "population": "ACB"
          },
          {
            "frequency": 0.3387096774193548,
            "n": 21,
            "population": "ASW"
          },
          {
            "frequency": 0.1592920353982301,
            "n": 18,
            "population": "ESN"
          },
          {
            "frequency": 0.29411764705882354,
            "n": 35,
            "population": "GWD"
          },
          {
            "frequency": 0.2689075630252101,
            "n": 32,
            "population": "LWK"
          },
          {
            "frequency": 0.1836734693877551,
            "n": 18,
            "population": "MSL"
          },
          {
            "frequency": 0.13559322033898305,
            "n": 16,
            "population": "YRI"
          },
          {
            "frequency": 0.65,
            "n": 65,
            "population": "FIN"
          },
          {
            "frequency": 0.7722772277227723,
            "n": 78,
            "population": "GBR"
          },
          {
            "frequency": 0.40404040404040403,
            "n": 40,
            "population": "IBS"
          },
          {
            "frequency": 0.5526315789473685,
            "n": 63,
            "population": "TSI"
          },
          {
            "frequency": 0.44,
            "n": 55,
            "population": "CDX"
          },
          {
            "frequency": 0.36363636363636365,
            "n": 40,
            "population": "CHB"
          },
          {
            "frequency": 0.43,
            "n": 43,
            "population": "CHS"
          },
          {
            "frequency": 0.4,
            "n": 42,
            "population": "JPT"
          },
          {
            "frequency": 0.41,
            "n": 41,
            "population": "KHV"
          },
          {
            "frequency": 0.4077669902912621,
            "n": 42,
            "population": "BEB"
          },
          {
            "frequency": 0.5504587155963303,
            "n": 60,
            "population": "GIH"
          },
          {
            "frequency": 0.4732142857142857,
            "n": 53,
            "population": "ITU"
          },
          {
            "frequency": 0.28703703703703703,
            "n": 31,
            "population": "PJL"
          },
          {
            "frequency": 0.21296296296296297,
            "n": 23,
            "population": "STU"
          },
          {
            "frequency": 0.5142857142857142,
            "n": 36,
            "population": "CLM"
          },
          {
            "frequency": 0.44285714285714284,
            "n": 31,
            "population": "MXL"
          },
          {
            "frequency": 0.4142857142857143,
            "n": 29,
            "population": "PEL"
          },
          {
            "frequency": 0.2857142857142857,
            "n": 20,
            "population": "PUR"
          }
        ],
        'SNPscore': "0.0",
        'SNPsnips': [
          "rs112806369(A:98,106452766)"
        ],
      },
      'IGHV1-2*06':
      {
        'superpopulation':
        [
          {
            "frequency": 0.211864406779661,
            "n": 150,
            "population": "AFR"
          },
          {
            "frequency": 0.1473429951690821,
            "n": 61,
            "population": "EUR"
          },
          {
            "frequency": 0.07962962962962963,
            "n": 43,
            "population": "EAS"
          },
          {
            "frequency": 0.21851851851851853,
            "n": 118,
            "population": "SAS"
          },
          {
            "frequency": 0.16428571428571428,
            "n": 46,
            "population": "AMR"
          }
        ],
        'population':
        [
          {
            "frequency": 0.0759493670886076,
            "n": 6,
            "population": "ACB"
          },
          {
            "frequency": 0.1774193548387097,
            "n": 11,
            "population": "ASW"
          },
          {
            "frequency": 0.20353982300884957,
            "n": 23,
            "population": "ESN"
          },
          {
            "frequency": 0.2689075630252101,
            "n": 32,
            "population": "GWD"
          },
          {
            "frequency": 0.17647058823529413,
            "n": 21,
            "population": "LWK"
          },
          {
            "frequency": 0.3163265306122449,
            "n": 31,
            "population": "MSL"
          },
          {
            "frequency": 0.22033898305084745,
            "n": 26,
            "population": "YRI"
          },
          {
            "frequency": 0.16,
            "n": 16,
            "population": "FIN"
          },
          {
            "frequency": 0.1782178217821782,
            "n": 18,
            "population": "GBR"
          },
          {
            "frequency": 0.16161616161616163,
            "n": 16,
            "population": "IBS"
          },
          {
            "frequency": 0.09649122807017543,
            "n": 11,
            "population": "TSI"
          },
          {
            "frequency": 0.048,
            "n": 6,
            "population": "CDX"
          },
          {
            "frequency": 0.07272727272727272,
            "n": 8,
            "population": "CHB"
          },
          {
            "frequency": 0.03,
            "n": 3,
            "population": "CHS"
          },
          {
            "frequency": 0.18095238095238095,
            "n": 19,
            "population": "JPT"
          },
          {
            "frequency": 0.07,
            "n": 7,
            "population": "KHV"
          },
          {
            "frequency": 0.21359223300970873,
            "n": 22,
            "population": "BEB"
          },
          {
            "frequency": 0.3302752293577982,
            "n": 36,
            "population": "GIH"
          },
          {
            "frequency": 0.32142857142857145,
            "n": 36,
            "population": "ITU"
          },
          {
            "frequency": 0.08333333333333333,
            "n": 9,
            "population": "PJL"
          },
          {
            "frequency": 0.1388888888888889,
            "n": 15,
            "population": "STU"
          },
          {
            "frequency": 0.2857142857142857,
            "n": 20,
            "population": "CLM"
          },
          {
            "frequency": 0.11428571428571428,
            "n": 8,
            "population": "MXL"
          },
          {
            "frequency": 0.12857142857142856,
            "n": 9,
            "population": "PEL"
          },
          {
            "frequency": 0.12857142857142856,
            "n": 9,
            "population": "PUR"
          }
        ],
        'SNPscore': "0.0",
        'SNPsnips': [
          "rs1065059(G:149,106452817)"
        ],
      }
    }
    if (currentPicks.alleleDropdown && !hasCookie('password')) {
      const fullAlleleStr = 
        currentPicks.geneDropdown +
        currentPicks.subtypeDropdown +
        currentPicks.alleleDropdown;
      const strToKey = fullAlleleStr as keyof typeof tmpAlleleData;
      setSuperpopFreqAPIData(tmpAlleleData[strToKey].superpopulation);
      setPopFreqAPIData(tmpAlleleData[strToKey].population);
      setIgSNPerScore(tmpAlleleData[strToKey].SNPscore);
      setIgSNPerSNPs(tmpAlleleData[strToKey].SNPsnips);
    } else {
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
    }
  }, [
    currentPicks.geneDropdown, 
    currentPicks.alleleDropdown,
    currentPicks.subtypeDropdown,
  ]);

  useEffect(() => {
    if (!currentPicks.alleleDropdown) {
      setIgSNPerScore("");
      setIgSNPerSNPs([]);
    }
  }, [
    currentPicks.geneSegmentDropdown,
    currentPicks.geneDropdown,
    currentPicks.subtypeDropdown,
    currentPicks.alleleDropdown
  ]);

  // fetch region data (which subpopulation belongs to which superpopulation)
  // either on page load or when currentPicks is changed
  // (should be on page load, but seemed a bit slow or unresponsive sometimes
  // so added currentPicks for safety)
  useEffect(() => {
    const populationRegionsData = [
      {
        "population": "ACB",
        "superpopulation": "AFR"
      },
      {
        "population": "ASW",
        "superpopulation": "AFR"
      },
      {
        "population": "BEB",
        "superpopulation": "SAS"
      },
      {
        "population": "PJL",
        "superpopulation": "SAS"
      },
      {
        "population": "STU",
        "superpopulation": "SAS"
      },
      {
        "population": "ITU",
        "superpopulation": "SAS"
      },
      {
        "population": "GIH",
        "superpopulation": "SAS"
      },
      {
        "population": "CDX",
        "superpopulation": "EAS"
      },
      {
        "population": "CHS",
        "superpopulation": "EAS"
      },
      {
        "population": "KHV",
        "superpopulation": "EAS"
      },
      {
        "population": "CHB",
        "superpopulation": "EAS"
      },
      {
        "population": "JPT",
        "superpopulation": "EAS"
      },
      {
        "population": "CLM",
        "superpopulation": "AMR"
      },
      {
        "population": "ESN",
        "superpopulation": "AFR"
      },
      {
        "population": "GWD",
        "superpopulation": "AFR"
      },
      {
        "population": "MSL",
        "superpopulation": "AFR"
      },
      {
        "population": "YRI",
        "superpopulation": "AFR"
      },
      {
        "population": "FIN",
        "superpopulation": "EUR"
      },
      {
        "population": "GBR",
        "superpopulation": "EUR"
      },
      {
        "population": "IBS",
        "superpopulation": "EUR"
      },
      {
        "population": "LWK",
        "superpopulation": "AFR"
      },
      {
        "population": "TSI",
        "superpopulation": "EUR"
      },
      {
        "population": "MXL",
        "superpopulation": "AMR"
      },
      {
        "population": "PEL",
        "superpopulation": "AMR"
      },
      {
        "population": "PUR",
        "superpopulation": "AMR"
      }
    ]
    setSuperpopulationRegions(populationRegionsData);
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

  useEffect(() => {
    if (!hasCookie('password')) {
      setSubtypeDropDownItemsArray(['1-2']);
      setAlleleDropDownItemsArray([
        '*02_S4953',
        '*04',
        '*06'
      ])
    }
    else {
      if (!currentPicks.subtypeDropdown) {
        setAlleleDropDownItemsArray(["..."]);
        const currentSelection = currentPicks.geneDropdown;
        axios
          .get(geneSelectionEndpoint + currentSelection, axiosConfig)
          .then((response) => {
            const responseData = response.data;
            //  responseData.push("...");
            setSubtypeDropDownItemsArray(responseData);
          })
          .catch((response) => console.log(response.error));
      } else {
        const currentSelection =
          currentPicks.geneDropdown + currentPicks.subtypeDropdown + "*";
        setAlleleDropDownItemsArray([]);
        axios
          .get(geneSelectionEndpoint + currentSelection, axiosConfig)
          .then((response) => {
            const responseData = response.data;
            // responseData.push("...");
            setAlleleDropDownItemsArray(responseData);
          })
          .catch((response) => console.log(response.error));
      }
    }
  }, [currentPicks.geneDropdown, currentPicks.subtypeDropdown]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDisclaimerPopupOpen, setIsDisclaimerPopupOpen] = useState(true);

  // check on page load if password cookie has been set yet, and if it has add to axios headers for all requests to backend
  useEffect(() => {
    if (hasCookie('password')) {
      setAxiosConfig({
        headers: {
            'X-api-key': getCookie('password') as string,
        }
      })
    }
  }, [])

  // Render the component
  return (
    <>
      <div className={BODY_CLASSES}>
        <h1 className={H_1}>Generate population frequency plots</h1>

        <button
          className="bg-warning text-warning-content text-base lg:text-lg flex gap-2 justify-center items-center px-4 order-first lg:px-0 w-full h-12 font-bold rounded-3xl shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:opacity-90"
          onClick={() => setIsDisclaimerPopupOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Disclaimer
        </button>
        {!hasCookie('password') && isDisclaimerPopupOpen && (
          <DisclaimerPopupComponent
            onClose={() => setIsDisclaimerPopupOpen(false)}
            explanation="This page is fully developed and allows you to explore its
                      design and functionality. However, the underlying data has
                      not been officially published yet. Therefore, we can currently only showcase three plots for demonstration purposes."
          />
        )}

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
            This page allows users to generate population frequency plots for
            the KI Adaptive Immune Receptor Gene Variant Atlas. You can select
            from various dropdowns to filter by gene segment, gene type, gene,
            and allele. The page features associated SNPs and SNiPer scores.
          </span>
        </div>
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
            <DropdownComponent
              menuName="Allele"
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
          <p className="text-neutral-content text-lg lg:text-xl font-semibold lg:w-1/8">
            IgSNPer SCORE: {igSNPerScore}
          </p>
          <div className="overflow-x-auto lg:w-2/4">
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
                    {igSNPerSNPs.map((value) => {
                      return (
                        <tr key={value}>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            {value}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="lg:w-1/8"></div>
          <button
            className="bg-gradient-to-r from-[rgba(4,92,100,0.7)] to-primary text-primary-content text-base lg:text-lg flex gap-2 justify-center items-center px-4 order-first lg:order-4 lg:px-0 lg:w-1/4 h-12 font-bold rounded-3xl shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:opacity-90"
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
          <AbbreviationPopupComponent onClose={() => setIsPopupOpen(false)} />
        )}
      </div>
    </>
  );
}
