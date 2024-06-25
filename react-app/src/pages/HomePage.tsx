import { ReactElement, useEffect, useState } from 'react';
import { BODY_CLASSES, 
        // BUTTON_TYPE_ONE, 
        // H_1
    } from '../constants';
import { TrackPageViewIfEnabled } from '../util/cookiesHandling';

// set up plotly with TypeScript: 
// https://stackoverflow.com/a/70807520 + 
// https://community.plotly.com/t/how-to-initiate-and-build-a-plotly-js-project-using-vite/65701/4
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

export default function HomePage(): ReactElement {

    TrackPageViewIfEnabled();

    const [currentGene, setCurrentGene] = useState<string>("");
    const [currentSegment, setCurrentSegment] = useState<string>("");
    const [currentSubtype, setCurrentSubtype] = useState<string>("");
    const [currentAllele, setCurrentAllele] = useState<string>("");

    const [test, setTest] = useState<string>("nuthin'");

    useEffect(() =>{
        if (currentGene + currentSegment + currentSubtype + currentAllele) {
            setTest(currentGene + currentSegment + currentSubtype + currentAllele);
        }
    }, [currentGene, currentSegment, currentSubtype, currentAllele]);

    const data = [
        {
          x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          mode: "lines",
        },
      ];
    const layout = { title: "Chart Title" };

    return (
        <div>
            <div className={BODY_CLASSES}>
                <div className="grid grid-cols-3 place-items-center gap-2">
                    <select className="select select-bordered w-full max-w-xs" 
                            onChange={(e) => setCurrentGene(e.target.value)}
                    >
                        <option disabled selected>Select Gene</option>
                        <option>IGH</option>
                    </select>
                    <select className="select select-bordered w-full max-w-xs"
                            onChange={(e) => setCurrentSegment(e.target.value)}
                    >
                        <option disabled selected>Select Gene Segment</option>
                        <option>V</option>
                        <option>D</option>
                        <option>J</option>
                    </select>
                    <select className="select select-bordered w-full max-w-xs"
                            onChange={(e) => setCurrentSubtype(e.target.value)}
                    >
                        <option disabled selected>Select Gene Subtype</option>
                        <option>1-2</option>
                    </select>
                    <select className="select select-bordered w-full max-w-xs"
                            onChange={(e) => setCurrentAllele(e.target.value)}
                    >
                        <option disabled selected>Select Allele</option>
                        <option>*02</option>
                        <option>*04</option>
                    </select>
                </div>
                <p>You selected {test}</p>

                <div className="flex flex-row">
                    <Plot data={data} layout={layout} />
                    <Plot data={data} layout={layout} />
                </div>
                // DaisyUI item: Table with pinned-rows. Add hover effect and active row effect as displayed in the first two tables in DaisyUI. Table Header needs to be highlighted differently in all tables.
                <div className="overflow-x-auto h-96">
                    <table className="table table-pin-rows">
                    <thead>
                        <tr>
                        <th className='font-bold'>Gene</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                        <th>IGH</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>IGHV</td></tr>
                        <tr><td>IGHD</td></tr>
                        <tr><td>IGHJ</td></tr>
                    </tbody>
                    <thead>
                        <tr>
                        <th>TRG</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>TRGV</td></tr>
                        <tr><td>TRGJ</td></tr>
                        <tr><td>TRG constant</td></tr>
                    </tbody>
                    <thead>
                        <tr>
                        <th>IGK</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>IGKJ</td></tr>
                        <tr><td>IGKL</td></tr>
                        <tr><td>IGK constant</td></tr>
                    </tbody>
                    <thead>
                        <tr>
                        <th>IGL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>IGL constant</td></tr>
                    </tbody>
                    <thead>
                        <tr>
                        <th>TRA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>TRAV</td></tr>
                        <tr><td>TRAJ</td></tr>
                        <tr><td>TRA constant</td></tr>
                    </tbody>
                    <thead>
                        <tr>
                        <th>TRD</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>TRDV</td></tr>
                        <tr><td>TRDJ</td></tr>
                        <tr><td>TRDD</td></tr>
                        <tr><td>TRD constant</td></tr>
                    </tbody>
                    <thead>
                        <tr>
                        <th>TRB</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>TRBV</td></tr>
                        <tr><td>TRBJ</td></tr>
                        <tr><td>TRBD</td></tr>
                        <tr><td>TRB constant</td></tr>
                    </tbody>
                    </table>
                </div>


                // DaisyUI item: Table with pinned-rows. Add hover effect and active row effect as displayed in the first two tables in DaisyUI.
                // This table should be reset every time the first table row is changed / clicked.
                <div className="overflow-x-auto h-96">
                    <table className="table table-pin-rows">
                    <thead>
                        <tr>
                        <th className='font-bold'>Subtype</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1-2</td></tr>
                        <tr><td>3-4</td></tr>
                        <tr><td>???</td></tr>
                    </tbody>
                    </table>
                </div>

                
                // DaisyUI item: Table with pinned-rows. Add hover effect and active row effect as displayed in the first two tables in DaisyUI.
                // This table should be reset every time the first or second table is changed / clicked.
                <div className="overflow-x-auto h-96">
                    <table className="table table-pin-rows">
                    <thead>
                        <tr>
                        <th className='font-bold'>Allele</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>*02</td></tr>
                        <tr><td>*03</td></tr>
                        <tr><td>*04</td></tr>
                    </tbody>
                    </table>
                </div>

                // Plots should be empty and only display plots when the user selects a row in all three tables.


            </div>
        </div>
    );
}