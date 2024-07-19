import { ReactElement } from "react";
import { BODY_CLASSES, H_1 } from "../constants";
import { TrackPageViewIfEnabled } from "../util/cookiesHandling";
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
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div className="flex flex-col">
            <label className="font-bold">How to download</label>
            <span>
              Start by choosing the type of fasta file you want. Then, select
              the gene segment and/or individual genes you want to download by
              ticking the appropriate boxes—ticking a gene segment will
              automatically select all individual genes within that chain. After
              making your selections, click the "Download" button. This will
              generate and start a download of your chosen file(s). If you have
              selected more than one file, a .zip file wil be generated.
            </span>
          </div>
        </div>
        <div className={H_1}>Fasta type</div>
        <div className="divider !my-0"></div>

        <div className="w-full !my-0">
          <div>
            <label className="flex rounded-md px-2 py-2 my-3 transition-all duration-300 hover:bg-neutral cursor-pointer">
              <input type="radio" name="fastaRadio" className="radio" />
              <span className="pl-2">Coding sequence</span>
            </label>

            <label className="flex rounded-md px-2 py-2 my-3 transition-all duration-300 hover:bg-neutral cursor-pointer">
              <input type="radio" name="fastaRadio" className="radio" />
              <span className="pl-2">
                Genomic sequence with flanking regions
              </span>
            </label>

            <label className="flex rounded-md px-2 py-2 my-3 transition-all duration-300 hover:bg-neutral cursor-pointer">
              <input type="radio" name="fastaRadio" className="radio" />
              <span className="pl-2">Grouped by amino acid</span>
            </label>
          </div>
        </div>

        <div className={H_1}>BCR</div>
        <div className="divider !my-0"></div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Remember me</span>
            <input type="checkbox" defaultChecked className="checkbox" />
          </label>
        </div>

        <div className="grid grid-cols-4 grid-rows-2 gap-4 mt-8">
          <div className="overflow-x-auto max-h-56 col-span-2">
            <h1 className="text-neutral-content text-xl">
              Select Gene Segment
            </h1>
            <table className="table table-pin-rows">
              <thead>
                <tr>
                  <th className="text-sm bg-secondary text-secondary-content">
                    IGH Segments
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>IGHV</td>
                </tr>
                <tr>
                  <td>IGHJ</td>
                </tr>
                <tr>
                  <td>IGHD</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto max-h-56 col-span-1">
            <h1 className="text-neutral-content text-xl">Select Subtype</h1>
            <table className="table table-pin-rows">
              <tbody>
                <tr>
                  <td>1-2</td>
                </tr>
                <tr>
                  <td>3-4</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto max-h-56 col-span-1">
            <h1 className="text-neutral-content text-xl">Select Allele</h1>
            <table className="table table-pin-rows">
              <tbody>
                <tr>
                  <td>*02</td>
                </tr>
                <tr>
                  <td>*04</td>
                </tr>
                <tr>
                  <td>*05</td>
                </tr>
                <tr>
                  <td>*06</td>
                </tr>
                <tr>
                  <td>*02_S4953</td>
                </tr>
                <tr>
                  <td>*04_S3434</td>
                </tr>
                <tr>
                  <td>*06_S5931</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
