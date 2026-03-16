import { axiosConfig, backendAPI } from "@/constants";
import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import {
  IgSNPerData,
} from "@/interfaces/types";

export default function IgSNPerDisplay(prop: { selectedAllele: string }): ReactElement {
    const [igSNPerScore, setIgSNPerScore] = useState<string>("");
    const [igSNPerSNPs, setIgSNPerSNPs] = useState<string[]>([]);

    async function getGeneIgSNPerData(allele: string) {
        const encodedAllele = encodeURIComponent(allele);

        const alleleIgSNPerDataEndpoint: string =
        backendAPI + "data/igsnperdata?allele_name=" + encodedAllele;

        await axios
        .get(alleleIgSNPerDataEndpoint, axiosConfig)
        .then((response) => {
            const responseData: IgSNPerData = response.data;
            if (responseData.igSNPer_score || responseData.igSNPer_score === 0) {
            const scoreString = responseData.igSNPer_score.toString();
            if (scoreString.length === 1) {
                setIgSNPerScore(scoreString + ".0");
            } else {
                setIgSNPerScore(scoreString);
            }
            } else {
            setIgSNPerScore("Missing");
            }
            setIgSNPerSNPs(responseData.igSNPer_SNPs);
        })
        .catch((response) => console.log(response.error));
    }

    // Fetch gene frequency data when allele dropdown changes
    useEffect(() => {
        if (prop.selectedAllele) {
            const selectedAllele = prop.selectedAllele;
            getGeneIgSNPerData(selectedAllele);
        } else {
            setIgSNPerScore("");
            setIgSNPerSNPs([]);
        }
    }, [prop.selectedAllele]);

    return (
        <>
            <h2 id="igsnper-data-heading" className="sr-only">
                IgSNPer score and associated SNPs
            </h2>
            <p className="text-neutral-content text-lg lg:text-xl font-semibold lg:w-1/8 pt-2">
                IgSNPer SCORE: {igSNPerScore}
            </p>
            <div className="overflow-x-auto lg:w-2/4">
                <div className="min-w-full inline-block align-middle">
                <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-neutral text-base-content">
                    <caption className="sr-only">
                        List of associated SNPs for the selected allele
                    </caption>
                    <thead className="bg-neutral">
                        <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-start text-lg lg:text-xl font-semibold"
                        >
                            Associated SNPs
                        </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral text-base lg:text-lg">
                        {igSNPerSNPs.map((value) => {
                        return (
                            <tr key={value}>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                                {value}
                            </td>
                            </tr>
                        );
                        })}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </>
    )
}