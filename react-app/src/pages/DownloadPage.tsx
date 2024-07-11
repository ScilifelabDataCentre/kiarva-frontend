import { ReactElement } from 'react';
import { BODY_CLASSES } from '../constants';
import { TrackPageViewIfEnabled } from '../util/cookiesHandling';
// import axios from 'axios';
// import fileDownload from 'js-file-download';
// import JSZip from 'jszip';

export default function DownloadPage(): ReactElement {

    TrackPageViewIfEnabled();

    // async function downloadGeneFasta(geneSegment: string) {
    //     let fastaEndpoint = backendAPI + "fasta/" + geneSegment;
    //     await axios.get(fastaEndpoint, {
    //         headers: {
    //           "Content-Type": 'attachment'
    //         }
    //        })
    //         .then(response => {
    //             let responseData: Blob = response.data;
    //             fileDownload(responseData, geneSegment + '.fasta');
    //         })
    //         .catch(response => console.log(response.error));
    // }

    // async function downloadGeneFastaZip() {
    //     let geneSegments: string[] = ['IGHV', 'IGHD', 'IGHJ'];
    //     let zip = new JSZip();
    //     let geneSegment: string;
    //     for (geneSegment of geneSegments) {
    //         let fastaEndpoint = backendAPI + "fasta/" + geneSegment;
    //         await axios.get(fastaEndpoint, {
    //             headers: {
    //             "Content-Type": 'attachment'
    //             }
    //         })
    //             .then(response => {
    //                 let responseData: Blob = response.data;
    //                 zip.file(geneSegment + '.fasta', responseData);
    //             })
    //             .catch(response => console.log(response.error));
    //     }
    //     zip.generateAsync({type:"blob"}).then(function (blob) {
    //         fileDownload(blob, "IGH-fastas.zip");                   
    //     }, function (err) {
    //         console.log(err)
    //     })
    // }

    // const dropDownMenuClasses: string = "select select-bordered w-full max-w-xs bg-neutral";
    // const selectedRowClasses: string = "font-bold text-lg bg-neutral text-neutral-content";
    // const notSelectedRowClasses: string = "odd:bg-base-100 even:bg-neutral even:bg-opacity-50 text-lg hover:opacity-100 hover:bg-neutral transform transition duration-300 ease-in-out";

    return (
        <>
            <div className={BODY_CLASSES}>
                <div className="alert">
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
                                <tr><td>IGHV</td></tr>
                                <tr><td>IGHJ</td></tr>
                                <tr><td>IGHD</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="overflow-x-auto max-h-56 col-span-1">
                        <h1 className="text-neutral-content text-xl">Select Subtype</h1>
                        <table className="table table-pin-rows">
                            <tbody>
                                <tr><td>1-2</td></tr>
                                <tr><td>3-4</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="overflow-x-auto max-h-56 col-span-1">
                        <h1 className="text-neutral-content text-xl">Select Allele</h1>
                        <table className="table table-pin-rows">
                            <tbody>
                                <tr><td>*02</td></tr>
                                <tr><td>*04</td></tr>
                                <tr><td>*05</td></tr>
                                <tr><td>*06</td></tr>
                                <tr><td>*02_S4953</td></tr>
                                <tr><td>*04_S3434</td></tr>
                                <tr><td>*06_S5931</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}