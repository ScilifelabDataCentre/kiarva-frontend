// set up plotly with TypeScript: 
// https://stackoverflow.com/a/70807520 + 
// https://community.plotly.com/t/how-to-initiate-and-build-a-plotly-js-project-using-vite/65701/4
import Plotly, { Datum, Layout } from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import { IGeneFrequencyData } from '../interfaces/types';
import { ReactElement } from "react";
const Plot = createPlotlyComponent(Plotly);

export default function FrequencyPlotComponent(prop: { plotName: String, geneAPIData: IGeneFrequencyData[], barColors: String[] }): ReactElement {
    

    let genePopulations:  String[] = [];
    let geneFrequencies: Number[] = [];
    let geneCounts: Number[] = [];
    let JSONObj: IGeneFrequencyData;
    for (JSONObj of prop.geneAPIData) {
        genePopulations.push(JSONObj['population']);
        geneFrequencies.push(JSONObj['frequency']);
        geneCounts.push(JSONObj['n']);
    }

    let traces: Plotly.Data[] = [];

    for (let i = 0; i < genePopulations.length; i++) {
        traces.push(
            {
            x: [genePopulations[i]] as Datum[],
            y: [geneFrequencies[i]] as Datum[],
            type: 'bar',
            name: genePopulations[i] as string,
            marker:{
                color: [prop.barColors[i%prop.barColors.length] as any]
            },
            },
        );
    }   
        
    const data: Plotly.Data[] = traces;

    const layout: Partial<Layout> = {
        xaxis: {title: '', showticklabels: false},
        paper_bgcolor: '#f8fafc',
        plot_bgcolor: '#f8fafc',
        yaxis: {side: 'left', title: 'Frequency', titlefont: {size: 15}},
        showlegend: true,
        legend: {
            title: {text: "<b>"+prop.plotName+"</b>",},
            orientation: 'h',
        },
        margin: {l: 100, r: 40, b: 40, t: 30, pad: 1},
    };

    return (
        <>
            <Plot data={data} layout={layout} />
        </>
    );
}