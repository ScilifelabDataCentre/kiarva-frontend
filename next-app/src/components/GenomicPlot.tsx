"use client";

import { ReactElement, useEffect, useState } from "react";
import { axiosConfig, backendAPI } from "@/constants";
import FrequencyPlotComponent from "@/components/FrequencyPlotComponent";
import {
  IGeneFrequencyData,
  IPopulationRegion,
} from "@/interfaces/types";
import axios from "axios";
import {
  populationSubsets,
  subPopulations,
  superPopulationColorsDict,
  superPopulations,
} from "@/content/localPlotData";


// Main function to render the PlotPage component
export default function GenomicPlot(prop: { selectedAllele: string }): ReactElement {
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

  async function getGeneFreqData(allele: string) {
    const encodedAllele = encodeURIComponent(allele);
    const alleleFrequenciesEndpoint: string = backendAPI + "data/frequencies/";

    const superpopulationsEndpoint: string =
      alleleFrequenciesEndpoint +
      "superpopulations?allele_name=" +
      encodedAllele;

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

  // Fetch gene frequency data when allele dropdown changes
  useEffect(() => {
    if (prop.selectedAllele) {
      const selectedAllele = prop.selectedAllele;
      getGeneFreqData(selectedAllele);
    } else {
      setSuperpopFreqAPIData([]);
      setPopFreqAPIData([]);
    }
  }, [prop.selectedAllele]);

  // fetch region data (which subpopulation belongs to which superpopulation)
  // either on page load or when currentPicks is changed
  // (should be on page load, but seemed a bit slow or unresponsive sometimes
  // so added currentPicks for safety)
  useEffect(() => {
    setSuperpopulationRegions(populationSubsets);
  }, []);

  // Render the component
  return (
    <>
      <FrequencyPlotComponent
        superpopulationAPIData={superpopFreqAPIData}
        superpopulationColors={superPopulationColorsDict}
        populationAPIData={popFreqAPIData}
        superpopulationRegions={superpopulationRegions}
      />
    </>
  );
}
