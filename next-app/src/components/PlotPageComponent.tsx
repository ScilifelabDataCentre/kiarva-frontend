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
  IAlleleDropDownConfig,
  IGeneFrequencyData,
  IgSNPerData,
  IPopulationRegion,
} from "@/interfaces/types";
import axios from "axios";
import AbbreviationPopupComponent from "@/components/AbbreviationPopupComponent";
import DisclaimerPopupComponent from "@/components/DisclaimerPopupComponent";
import { getCookie, hasCookie } from "cookies-next";
import AlelleSelectionComponent from "./AlleleSelectionComponent";
import { populationSubsets, sampleAlleleDataGenomicPlot, subPopulations, superPopulationColorsDict, superPopulations } from "@/content/localPlotData";

// Main function to render the PlotPage component
export default function PlotPage(): ReactElement {
  // Track page views if cookies handling is enabled
  TrackPageViewIfEnabled();

  const [axiosConfig, setAxiosConfig] = useState({
    headers: {
      "X-api-key": "",
    }
  })

  // Initialize superpopulation frequency data with zero values
  const superpopFreqDataNoSelection: IGeneFrequencyData[] = [];
  for (let i = 0; i < superPopulations.length; i++) {
    superpopFreqDataNoSelection.push({
      frequency: 0,
      n: 0,
      population: superPopulations[i],
    });
  }

  // Initialize population frequency data with zero values
  const popFreqDataNoSelection: IGeneFrequencyData[] = [];
  for (let i = 0; i < subPopulations.length; i++) {
    popFreqDataNoSelection.push({
      frequency: 0,
      n: 0,
      population: subPopulations[i],
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

  const [igSNPerScore, setIgSNPerScore] = useState<string>("");
  const [igSNPerSNPs, setIgSNPerSNPs] = useState<string[]>([]);


  // config for AlleleSelectionComponent which sets up the allele segment dropdown menu
  const alleleDropdownConfig: IAlleleDropDownConfig = {
    'geneSegmentItemsArray': ["IGH"],
    'geneDropDownItemsArray': ["IGHV"],
    'geneSelectionEndpoint': backendAPI + "data/plotoptions/"
  }

  const [selectedAllele, setSelectedAllele] = useState<string>("");

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
    if (selectedAllele) {
      if (!hasCookie('password')) {
        const strToKey = selectedAllele as keyof typeof sampleAlleleDataGenomicPlot;
        setSuperpopFreqAPIData(sampleAlleleDataGenomicPlot[strToKey].superpopulation);
        setPopFreqAPIData(sampleAlleleDataGenomicPlot[strToKey].population);
        setIgSNPerScore(sampleAlleleDataGenomicPlot[strToKey].SNPscore);
        setIgSNPerSNPs(sampleAlleleDataGenomicPlot[strToKey].SNPsnips);
      }
      else {
        getGeneFreqData(selectedAllele);
        getGeneIgSNPerData(selectedAllele);
      }
    }
  }, [
    selectedAllele
  ]);

  useEffect(() => {
    if (!selectedAllele) {
      setIgSNPerScore("");
      setIgSNPerSNPs([]);
    }
  }, [
    selectedAllele
  ]);

  // fetch region data (which subpopulation belongs to which superpopulation)
  // either on page load or when currentPicks is changed
  // (should be on page load, but seemed a bit slow or unresponsive sometimes
  // so added currentPicks for safety)
  useEffect(() => {
    setSuperpopulationRegions(populationSubsets);
  }, []);

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

  // function to be passed as prop to AlleleSelectionComponent, so that it can modify
  // state in parent component
  function handleSetSelection(allele: string) {
    setSelectedAllele(allele);
  }

  // Render the component
  return (
    <>
      <div>
        <AlelleSelectionComponent 
          alleleSelectionConfig={alleleDropdownConfig}
          handleSetSelection={handleSetSelection}
          plotType={"genomicFreqPlot"}
        />
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
