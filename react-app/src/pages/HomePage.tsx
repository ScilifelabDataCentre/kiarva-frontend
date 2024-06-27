import { ReactElement, useEffect, useState } from 'react';
import { BODY_CLASSES, 
        // BUTTON_TYPE_ONE, 
        // H_1
    } from '../constants';
import { TrackPageViewIfEnabled } from '../util/cookiesHandling';
import FrequencyPlotComponent from '../components/FrequencyPlotComponent';
import { IGeneFrequencyData } from '../interfaces/types';
import axios from 'axios';

export default function HomePage(): ReactElement {

    TrackPageViewIfEnabled();

    const superpopulations: string[] = [
        "AFR",
        "AMR",
        "EAS",
        "EUR",
        "SAS"
    ];

    const superPopulationColors: String[] = ["#5C5A8C", "#3D8F86", "#D6ADA7", "#F9D99A", "#8FD6FF"];

    const superpopFreqDataNoSelection: IGeneFrequencyData[] = []
    for (let i = 0; i < superpopulations.length; i++) {
        superpopFreqDataNoSelection.push({
            "frequency": 0,
            "n": 0,
            "population": superpopulations[i]
        });
    }

    const [currentGene, setCurrentGene] = useState<string>("");
    const [currentSegment, setCurrentSegment] = useState<string>("");
    const [currentSubtype, setCurrentSubtype] = useState<string>("");
    const [currentAllele, setCurrentAllele] = useState<string>("");
    const [superpopFreqAPIData, setSuperpopFreqAPIData] = useState<IGeneFrequencyData[]>(superpopFreqDataNoSelection);
    // const [popFreqAPIData, setPopFreqAPIData] = useState<IGeneFrequencyData[]>([
    //     {
    //         "frequency": 0,
    //         "n": 0,
    //         "population": "None"
    //     },
    // ]);

    const backendAPI = 'http://localhost:5000/data/frequencies/superpopulations/';


    async function getGeneFreqData(allele: String){
        let responseData: IGeneFrequencyData[] = [];
        await axios.get(backendAPI + allele)
            .then(response => {
                responseData = response.data;
                setSuperpopFreqAPIData(responseData)
            })
            .catch(response => console.log(response.error));
    }

    useEffect(() =>{
        if (currentGene && currentSegment && currentSubtype && currentAllele) {
            getGeneFreqData(currentGene + currentSegment + currentSubtype + currentAllele)
        }
    }, [currentGene, currentSegment, currentSubtype, currentAllele]);

    const dropDownMenuClasses: string = "select select-bordered w-full max-w-xs bg-neutral";

    return (
        <div>
            <div className={BODY_CLASSES}>
                {}
                <div className="grid grid-cols-3 place-items-center gap-2">
                    <select className={dropDownMenuClasses}
                            onChange={(e) => setCurrentGene(e.target.value)}
                    >
                        <option disabled selected>Select Gene</option>
                        <option>IGH</option>
                    </select>
                    <select className={dropDownMenuClasses}
                            onChange={(e) => setCurrentSegment(e.target.value)}
                    >
                        <option disabled selected>Select Gene Segment</option>
                        <option>V</option>
                    </select>
                    <select className={dropDownMenuClasses}
                            onChange={(e) => setCurrentSubtype(e.target.value)}
                    >
                        <option disabled selected>Select Gene Subtype</option>
                        <option>1-2</option>
                    </select>
                    <select className={dropDownMenuClasses}
                            onChange={(e) => setCurrentAllele(e.target.value)}
                    >
                        <option disabled selected>Select Allele</option>
                        <option>*02</option>
                        <option>*04</option>
                        <option>*05</option>
                        <option>*06</option>
                        <option>*02_S4953</option>
                        <option>*04_S3434</option>
                        <option>*06_S5931</option>
                    </select>
                </div>
                <div className="flex flex-row">
                    <FrequencyPlotComponent plotName="Superpopulations" geneAPIData={superpopFreqAPIData} barColors={superPopulationColors}/>
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