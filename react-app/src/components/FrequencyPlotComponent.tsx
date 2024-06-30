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
    
    function generateTraces(data: IGeneFrequencyData[], colors: string[]): Plotly.Data[] {
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
    
        for (let i = 0; i < regions.length; i++) {
            traces.push(
                {
                x: [regions[i]] as Datum[],
                y: [frequencies[i]] as Datum[],
                type: 'bar',
                name: regions[i],
                text: 'n = ' + counts[i].toString(),
                marker:{
                    color: [colors[i%colors.length] as any]
                },
                },
            );
        }

        return traces;
    }

    let superpopulationTraces: Plotly.Data[] = generateTraces(prop.superpopulationAPIData, prop.superpopulationColors);

    let populationTraces: Plotly.Data[] = generateTraces(prop.populationAPIData, prop.populationColors);

    const superpopulationsLayout: Partial<Layout> = {
        xaxis: {title: '', showticklabels: false},
        paper_bgcolor: '#f8fafc',
        plot_bgcolor: '#f8fafc',
        yaxis: {side: 'left', title: 'Allele Frequency', titlefont: {size: 15}},
        showlegend: true,
        legend: {
            title: {text: "<b>Superpopulation</b>",},
            orientation: 'h',
        },
        margin: {l: 100, r: 40, b: 40, t: 30, pad: 1},
    };
//     plot1 <- plot_ly(df_pops, 
//         type = 'bar', 
//         text = ~value,
//         x = ~population, 
//         y = ~frequency, 
//         color = ~population, 
//         colors = c("#3D8F86")) %>%
// add_text(text=~n, textfont = t, textposition="top center",
//    showlegend = F) %>%
// layout(yaxis = list(side = 'left', title = 'Allele Frequency', size = 10, titlefont = list(size = 15)),
//  xaxis = list(title = '<b>Population<b>'), showlegend = F,
//  margin = list(l=100, r=40, b=40, t=30, pad=1))
    const populationsLayout: Partial<Layout> = {
        xaxis: {title: '<b>Population<b>'},
        paper_bgcolor: '#f8fafc',
        plot_bgcolor: '#f8fafc',
        yaxis: {side: 'left', title: 'Allele Frequency', titlefont: {size: 15}},
        showlegend: false,
        margin: {l: 100, r: 40, b: 75, t: 30, pad: 1},
    };

    return (
        <div className="flex flex-row">
            <Plot data={superpopulationTraces} layout={superpopulationsLayout} />
            <Plot data={populationTraces} layout={populationsLayout} />
        </div>
    );
}