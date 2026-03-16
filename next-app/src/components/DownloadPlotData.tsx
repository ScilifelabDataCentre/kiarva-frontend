'use client';

import { axiosConfig, backendAPI } from '@/constants';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import fileDownload from 'js-file-download';
import { ReactElement } from 'react';

// Component that fetches frequency plot data from API and allows user to download it
export default function DownloadPlotData(prop: {
        alleleOrGene: string;
        tableType: string;
        fullGene: boolean;
    }): ReactElement {

    async function handleDownload() {
        const encodedAlleleName = encodeURIComponent(prop.alleleOrGene);
        const tableTypeURI = prop.tableType == "genomicFreqPlot" ? "frequencies" : "aminoacidfrequencies";
        const alleleOrGene = prop.fullGene ? "gene" : "allele";
        const tableVariableName = prop.tableType == "genomicFreqPlot" ? alleleOrGene + "_name" : "aa_"+alleleOrGene+"_name";
        const tableEndpoint =
        backendAPI + "data/" + tableTypeURI + "/table/"+alleleOrGene+"?"+tableVariableName+"=" + encodedAlleleName;
        const tableFileNameSuffix = prop.tableType == "genomicFreqPlot" ? "genomic" : "aminoacid"; 
        const tableFileName = prop.alleleOrGene.replace("*", "_").replace("/","_") + "-" + tableFileNameSuffix +"_frequencies.tsv";
        await axios
            .get(tableEndpoint, axiosConfig)
            .then((response) => {
                const responseData: Blob = response.data;
                fileDownload(
                responseData,
                tableFileName
                );
            })
            .catch((response) => console.log(response.error));
    }

    return (
        <>
            <section aria-label="Download actions">
                <div className="flex justify-center m-1">
                {/* Delete the button disabled and className when officially launching */}
                <Button
                    variant="default"
                    onClick={handleDownload}
                    className={
                    "opacity-50"
                    }
                >
                    {prop.fullGene ? "Download gene frequency table" : "Download allele frequency table"}
                </Button>
                </div>
            </section>
        </>
    );
}
