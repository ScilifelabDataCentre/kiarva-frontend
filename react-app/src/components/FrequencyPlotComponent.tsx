// set up plotly with TypeScript:
// https://stackoverflow.com/a/70807520 +
// https://community.plotly.com/t/how-to-initiate-and-build-a-plotly-js-project-using-vite/65701/4
import Plotly, { Datum, Layout } from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import {
  IGeneFrequencyData,
  IPopulationRegion,
  ISuperpopulationColors,
} from "../interfaces/types";
import { ReactElement, useEffect, useState } from "react";
import worldMap from "../assets/images/worldMap.png";
const Plot = createPlotlyComponent(Plotly);

export default function FrequencyPlotComponent(prop: {
  superpopulationAPIData: IGeneFrequencyData[];
  superpopulationColors: ISuperpopulationColors;
  populationAPIData: IGeneFrequencyData[];
  superpopulationRegions: IPopulationRegion[];
}): ReactElement {
  function generateTraces(
    data: IGeneFrequencyData[],
    superpopulationsColor: ISuperpopulationColors,
    plotPosition: number,
    superpopulationRegions: IPopulationRegion[]
  ): Plotly.Data[] {
    let regions: string[] = [];
    let frequencies: Number[] = [];
    let counts: Number[] = [];
    let superpopulationRegion: string[] = [];
    let colors: string[] = [];
    let JSONObj: IGeneFrequencyData;
    for (JSONObj of data) {
      regions.push(JSONObj["population"]);
      frequencies.push(JSONObj["frequency"]);
      counts.push(JSONObj["n"]);
      let regionObj: IPopulationRegion;
      for (regionObj of superpopulationRegions) {
        if (
          regionObj["population"] === JSONObj["population"] ||
          regionObj["superpopulation"] === JSONObj["population"]
        ) {
          superpopulationRegion.push(regionObj["superpopulation"]);
          colors.push(
            superpopulationsColor[
              regionObj["superpopulation"] as keyof typeof superpopulationsColor
            ]
          );
          break;
        }
      }
    }

    let traces: Plotly.Data[] = [];

    let showLegend = plotPosition === 1;

    for (let i = 0; i < regions.length; i++) {
      traces.push({
        x: [regions[i]] as Datum[],
        y: [frequencies[i]] as Datum[],
        xaxis: "x" + plotPosition,
        showlegend: showLegend,
        type: "bar",
        legendgroup: superpopulationRegion[i],
        name: superpopulationRegion[i],
        text: "n = " + counts[i],
        marker: {
          color: [colors[i % colors.length] as any],
        },
      });
    }

    return traces;
  }

  let superpopulationTraces: Plotly.Data[] = generateTraces(
    prop.superpopulationAPIData,
    prop.superpopulationColors,
    1,
    prop.superpopulationRegions
  );

  let populationTraces: Plotly.Data[] = generateTraces(
    prop.populationAPIData,
    prop.superpopulationColors,
    2,
    prop.superpopulationRegions
  );

  let data = [...superpopulationTraces, ...populationTraces];

  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1280);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const layout: Partial<Layout> = {
    height: 500,
    width: 1250,
    xaxis: {
      showticklabels: false,
    },
    paper_bgcolor: "#f8fafc",
    plot_bgcolor: "#f8fafc",
    yaxis: { side: "left", title: "Allele Frequency", titlefont: { size: 16 } },
    showlegend: true,
    legend: {
      x: 0.08,
      y: -0.11,
      orientation: "h",
    },
    margin: { l: 100, r: 40, b: 40, t: 30, pad: 1 },
    grid: { rows: 1, columns: 2 },
  };

  if (isLargeScreen) {
    return (
      <div className="relative bg-base-100 -mx-24 overflow-hidden">
        <div className="flex flex-row items-center justify-center relative">
          <Plot data={data} layout={layout} />
          <div className="absolute -bottom-6">
            <div className="flex flex-row text-neutral-content justify-between pl-8">
              <h1 className="text-xl">
                <b>Superpopulation</b>
              </h1>
              <h1 className="pl-[440px] text-xl">
                <b>Population</b>
              </h1>
            </div>
          </div>
        </div>
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-25 pointer-events-none"
          src={worldMap}
          alt="World Map"
        />
      </div>
    );
  } else {
    return (
      <div role="alert" className="alert alert-error bg-info text-info-content">
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
        <span>
          Error: Plots can only be displayed on a 13-inch screen and bigger.
          Please resize your browser window to view the plots or use a laptop or
          desktop computer.
        </span>
      </div>
    );
  }
}
