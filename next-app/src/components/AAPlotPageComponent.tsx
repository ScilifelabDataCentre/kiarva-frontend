// split out API calls and UI into separate server and client components? Should be doable, but could be
// a bit complicated.

"use client";

import { ReactElement, useCallback, useEffect, useState } from "react";
import { backendAPI } from "@/constants";
import FrequencyPlotComponent from "@/components/FrequencyPlotComponent";
import {
  IGeneFrequencyData,
  AlleleListAA,
  IPopulationRegion,
  IAlleleDropDownConfig,
} from "@/interfaces/types";
import axios from "axios";
import AbbreviationPopupComponent from "@/components/AbbreviationPopupComponent";
import AlelleSelectionComponent from "./AlleleSelectionComponent";
import {
  populationSubsets,
  subPopulations,
  superPopulationColorsDict,
  superPopulations,
} from "@/content/localPlotData";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

// Main function to render the PlotPage component
export default function AminoAcidPlotPage(): ReactElement {
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

  const [alleleListAA, setAlleleListAA] = useState<string[]>([]);

  // config for AlleleSelectionComponent which sets up the allele segment dropdown menu
  const alleleDropdownConfig: IAlleleDropDownConfig = {
    geneSegmentItemsArray: ["IGH"],
    geneDropDownItemsArray: ["IGHV"],
    geneSelectionEndpoint: backendAPI + "data/plotoptions?current_selection=",
  };

  const [selectedAllele, setSelectedAllele] = useState<string>("");
  const [topAlleleAA, setTopAlleleAA] = useState<string>("");

  async function getTopLevelAlleleAA(allele: string) {
    const encodedAllele = encodeURIComponent(allele);
    const topAlleleAAEndpoint: string =
      backendAPI + "/data/aminoacidalleles?aa_allele_name=" + encodedAllele;

    await axios
      .get(topAlleleAAEndpoint)
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
      .get(superpopulationsEndpoint)
      .then((response) => {
        setSuperpopFreqAPIData(response.data);
      })
      .catch((response) => console.log(response.error));

    const populationsEndpoint: string =
      alleleFrequenciesEndpoint + "populations?aa_allele_name=" + encodedAllele;

    await axios
      .get(populationsEndpoint)
      .then((response) => {
        setPopFreqAPIData(response.data);
      })
      .catch((response) => console.log(response.error));
  }

  async function getAlleleListAA(allele: string) {
    const encodedAllele = encodeURIComponent(allele);
    const alleleListAADataEndpoint: string =
      backendAPI + "data/aminoacidlist?aa_allele_name=" + encodedAllele;

    await axios
      .get(alleleListAADataEndpoint)
      .then((response) => {
        const responseData: AlleleListAA = response.data;
        if (responseData.aa_allele_list) {
          setAlleleListAA(responseData.aa_allele_list);
        }
      })
      .catch((response) => console.log(response.error));
  }

  useEffect(() => {
    if (selectedAllele) {
      getTopLevelAlleleAA(selectedAllele);
    }
  }, [selectedAllele]);

  // Fetch gene frequency data when allele dropdown changes
  useEffect(() => {
    if (topAlleleAA) {
      getGeneFreqData(topAlleleAA);
      getAlleleListAA(topAlleleAA);
    } else {
      setSuperpopFreqAPIData([]);
      setPopFreqAPIData([]);
      setAlleleListAA([]);
    }
  }, [topAlleleAA]);

  // fetch region data (which subpopulation belongs to which superpopulation)
  // either on page load or when currentPicks is changed
  // (should be on page load, but seemed a bit slow or unresponsive sometimes
  // so added currentPicks for safety)
  useEffect(() => {
    setSuperpopulationRegions(populationSubsets);
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // function to be passed as prop to AlleleSelectionComponent, so that it can modify
  // state in parent component
  const handleSetSelection = useCallback((allele: string) => {
    setSelectedAllele(allele);
  }, []);

  // Render the component
  return (
    <>
      <section
        aria-labelledby="alleles-table-heading"
        className="flex flex-col lg:flex-row items-start justify-between pb-8 gap-4"
      >
        <h2 id="alleles-table-heading" className="sr-only">
          Alleles translating to the same amino acid
        </h2>
        <div className="overflow-x-auto lg:w-2/4">
          <div className="min-w-full inline-block align-middle">
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-neutral text-base-content">
                <caption className="sr-only">
                  List of alleles that translate to the same amino acid sequence
                </caption>
                <thead className="bg-neutral">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-lg lg:text-xl font-semibold"
                    >
                      Alleles translating to the same amino acid
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral text-base lg:text-lg">
                  {alleleListAA.map((value) => {
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
        <div className="lg:w-1/8" aria-hidden="true"></div>
        <Button
          variant="default"
          size="lg"
          className="order-first lg:order-4"
          onClick={() => setIsPopupOpen(true)}
          aria-label="View population abbreviations"
        >
          <Info aria-hidden="true" />
          Population abbreviations
        </Button>
      </section>
      {isPopupOpen && (
        <AbbreviationPopupComponent onClose={() => setIsPopupOpen(false)} />
      )}
      <section aria-labelledby="allele-selection-heading">
        <h2 id="allele-selection-heading" className="sr-only">
          Allele selection
        </h2>
        <AlelleSelectionComponent
          alleleSelectionConfig={alleleDropdownConfig}
          handleSetSelection={handleSetSelection}
          plotType={"aminoAcidFreqPlot"}
        />
      </section>
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
