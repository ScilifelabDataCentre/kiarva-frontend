// set up plotly with TypeScript: 
// https://stackoverflow.com/a/70807520 + 
// https://community.plotly.com/t/how-to-initiate-and-build-a-plotly-js-project-using-vite/65701/4
import Plotly, { Datum, Layout } from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import { IGeneFrequencyData } from '../interfaces/types';
import { ReactElement } from "react";
const Plot = createPlotlyComponent(Plotly);

export default function FrequencyPlotComponent(prop: { 
    superpopulationAPIData: IGeneFrequencyData[], 
    superpopulationColors: string[],
    populationAPIData: IGeneFrequencyData[], 
    populationColors: string[],
    }): ReactElement {
    
    function generateTraces(data: IGeneFrequencyData[], colors: string[], plotPosition: number): Plotly.Data[] {
        let regions: string[] = [];
        let frequencies: Number[] = [];
        let counts: Number[] = [];
        let JSONObj: IGeneFrequencyData;
        for (JSONObj of data) {
            regions.push(JSONObj['population']);
            frequencies.push(JSONObj['frequency']);
            counts.push(JSONObj['n']);
        }
    
        let traces: Plotly.Data[] = [];

        let showLegend = plotPosition === 1;
        let legendGroupName = "";
    
        for (let i = 0; i < regions.length; i++) {
            legendGroupName = plotPosition === 1 ? regions[i] : "AMR";
            traces.push(
                {
                x: [regions[i]] as Datum[],
                y: [frequencies[i]] as Datum[],
                xaxis: 'x'+plotPosition,
                showlegend: showLegend,
                type: 'bar',
                legendgroup: "group" + i%5,
                name: plotPosition === 1 ? regions[i] : "AMR",
                text: 'n = ' + counts[i].toString(),
                marker:{
                    color: [colors[i%colors.length] as any]
                },
                },
            );
        }

        return traces;
    }

    let superpopulationTraces: Plotly.Data[] = generateTraces(prop.superpopulationAPIData, prop.superpopulationColors, 1);

    let populationTraces: Plotly.Data[] = generateTraces(prop.populationAPIData, prop.populationColors, 2);

    let data = [...superpopulationTraces, ...populationTraces];

    const layout: Partial<Layout> = {
        height: 500,
        width: 1250,
        xaxis: {title: '', showticklabels: false},
        xaxis2: {title: '<b>Population<b>'},
        paper_bgcolor: '#f8fafc',
        plot_bgcolor: '#f8fafc',
        yaxis: {side: 'left', title: 'Allele Frequency', titlefont: {size: 15}},
        showlegend: true,
        legend: {
            title: {text: "<b>Superpopulation</b>",},
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
        <div className="flex flex-row -mx-24 items-center justify-center">
            <Plot data={data} layout={layout} />
            {/* <Plot data={populationTraces} layout={populationsLayout} /> */}
        </div>
    );
}