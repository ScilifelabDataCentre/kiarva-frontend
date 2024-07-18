// set up plotly with TypeScript: 
// https://stackoverflow.com/a/70807520 + 
// https://community.plotly.com/t/how-to-initiate-and-build-a-plotly-js-project-using-vite/65701/4
import Plotly, { Datum, Layout } from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import { IGeneFrequencyData, IPopulationRegion, ISuperpopulationColors } from '../interfaces/types';
import { ReactElement } from "react";
import worldMap from '../assets/images/worldMap.png';
const Plot = createPlotlyComponent(Plotly);

export default function FrequencyPlotComponent(prop: { 
    superpopulationAPIData: IGeneFrequencyData[], 
    superpopulationColors: ISuperpopulationColors,
    populationAPIData: IGeneFrequencyData[], 
    populationColors: string[],
    superpopulationRegions: IPopulationRegion[]
    }): ReactElement {
    
    function generateTraces(data: IGeneFrequencyData[], superpopulationsColor: ISuperpopulationColors, plotPosition: number, superpopulationRegions: IPopulationRegion[]): Plotly.Data[] {
        let regions: string[] = [];
        let frequencies: Number[] = [];
        let counts: Number[] = [];
        let superpopulationRegion: string[] = [];
        let colors: string[] = [];
        let JSONObj: IGeneFrequencyData;
        for (JSONObj of data) {
            regions.push(JSONObj['population']);
            frequencies.push(JSONObj['frequency']);
            counts.push(JSONObj['n']);
            let regionObj: IPopulationRegion;
            for (regionObj of superpopulationRegions) {
                if (regionObj['population'] === JSONObj['population'] || regionObj['superpopulation'] === JSONObj['population']) {
                    superpopulationRegion.push(regionObj['superpopulation']);
                    colors.push(superpopulationsColor[regionObj['superpopulation'] as keyof typeof superpopulationsColor])
                    break;
                }
            }
        }
    
        let traces: Plotly.Data[] = [];

        let showLegend = plotPosition === 1;
    
        for (let i = 0; i < regions.length; i++) {
            traces.push(
                {
                x: [regions[i]] as Datum[],
                y: [frequencies[i]] as Datum[],
                xaxis: 'x'+plotPosition,
                showlegend: showLegend,
                type: 'bar',
                legendgroup: superpopulationRegion[i],
                name: superpopulationRegion[i],
                text: 'n = ' + counts[i].toString(),
                marker:{
                    color: [colors[i%colors.length] as any]
                },
                },
            );
        }

        return traces;
    }

    let superpopulationTraces: Plotly.Data[] = generateTraces(prop.superpopulationAPIData, prop.superpopulationColors, 1, prop.superpopulationRegions);

    let populationTraces: Plotly.Data[] = generateTraces(prop.populationAPIData, prop.superpopulationColors, 2, prop.superpopulationRegions);

    let data = [...superpopulationTraces, ...populationTraces];

    const layout: Partial<Layout> = {
        height: 500,
        width: 1250,
        xaxis: {
            showticklabels: false
        },
        // xaxis2: {
        //     title: {
        //         text: '<b>Population</b>', 
        //         font: {
        //             size: 18
        //         }
        //     },
        // },
        paper_bgcolor: '#f8fafc',
        plot_bgcolor: '#f8fafc',
        yaxis: {side: 'left', title: 'Allele Frequency', titlefont: {size: 16}},
        showlegend: true,
        legend: {
            // title: {
            //     text: '<b>Superpopulation</b>', 
            //     font: {
            //         size: 18
            //     },
            // },
            x: 0.08,
            y: -0.11,
            orientation: 'h',
        },
        margin: {l: 100, r: 40, b: 40, t: 30, pad: 1},
        grid: {rows: 1, columns: 2},
    };

    // const populationsLayout: Partial<Layout> = {
    //     xaxis: {title: '<b>Population<b>'},
    //     paper_bgcolor: '#f8fafc',
    //     plot_bgcolor: '#f8fafc',
    //     yaxis: {side: 'left', title: 'Allele Frequency', titlefont: {size: 15}},
    //     showlegend: false,
    //     margin: {l: 100, r: 40, b: 75, t: 30, pad: 1},
    // };

    return (
        <div className="relative bg-base-100 -mx-24">
            <div className="flex flex-row items-center justify-center relative">
                <Plot data={data} layout={layout} />
                <div className="absolute -bottom-6">
                    <div className="flex flex-row text-neutral-content justify-between pl-8">
                        <h1 className='text-2xl'><b>Superpopulation</b></h1>
                        <h1 className='pl-[440px] text-2xl'><b>Population</b></h1>
                    </div>
                </div>
            </div>
            <img
                className="absolute inset-0 h-full w-full object-cover opacity-25"
                src={worldMap}
                alt="World Map"
            />
        </div>
    );
}