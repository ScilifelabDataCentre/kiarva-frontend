// split out API calls and UI into separate server and client components? Should be doable, but could be
// a bit complicated.

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
export default function AminoAcidPlot(prop: { selectedAllele: string }): ReactElement {
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

  const [topAlleleAA, setTopAlleleAA] = useState<string>("");

  async function getTopLevelAlleleAA(allele: string) {
    const encodedAllele = encodeURIComponent(allele);
    const topAlleleAAEndpoint: string =
      backendAPI + "data/aminoacidalleles?aa_allele_name=" + encodedAllele;

    await axios
      .get(topAlleleAAEndpoint, axiosConfig)
      .then((response) => {
        setTopAlleleAA(response.data.allele_aa);
      })
      .catch((response) => console.log(response.error));
  }

  async function getGeneFreqData(allele: string) {
    const encodedAllele = encodeURIComponent(allele);
    const alleleFrequenciesEndpoint: string =
      backendAPI + "data/aminoacidfrequencies/";

    const superpopulationsEndpoint: string =
      alleleFrequenciesEndpoint +
      "superpopulations?aa_allele_name=" +
      encodedAllele;

    await axios
      .get(superpopulationsEndpoint, axiosConfig)
      .then((response) => {
        setSuperpopFreqAPIData(response.data);
      })
      .catch((response) => console.log(response.error));

    const populationsEndpoint: string =
      alleleFrequenciesEndpoint + "populations?aa_allele_name=" + encodedAllele;

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
      getTopLevelAlleleAA(selectedAllele);
    } else {
      setSuperpopFreqAPIData([]);
      setPopFreqAPIData([]);
    }
  }, [prop.selectedAllele]);

  // Fetch gene frequency data when allele dropdown changes
  useEffect(() => {
    if (topAlleleAA) {
      getGeneFreqData(topAlleleAA);
    } else {
      setSuperpopFreqAPIData([]);
      setPopFreqAPIData([]);
    }
  }, [topAlleleAA]);

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
      <section aria-labelledby="frequency-plot-heading">
        <h2 id="frequency-plot-heading" className="sr-only">
          Population frequency plot
        </h2>
        <FrequencyPlotComponent
          superpopulationAPIData={superpopFreqAPIData}
          superpopulationColors={superPopulationColorsDict}
          populationAPIData={popFreqAPIData}
          superpopulationRegions={superpopulationRegions}
        />
      </section>
    </>
  );
}
