import { ReactElement, useState } from "react";
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

  const [fastaTypeSelected, setFastaTypeSelected] = useState("Coding sequence");
  // use fastaTypeSelected in Download backend

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
          <label
            className="flex rounded-md px-2 py-2 my-3 transition-all duration-300 hover:bg-neutral cursor-pointer"
            onClick={() => setFastaTypeSelected("Coding sequence")}
          >
            <input type="radio" name="fastaRadio" className="radio" />
            <span className="pl-2">Coding sequence</span>
          </label>

          <label
            className="flex rounded-md px-2 py-2 my-3 transition-all duration-300 hover:bg-neutral cursor-pointer"
            onClick={() =>
              setFastaTypeSelected("Genomic sequence with flanking regions")
            }
          >
            <input type="radio" name="fastaRadio" className="radio" />
            <span className="pl-2">Genomic sequence with flanking regions</span>
          </label>

          <label
            className="flex rounded-md px-2 py-2 my-3 transition-all duration-300 hover:bg-neutral cursor-pointer"
            onClick={() => setFastaTypeSelected("Grouped by amino acids")}
          >
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

      <div className="flex justify-center">
        <a href="" rel="noopener noreferrer">
          <div className="bg-gradient-to-r from-[rgba(67,133,139)] to-primary text-primary-content text-lg tracking-wide flex gap-4 justify-center items-center w-96 h-14 font-extrabold rounded-2xl shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:opacity-90">
            Download
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <g data-name="11.download">
                <path d="M12 24a12 12 0 1 1 12-12 12.013 12.013 0 0 1-12 12zm0-22a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2z" />
                <path d="M12 14.414 7.293 9.707l1.414-1.414L12 11.586l3.293-3.293 1.414 1.414L12 14.414z" />
                <path d="M11 5h2v8h-2zM17 19H7v-3h2v1h6v-1h2v3z" />
              </g>
            </svg>
          </div>
        </a>
      </div>
    </div>
  );
}
