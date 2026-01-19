// Handles API requests, which should probably be done on a server component. Other than that uses a lot of
// state changes based on user, so should be client.

"use client";

import { ReactElement, useEffect, useState } from "react";
import {
  backendAPI,
  BODY_CLASSES,
  H_1,
  currentVersionFormatted,
} from "@/constants";
import DownloadBoxComponent from "@/components/DownloadBoxComponent";
import axios from "axios";
import fileDownload from "js-file-download";
import JSZip from "jszip";
import { getCookie, hasCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function DownloadPage(): ReactElement {
  // State to keep track of the selected type of fasta file
  const [fastaTypeSelected, setFastaTypeSelected] = useState("genomic");

  // States to keep track of the selected genes for each gene segment
  const [ighSelectionArray, setIghSelectionArray] = useState<string[]>([]);
  // const [igkSelectionArray, setIgkSelectionArray] = useState<string[]>([]);
  // const [iglSelectionArray, setIglSelectionArray] = useState<string[]>([]);
  // const [traSelectionArray, setTraSelectionArray] = useState<string[]>([]);
  // const [trbSelectionArray, setTrbSelectionArray] = useState<string[]>([]);
  // const [trgSelectionArray, setTrgSelectionArray] = useState<string[]>([]);
  // const [trdSelectionArray, setTrdSelectionArray] = useState<string[]>([]);

  const [axiosConfig, setAxiosConfig] = useState({
    headers: {
      "X-api-key": "",
      "Content-Type": "attachment",
    },
  });

  async function downloadGeneFasta(gene: string) {
    const encodedGene = encodeURIComponent(gene);
    const fastaEndpoint =
      backendAPI + "fasta/" + fastaTypeSelected + "?file_name=" + encodedGene;
    await axios
      .get(fastaEndpoint, axiosConfig)
      .then((response) => {
        const responseData: Blob = response.data;
        fileDownload(
          responseData,
          "Homo-sapiens_Ig_Heavy_" +
            gene[gene.length - 1] +
            "_" +
            fastaTypeSelected +
            "_v" +
            currentVersionFormatted +
            ".fasta"
        );
      })
      .catch((response) => console.log(response.error));
  }

  async function downloadGeneFastaZip(genes: string[]) {
    const zip = new JSZip();
    let gene: string;
    for (gene of genes) {
      const encodedGene = encodeURIComponent(gene);
      const fastaEndpoint =
        backendAPI + "fasta/" + fastaTypeSelected + "?file_name=" + encodedGene;
      await axios
        .get(fastaEndpoint, axiosConfig)
        .then((response) => {
          const responseData: Blob = response.data;
          zip.file(
            "Homo-sapiens_Ig_Heavy_" +
              gene[gene.length - 1] +
              "_" +
              fastaTypeSelected +
              "_v" +
              currentVersionFormatted +
              ".fasta",
            responseData
          );
        })
        .catch((response) => console.log(response.error));
    }
    zip.generateAsync({ type: "blob" }).then(
      function (blob) {
        fileDownload(
          blob,
          "Homo-sapiens_Ig_" +
            fastaTypeSelected +
            "_v" +
            currentVersionFormatted +
            "-fastas.zip"
        );
      },
      function (err) {
        console.log(err);
      }
    );
  }

  function handleDownload() {
    const selectionArr = ighSelectionArray;
    // const selectionArr = ighSelectionArray.concat(
    //   igkSelectionArray,
    //   iglSelectionArray,
    //   traSelectionArray,
    //   trbSelectionArray,
    //   trgSelectionArray,
    //   trdSelectionArray
    // );

    if (selectionArr.length === 1) {
      downloadGeneFasta(selectionArr[0]);
    } else if (selectionArr.length > 1) {
      downloadGeneFastaZip(selectionArr);
    }
  }

  useEffect(() => {
    if (hasCookie("password")) {
      setAxiosConfig({
        headers: {
          "X-api-key": getCookie("password") as string,
          "Content-Type": "attachment",
        },
      });
    }
  }, []);

  return (
    <main className={BODY_CLASSES}>
      <h1 className={H_1}>Download FASTA files</h1>

      {!hasCookie("password") && (
        <aside
          className="alert alert-info bg-info text-info-content"
          role="alert"
          aria-label="Demo version notice"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M12 7v2" />
            <path d="M12 13h.01" />
          </svg>
          <p className="text-sm lg:text-base">
            You are currently exploring the demo version of KIARVA. The full
            version will be released once the underlying data has been
            published. Until then, the pages are visible as a demonstration but
            without full data access.
          </p>
        </aside>
      )}

      <aside className="alert" role="note" aria-label="Download instructions">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <p className="text-sm lg:text-base">
          Start by choosing the type of fasta file you want. Then, select the
          gene segment and/or individual genes you want to download by ticking
          the appropriate boxes—ticking a gene segment will automatically select
          all individual genes within that chain. After making your selections,
          click the &quot;Download&quot; button. This will start a download of
          your chosen FASTA file(s). If you have selected more than one file,
          they will be downloaded in a .zip.
        </p>
      </aside>

      <section aria-labelledby="fasta-type-heading">
        <h2 id="fasta-type-heading" className={H_1}>
          Fasta type
        </h2>
        <div className="divider !my-0" aria-hidden="true"></div>

        <fieldset className="w-full !my-0">
          <legend className="sr-only">Select FASTA file type</legend>
          <div>
            <label
              className="flex rounded-md px-2 py-2 my-3 transition-all duration-300 hover:bg-neutral cursor-pointer"
              onClick={() => setFastaTypeSelected("genomic")}
            >
              <input
                type="radio"
                name="fastaRadio"
                className="radio"
                defaultChecked
                value="genomic"
              />
              <span className="pl-2">Genomic coding sequence</span>
            </label>

            <label
              className="flex rounded-md px-2 py-2 my-3 transition-all duration-300 hover:bg-neutral cursor-pointer"
              onClick={() => setFastaTypeSelected("genomic_fl")}
            >
              <input
                type="radio"
                name="fastaRadio"
                className="radio"
                value="genomic_fl"
              />
              <span className="pl-2">
                Genomic coding sequence with flanking regions
              </span>
            </label>

            <label
              className="flex rounded-md px-2 py-2 my-3 transition-all duration-300 hover:bg-neutral cursor-pointer"
              onClick={() => setFastaTypeSelected("translated")}
            >
              <input
                type="radio"
                name="fastaRadio"
                className="radio"
                value="translated"
              />
              <span className="pl-2">Translated V gene sequences</span>
            </label>
          </div>
        </fieldset>
      </section>

      <section aria-labelledby="bcr-heading">
        <h2 id="bcr-heading" className={H_1}>
          BCR
        </h2>
        <div className="divider !my-0" aria-hidden="true"></div>
        <div className="flex flex-col lg:flex-row justify-start gap-4 lg:gap-16">
          <DownloadBoxComponent
            geneSegment="IGH"
            geneObjectArray={[
              { name: "IGHV", isAvailable: true },
              {
                name: "IGHD",
                isAvailable:
                  fastaTypeSelected === "genomic" ||
                  fastaTypeSelected === "genomic_fl",
              },
              { name: "IGHJ", isAvailable: fastaTypeSelected === "genomic" },
              // { name: "IGH constant", isAvailable: false },
            ]}
            setPropsSelectionArray={setIghSelectionArray}
            radialSelected={fastaTypeSelected}
          ></DownloadBoxComponent>
          {/* <DownloadBoxComponent
          geneSegment="IGK"
          geneObjectArray={[
            { name: "IGKV", isAvailable: true },
            { name: "IGKJ", isAvailable: false },
            { name: "IGK constant", isAvailable: false },
          ]}
          setPropsSelectionArray={setIgkSelectionArray}
        ></DownloadBoxComponent> */}
          {/* <DownloadBoxComponent
          geneSegment="IGL"
          geneObjectArray={[
            { name: "IGLV", isAvailable: true },
            { name: "IGLJ", isAvailable: false },
            { name: "IGL constant", isAvailable: false },
          ]}
          setPropsSelectionArray={setIglSelectionArray}
        ></DownloadBoxComponent> */}
        </div>
      </section>

      {/* <section aria-labelledby="tcr-heading">
        <h2 id="tcr-heading" className={H_1}>TCR</h2>
        <div className="divider !my-0" aria-hidden="true"></div>
        <div className="flex flex-col lg:flex-row justify-start gap-4 lg:gap-16"> */}
      {/* <DownloadBoxComponent
          geneSegment="TRA"
          geneObjectArray={[
            { name: "TRAV", isAvailable: true },
            { name: "TRAJ", isAvailable: false },
            { name: "TRA constant", isAvailable: false },
          ]}
          setPropsSelectionArray={setTraSelectionArray}
        ></DownloadBoxComponent> */}
      {/* <DownloadBoxComponent
          geneSegment="TRB"
          geneObjectArray={[
            { name: "TRBV", isAvailable: true },
            { name: "TRBD", isAvailable: false },
            { name: "TRBJ", isAvailable: false },
            { name: "TRB constant", isAvailable: false },
          ]}
          setPropsSelectionArray={setTrbSelectionArray}
        ></DownloadBoxComponent> */}
      {/* <DownloadBoxComponent
          geneSegment="TRG"
          geneObjectArray={[
            { name: "TRGV", isAvailable: true },
            { name: "TRGJ", isAvailable: false },
            { name: "TRG constant", isAvailable: false },
          ]}
          setPropsSelectionArray={setTrgSelectionArray}
        ></DownloadBoxComponent> */}
      {/* <DownloadBoxComponent
          geneSegment="TRD"
          geneObjectArray={[
            { name: "TRDV", isAvailable: true },
            { name: "TRDD", isAvailable: false },
            { name: "TRDJ", isAvailable: false },
            { name: "TRD constant", isAvailable: false },
          ]}
          setPropsSelectionArray={setTrdSelectionArray}
        ></DownloadBoxComponent> */}
      {/* </div>
      </section> */}

      <section aria-label="Download actions">
        <div className="flex justify-center py-8 lg:py-0">
          {/* Delete the button disabled and className when officially launching */}
          <Button
            variant="default"
            size="xl"
            onClick={handleDownload}
            disabled={!hasCookie("password")}
            className={
              "opacity-50" + (!hasCookie("password") && " cursor-not-allowed")
            }
          >
            <Download />
            Download
          </Button>
        </div>
      </section>
    </main>
  );
}
