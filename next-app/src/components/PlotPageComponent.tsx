"use client";

import { ReactElement, useEffect, useState } from "react";
import { backendAPI } from "@/constants";
import FrequencyPlotComponent from "@/components/FrequencyPlotComponent";
import {
  IAlleleDropDownConfig,
  IGeneFrequencyData,
  IgSNPerData,
  IPopulationRegion,
} from "@/interfaces/types";
import axios from "axios";
import AbbreviationPopupComponent from "@/components/AbbreviationPopupComponent";
import { getCookie, hasCookie } from "cookies-next";
import AlelleSelectionComponent from "./AlleleSelectionComponent";
import {
  populationSubsets,
  sampleAlleleDataGenomicPlot,
  subPopulations,
  superPopulationColorsDict,
  superPopulations,
} from "@/content/localPlotData";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

// Main function to render the PlotPage component
export default function PlotPage(): ReactElement {
  const [axiosConfig, setAxiosConfig] = useState({
    headers: {
      "X-api-key": "",
    },
  });

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
    geneSegmentItemsArray: ["IGH"],
    geneDropDownItemsArray: ["IGHV"],
    geneSelectionEndpoint: backendAPI + "data/plotoptions?current_selection=",
  };

  const [selectedAllele, setSelectedAllele] = useState<string>("");

  async function getGeneFreqData(allele: string) {
    const encodedAllele = encodeURIComponent(allele)
    const alleleFrequenciesEndpoint: string = backendAPI + "data/frequencies/";

    const superpopulationsEndpoint: string =
      alleleFrequenciesEndpoint + "superpopulations?allele_name=" + encodedAllele;

    await axios
      .get(superpopulationsEndpoint, axiosConfig)
      .then((response) => {
        setSuperpopFreqAPIData(response.data);
      })
      .catch((response) => console.log(response.error));

    const populationsEndpoint: string =
      alleleFrequenciesEndpoint + "populations?allele_name=" + encodedAllele;

    await axios
      .get(populationsEndpoint, axiosConfig)
      .then((response) => {
        setPopFreqAPIData(response.data);
      })
      .catch((response) => console.log(response.error));
  }

  async function getGeneIgSNPerData(allele: string) {

    const encodedAllele = encodeURIComponent(allele)

    const alleleIgSNPerDataEndpoint: string =
      backendAPI + "data/igsnperdata?allele_name=" + encodedAllele;

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
      if (!hasCookie("password")) {
        const selectedAlleleTmp = selectedAllele.replace("*", "");
        const strToKey =
          selectedAlleleTmp as keyof typeof sampleAlleleDataGenomicPlot;
        setSuperpopFreqAPIData(
          sampleAlleleDataGenomicPlot[strToKey].superpopulation
        );
        setPopFreqAPIData(sampleAlleleDataGenomicPlot[strToKey].population);
        setIgSNPerScore(sampleAlleleDataGenomicPlot[strToKey].SNPscore);
        setIgSNPerSNPs(sampleAlleleDataGenomicPlot[strToKey].SNPsnips);
      } else {
        getGeneFreqData(selectedAllele);
        getGeneIgSNPerData(selectedAllele);
      }
    } else {
      setSuperpopFreqAPIData([]);
      setPopFreqAPIData([]);
      setIgSNPerScore("");
      setIgSNPerSNPs([]);
    }
  }, [selectedAllele]);

  // fetch region data (which subpopulation belongs to which superpopulation)
  // either on page load or when currentPicks is changed
  // (should be on page load, but seemed a bit slow or unresponsive sometimes
  // so added currentPicks for safety)
  useEffect(() => {
    setSuperpopulationRegions(populationSubsets);
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  // function to be passed as prop to AlleleSelectionComponent, so that it can modify
  // state in parent component
  function handleSetSelection(allele: string) {
    setSelectedAllele(allele);
  }

  // Render the component
  return (
    <>
      <div>
        <div className="flex flex-col lg:flex-row items-start justify-between pb-8 gap-4">
          <p className="text-neutral-content text-lg lg:text-xl font-semibold lg:w-1/8 pt-2">
            IgSNPer SCORE: {igSNPerScore}
          </p>
          <div className="overflow-x-auto lg:w-2/4">
            <div className="min-w-full inline-block align-middle">
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
          <Button
            variant="default"
            size="lg"
            className="order-first lg:order-4"
            onClick={() => setIsPopupOpen(true)}
          >
            <Info />
            Population abbreviations
          </Button>
        </div>
        {isPopupOpen && (
          <AbbreviationPopupComponent onClose={() => setIsPopupOpen(false)} />
        )}
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
      </div>
    </>
  );
}
