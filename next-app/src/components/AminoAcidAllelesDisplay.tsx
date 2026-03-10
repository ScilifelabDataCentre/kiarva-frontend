import { axiosConfig, backendAPI } from "@/constants";
import { AlleleListAA } from "@/interfaces/types";
import axios from "axios";
import { ReactElement, useEffect, useState } from "react";

export default function IgSNPerDisplay(prop: { selectedAllele: string }): ReactElement {
    const [alleleListAA, setAlleleListAA] = useState<string[]>([]);
    const [topAlleleAA, setTopAlleleAA] = useState<string>("");

    async function getTopLevelAlleleAA(allele: string) {
        const encodedAllele = encodeURIComponent(allele);
        const topAlleleAAEndpoint: string =
        backendAPI + "data/aminoacidalleles?aa_allele_name=" + encodedAllele;

        await axios
        .get(topAlleleAAEndpoint, axiosConfig)
        .then((response) => {
            setTopAlleleAA(response.data.allele_aa);
        })
        .catch((response) => console.log(response.error));
    }

    async function getAlleleListAA(allele: string) {
        const encodedAllele = encodeURIComponent(allele);
        const alleleListAADataEndpoint: string =
        backendAPI + "data/aminoacidlist?aa_allele_name=" + encodedAllele;

        await axios
        .get(alleleListAADataEndpoint, axiosConfig)
        .then((response) => {
            const responseData: AlleleListAA = response.data;
            if (responseData.aa_allele_list) {
            setAlleleListAA(responseData.aa_allele_list);
            }
        })
        .catch((response) => console.log(response.error));
    }

    useEffect(() => {
        if (prop.selectedAllele) {
            const selectedAllele = prop.selectedAllele;
            getTopLevelAlleleAA(selectedAllele);
        }
    }, [prop.selectedAllele]);

    // Fetch gene frequency data when allele dropdown changes
    useEffect(() => {
        if (topAlleleAA) {
            getAlleleListAA(topAlleleAA);
        } else {
            setAlleleListAA([]);
        }
    }, [topAlleleAA]);

    return(
        <>
            <h2 id="alleles-table-heading" className="sr-only">
            Alleles translating to the same amino acid
            </h2>
            <div className="overflow-x-auto lg:w-2/4">
            <div className="min-w-full inline-block align-middle">
                <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-neutral text-base-content">
                    <caption className="sr-only">
                    List of alleles that translate to the same amino acid sequence
                    </caption>
                    <thead className="bg-neutral">
                    <tr>
                        <th
                        scope="col"
                        className="px-6 py-3 text-start text-lg lg:text-xl font-semibold"
                        >
                        Alleles translating to the same amino acid
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral text-base lg:text-lg">
                    {alleleListAA.map((value) => {
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
            <div className="lg:w-1/8" aria-hidden="true"></div>
        </>
    )
}