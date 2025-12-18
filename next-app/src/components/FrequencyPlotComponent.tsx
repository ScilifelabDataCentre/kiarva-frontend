// Should probably be looked over and rewritten, but unsure if it can be a server component.
// The plotly library we use is for default react, so possibly needs client behaviour.

"use client";

// set up plotly with TypeScript:
// https://stackoverflow.com/a/70807520 +
// https://community.plotly.com/t/how-to-initiate-and-build-a-plotly-js-project-using-vite/65701/4
import Plotly, { Datum, Layout } from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import {
  IGeneFrequencyData,
  IPlotDimensions,
  IPopulationRegion,
  ISuperpopulationColors,
} from "@/interfaces/types";
import { ReactElement, useEffect, useState } from "react";
const Plot = createPlotlyComponent(Plotly);

const worldMap = "../images/worldMap.png";

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
    const regions: string[] = [];
    const frequencies: number[] = [];
    const counts: number[] = [];
    const superpopulationRegion: string[] = [];
    const colors: string[] = [];
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

    const traces: Plotly.Data[] = [];

    const showLegend = plotPosition === 1;

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
          color: [colors[i % colors.length] as string],
        },
      });
    }

    return traces;
  }

  const superpopulationTraces: Plotly.Data[] = generateTraces(
    prop.superpopulationAPIData,
    prop.superpopulationColors,
    1,
    prop.superpopulationRegions
  );

  const populationTraces: Plotly.Data[] = generateTraces(
    prop.populationAPIData,
    prop.superpopulationColors,
    2,
    prop.superpopulationRegions
  );

  const data = [...superpopulationTraces, ...populationTraces];

  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [plotDimensions, setPlotDimensions] = useState<IPlotDimensions>({height: 500, width: 1250});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 750){
        setIsLargeScreen(false);
      } else {
        setIsLargeScreen(true);
      }
      if (window.innerWidth >= 750 && window.innerWidth < 1000) {
        setPlotDimensions({height: 400, width: 800});
      }
      else if (window.innerWidth < 1280) {
        setPlotDimensions({height: 400, width: 1000});
      }
      else if (window.innerWidth >= 1280) {
        setPlotDimensions({height: 500, width: 1250});
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const layout: Partial<Layout> = {
    height: plotDimensions.height,
    width: plotDimensions.width,
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
      <figure
        className="relative bg-base-100 -mx-24 overflow-hidden"
        aria-label="Population frequency plot"
      >
        <div className="flex flex-row items-center justify-center relative">
          <Plot data={data} layout={layout} />
          <div className="absolute -bottom-6">
            <div className="flex flex-row text-neutral-content justify-between pl-8">
              <h2 className="text-xl font-bold">Superpopulation</h2>
              <h2 className="pl-[440px] text-xl font-bold">Population</h2>
            </div>
          </div>
        </div>
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-25 pointer-events-none"
          src={worldMap}
          alt=""
          aria-hidden="true"
        />
      </figure>
    );
  } else {
    return (
      <aside
        role="alert"
        className="alert alert-error bg-info text-info-content"
        aria-label="Screen size requirement"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p>
          Error: Plots can not be displayed on screens of this size.
          Please resize your browser window to view the plots or use a device with a larger screen.
        </p>
      </aside>
    );
  }
}
