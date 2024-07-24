import { ReactElement } from "react";
import { BODY_CLASSES, H_1 } from "../constants";
import { TrackPageViewIfEnabled } from "../util/cookiesHandling";
import DownloadBoxComponent from "../components/DownloadBoxComponent";
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

  return (
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
            Start by choosing the type of fasta file you want. Then, select the
            gene segment and/or individual genes you want to download by ticking
            the appropriate boxes—ticking a gene segment will automatically
            select all individual genes within that chain. After making your
            selections, click the "Download" button. This will generate and
            start a download of your chosen file(s). If you have selected more
            than one file, a .zip file wil be generated.
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
            <span className="pl-2">Genomic sequence with flanking regions</span>
          </label>

          <label className="flex rounded-md px-2 py-2 my-3 transition-all duration-300 hover:bg-neutral cursor-pointer">
            <input type="radio" name="fastaRadio" className="radio" />
            <span className="pl-2">Grouped by amino acid</span>
          </label>
        </div>
      </div>

      <div className={H_1}>BCR</div>
      <div className="divider !my-0"></div>
      <div className="flex justify-start gap-16">
        <DownloadBoxComponent
          geneSegment="IGH"
          geneObjectArray={[
            { name: "IGHV", isAvailable: true },
            { name: "IGHD", isAvailable: true },
            { name: "IGHJ", isAvailable: true },
            { name: "IGH constant", isAvailable: false },
          ]}
        ></DownloadBoxComponent>
        <DownloadBoxComponent
          geneSegment="IGK"
          geneObjectArray={[
            { name: "IGKV", isAvailable: true },
            { name: "IGKJ", isAvailable: true },
            { name: "IGK constant", isAvailable: false },
          ]}
        ></DownloadBoxComponent>
        <DownloadBoxComponent
          geneSegment="IGL"
          geneObjectArray={[
            { name: "IGLV", isAvailable: true },
            { name: "IGLJ", isAvailable: true },
            { name: "IGL constant", isAvailable: false },
          ]}
        ></DownloadBoxComponent>
      </div>

      <div className={H_1}>TCR</div>
      <div className="divider !my-0"></div>
      <div className="flex justify-start gap-16">
        <DownloadBoxComponent
          geneSegment="TRA"
          geneObjectArray={[
            { name: "TRAV", isAvailable: true },
            { name: "TRAJ", isAvailable: true },
            { name: "TR constant", isAvailable: false },
          ]}
        ></DownloadBoxComponent>
      </div>
    </div>
  );
}
