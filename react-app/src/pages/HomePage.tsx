import { ReactElement, useEffect, useState } from 'react';
import { BODY_CLASSES, 
        // BUTTON_TYPE_ONE, 
        // H_1
    } from '../constants';
import { TrackPageViewIfEnabled } from '../util/cookiesHandling';
import FrequencyPlotComponent from '../components/FrequencyPlotComponent';
import { IGeneFrequencyData, IPopulationRegion } from '../interfaces/types';
import axios from 'axios';
import fileDownload from 'js-file-download';

export default function HomePage(): ReactElement {

    TrackPageViewIfEnabled();

    const superpopulations: string[] = [
        "AFR",
        "EUR",
        "EAS",
        "SAS",
        "AMR",
    ];
    
    // const superPopulationColors: string[] = ["#f25c5c", "#dab862", "#70c265", "#5480f0", "#999999"];
    const superPopulationColorsDict = {"AFR": "#f25c5c", "AMR": "#dab862", "EAS": "#70c265", "EUR": "#5480f0", "SAS": "#999999"};

    const superpopFreqDataNoSelection: IGeneFrequencyData[] = [];
    for (let i = 0; i < superpopulations.length; i++) {
        superpopFreqDataNoSelection.push({
            "frequency": 0,
            "n": 0,
            "population": superpopulations[i]
        });
    }

    const populations: string[] = [
        'ACB',
        'ASW',
        'ESN',
        'GWD',
        'LWK',
        'MSL',
        'YRI',
        'FIN',
        'GBR',
        'IBS',
        'TSI',
        'CDX',
        'CHB',
        'CHS',
        'JPT',
        'KHV',
        'BEB',
        'GIH',
        'ITU',
        'PJL',
        'STU',
        'CLM',
        'MXL',
        'PEL',
        'PUR'
    ];

    const populationColors: string[] = ["#00008B"];

    const popFreqDataNoSelection: IGeneFrequencyData[] = [];
    for (let i = 0; i < populations.length; i++) {
        popFreqDataNoSelection.push({
            "frequency": 0,
            "n": 0,
            "population": populations[i]
        });
    }

    const [currentSegment, setCurrentSegment] = useState<string>("");
    const [currentSubtype, setCurrentSubtype] = useState<string>("");
    const [currentAllele, setCurrentAllele] = useState<string>("");
    const [superpopFreqAPIData, setSuperpopFreqAPIData] = useState<IGeneFrequencyData[]>(superpopFreqDataNoSelection);
    const [popFreqAPIData, setPopFreqAPIData] = useState<IGeneFrequencyData[]>(popFreqDataNoSelection);
    const [superpopulationRegions, setSuperpopulationRegions] = useState<IPopulationRegion[]>([{"superpopulation": "", "population": ""}]);


    const backendAPI = 'http://localhost:5000/';


    async function getGeneFreqData(allele: string){
        let responseData: IGeneFrequencyData[] = [];
        let alleleFrequenciesEndpoint: string = backendAPI + "data/frequencies/";
        let superpopulationsEndpoint: string = alleleFrequenciesEndpoint + "superpopulations/" + allele;
        await axios.get(superpopulationsEndpoint)
            .then(response => {
                responseData = response.data;
                let responseDataOrdered: IGeneFrequencyData[] = [];
                let superpopulationRegion: string;
                for (superpopulationRegion of superpopulations) {
                    let responseObj: IGeneFrequencyData;
                    for (responseObj of responseData) {
                        console.log(responseObj['population']);
                        console.log("VS")
                        console.log(superpopulationRegion);
                        if (responseObj.population === superpopulationRegion) {
                            console.log("höhöj");
                            responseDataOrdered.push(responseObj);
                            break;
                        }
                    }
                }
                
                setSuperpopFreqAPIData(responseDataOrdered)
            })
            .catch(response => console.log(response.error));

        let populationsEndpoint: string = alleleFrequenciesEndpoint + "populations/" + allele;
        await axios.get(populationsEndpoint)
        .then(response => {
            responseData = response.data;
            let responseDataOrdered: IGeneFrequencyData[] = [];
            let populationRegion: string;
            for (populationRegion of populations) {
                let responseObj: IGeneFrequencyData;
                for (responseObj of responseData) {
                    if (responseObj.population === populationRegion) {
                        responseDataOrdered.push(responseObj);
                        break;
                    }
                }
            }
            setPopFreqAPIData(responseDataOrdered)
        })
        .catch(response => console.log(response.error));

        let regionResponseData: IPopulationRegion[] = []
        let populationRegionEndpoint: string = backendAPI + "data/populationregions";
        await axios.get(populationRegionEndpoint)
        .then(response => {
            regionResponseData = response.data;
            setSuperpopulationRegions(regionResponseData)
        })
        .catch(response => console.log(response.error));
    }

    async function downloadGeneFasta(geneSegment: string) {
        let fastaEndpoint = backendAPI + "fasta/" + geneSegment;
        await axios.get(fastaEndpoint, {
            headers: {
              "Content-Type": 'attachment'
            }
           })
            .then(response => {
                let responseData: Blob = response.data;
                fileDownload(responseData, geneSegment + '.fasta');
            })
            .catch(response => console.log(response.error));
    }

    useEffect(() =>{
        if (currentSegment && currentSubtype && currentAllele) {
            getGeneFreqData(currentSegment + currentSubtype + currentAllele)
        }
    }, [currentSegment, currentSubtype, currentAllele]);

    // const dropDownMenuClasses: string = "select select-bordered w-full max-w-xs bg-neutral";
    const selectedRowClasses: string = "font-bold text-lg bg-neutral text-neutral-content";
    const notSelectedRowClasses: string = "odd:bg-base-100 even:bg-neutral even:bg-opacity-50 text-lg hover:opacity-100 hover:bg-neutral transform transition duration-300 ease-in-out";

    return (
        <div>
            <div className={BODY_CLASSES}>
                <div className="grid grid-cols-4 grid-rows-2 gap-4 mt-8">
                    
                    <div className="overflow-x-auto max-h-56 col-span-2">
                    <h1 className="text-neutral-content text-xl">Select Gene Segment</h1>
                        <table className="table table-pin-rows">
                        <thead>
                            <tr>
                            <th className='text-sm bg-secondary text-secondary-content'>IGH Segments</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={currentSegment === 'IGHV' ? selectedRowClasses : notSelectedRowClasses} onClick={() => setCurrentSegment('IGHV')}><td>IGHV</td></tr>
                            <tr className={currentSegment === 'IGHJ' ? selectedRowClasses : notSelectedRowClasses} onClick={() => setCurrentSegment('IGHJ')}><td>IGHJ</td></tr>
                            <tr className={currentSegment === 'IGHD' ? selectedRowClasses : notSelectedRowClasses} onClick={() => setCurrentSegment('IGHD')}><td>IGHD</td></tr>
                        </tbody>
                        </table>
                    </div>

                    <div className="alert col-span-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-current">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className='flex flex-col'>
            <label className="font-bold">How to use the tool</label>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tortor mauris, suscipit eu lacinia non, imperdiet blandit risus. Maecenas pellentesque, massa id sodales dictum, urna urna tincidunt eros, ac consequat urna lectus vel ligula. Suspendisse justo est, auctor et mi id, aliquet bibendum lacus. Quisque accumsan egestas felis, vel bibendum nunc fringilla nec. Integer accumsan sollicitudin porttitor. rna eros dapibus erat. Nam bibendum ac felis quis convallis. Praesent ne</span>
            </div>
            </div>

                    <div className="overflow-x-auto max-h-56 col-span-1">
                    <h1 className="text-neutral-content text-xl">Select Subtype</h1>
                        <table className="table table-pin-rows">
                    <tbody>
                        <tr className={currentSubtype === '1-2' ? selectedRowClasses : notSelectedRowClasses} onClick={() => setCurrentSubtype('1-2')}><td>1-2</td></tr>
                        <tr className={currentSubtype === '3-4' ? selectedRowClasses : notSelectedRowClasses} onClick={() => setCurrentSubtype('3-4')}><td>3-4</td></tr>
                    </tbody>
                        </table>
                    </div>

                    <div className="overflow-x-auto max-h-56 col-span-1">
                    <h1 className="text-neutral-content text-xl">Select Allele</h1>
                        <table className="table table-pin-rows">
                    <tbody>
                        <tr className={currentAllele === '*02' ? selectedRowClasses : notSelectedRowClasses} onClick={() => setCurrentAllele('*02')}><td>*02</td></tr>
                        <tr className={currentAllele === '*04' ? selectedRowClasses : notSelectedRowClasses} onClick={() => setCurrentAllele('*04')}><td>*04</td></tr>
                        <tr className={currentAllele === '*05' ? selectedRowClasses : notSelectedRowClasses} onClick={() => setCurrentAllele('*05')}><td>*05</td></tr>
                        <tr className={currentAllele === '*06' ? selectedRowClasses : notSelectedRowClasses} onClick={() => setCurrentAllele('*06')}><td>*06</td></tr>
                        <tr className={currentAllele === '*02_S4953' ? selectedRowClasses : notSelectedRowClasses} onClick={() => setCurrentAllele('*02_S4953')}><td>*02_S4953</td></tr>
                        <tr className={currentAllele === '*04_S3434' ? selectedRowClasses : notSelectedRowClasses} onClick={() => setCurrentAllele('*04_S3434')}><td>*04_S3434</td></tr>
                        <tr className={currentAllele === '*06_S5931' ? selectedRowClasses : notSelectedRowClasses} onClick={() => setCurrentAllele('*06_S5931')}><td>*06_S5931</td></tr>
                    </tbody>
                        </table>
                    </div>
</div>

<div className='flex items-center justify-center pt-8'><p className='text-neutral-content text-xl font-semibold'>Plots for {currentSegment} {currentSubtype} {currentAllele}</p></div>


                    <FrequencyPlotComponent 
                        superpopulationAPIData={superpopFreqAPIData} 
                        superpopulationColors={superPopulationColorsDict}
                        populationAPIData={popFreqAPIData} 
                        populationColors={populationColors}
                        superpopulationRegions={superpopulationRegions}
                        />

{/*
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
                    <div>
                        <h1 className="text-neutral-content">Download fasta files</h1>
                        <button className={BUTTON_TYPE_ONE} onClick={() => downloadGeneFasta('IGHV.fasta')}>IGHV</button>
                        <button className={BUTTON_TYPE_ONE}>IGHJ</button>
                        <button className={BUTTON_TYPE_ONE}>IGHD</button>
                    </div>
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
                */}


            </div>
        </div>
    );
}