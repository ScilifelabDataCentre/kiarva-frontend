'use client';

import { backendAPI } from '@/constants';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { getCookie, hasCookie } from 'cookies-next';
import fileDownload from 'js-file-download';
import { ReactElement, useEffect, useState } from 'react';

// Component that fetches frequency plot data from API and allows user to download it
export default function DownloadPlotData(prop: {
        alleleName: string;
        tableType: string;
    }): ReactElement {
    const [axiosConfig, setAxiosConfig] = useState({
        headers: {
          "X-api-key": "",
          "Content-Type": "attachment",
        },
    });

    async function handleDownload() {
        const encodedAlleleName = encodeURIComponent(prop.alleleName);
        const tableTypeURI = prop.tableType == "genomicFreqPlot" ? "frequencies" : "aminoacidfrequencies";
        const tableVariableName = prop.tableType == "genomicFreqPlot" ? "allele_name" : "aa_allele_name";
        const tableEndpoint =
        backendAPI + "data/" + tableTypeURI + "/table?"+tableVariableName+"=" + encodedAlleleName;
        const tableFileNameSuffix = prop.tableType == "genomicFreqPlot" ? "genomic" : "aminoacid"; 
        const tableFileName = prop.alleleName.replace("*", "_").replace("/","_") + "-" + tableFileNameSuffix +"_frequencies.tsv";
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
        <>
            <section aria-label="Download actions">
                <div className="flex justify-center py-8 lg:py-0">
                {/* Delete the button disabled and className when officially launching */}
                <Button
                    variant="default"
                    onClick={handleDownload}
                    disabled={!hasCookie("password")}
                    className={
                    "opacity-50" + (!hasCookie("password") && " cursor-not-allowed")
                    }
                >
                    Download frequency table
                </Button>
                </div>
            </section>
        </>
    );
}
