'use client';

import { Button } from "@/components/ui/button";
import { getPlotDataTable } from "@/lib/APIcalls";
import fileDownload from 'js-file-download';
import { Download } from 'lucide-react';
import { ReactElement } from 'react';

// Component that fetches frequency plot data from API and allows user to download it
export default function DownloadPlotData(prop: {
        alleleOrGene: string;
        tableType: string;
        fullGene: boolean;
    }): ReactElement {

    async function handleDownload() {
        const responseData = await getPlotDataTable(
            prop.alleleOrGene,
            prop.tableType,
            prop.fullGene,
        );
        if (!responseData) return;
        const tableFileNameSuffix =
            prop.tableType == "genomicFreqPlot" ? "genomic" : "aminoacid";
        const tableFileName =
            prop.alleleOrGene.replace("*", "_").replace("/", "_") +
            "-" +
            tableFileNameSuffix +
            "_frequencies.tsv";
        fileDownload(responseData, tableFileName);
    }

    return (
        <>
            <section aria-label="Download actions">
                <div className="flex justify-center m-1">
                <Button
                    variant="default"
                    onClick={handleDownload}
                >
                    <Download />
                    {prop.fullGene ? "Download gene frequency table" : "Download allele frequency table"}
                </Button>
                </div>
            </section>
        </>
    );
}
