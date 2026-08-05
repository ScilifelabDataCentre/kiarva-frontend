import { axiosConfig, backendAPI } from "@/constants";
import {
  AlleleListAA,
  IgSNPerData,
  IGeneFrequencyData,
  IMSAData,
  ISequenceSearchData,
} from "@/interfaces/types";
import axios from "axios";

// ---------------------------------------------------------------------------
// Endpoint constants
// ---------------------------------------------------------------------------

export const geneSelectionEndpoint =
  backendAPI + "data/plotoptions?current_selection=";

const dbNameEndpoint = backendAPI + "data/db_name?selection=";
const igSNPerEndpoint = backendAPI + "data/igsnperdata?allele_name=";
const aminoAcidAllelesEndpoint =
  backendAPI + "data/aminoacidalleles?aa_allele_name=";
const aminoAcidListEndpoint =
  backendAPI + "data/aminoacidlist?aa_allele_name=";
const alignedSequencesEndpoint =
  backendAPI + "data/sequences/alignedsequences?gene_name=";
const sequenceSearchEndpoint = backendAPI + "data/sequences?sequence_str=";
const frequenciesEndpoint = backendAPI + "data/frequencies/";
const aminoAcidFrequenciesEndpoint = backendAPI + "data/aminoacidfrequencies/";
const fastaEndpointBase = backendAPI + "fasta/";
const metaVersionEndpoint = "/meta/version";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type MetaVersion = {
  frontendImage: string;
  backendImage: string;
  currentEnv: string;
};

// ---------------------------------------------------------------------------
// Gene / allele selection dropdowns
// ---------------------------------------------------------------------------

export async function getDbName(selection: string): Promise<string> {
  const encodedSelection = encodeURIComponent(selection);
  let dbName = "";
  await axios
    .get(dbNameEndpoint + encodedSelection, axiosConfig)
    .then((response) => {
      dbName = response.data.db_name;
    })
    .catch((response) => console.log(response.error));
  return dbName;
}

export async function getPlotOptions(
  currentSelection: string,
): Promise<string[]> {
  const encodedCurrentSelection = encodeURIComponent(currentSelection);
  let options: string[] = [];
  await axios
    .get(geneSelectionEndpoint + encodedCurrentSelection, axiosConfig)
    .then((response) => {
      options = response.data;
    })
    .catch((response) => console.log(response.error));
  return options;
}

// ---------------------------------------------------------------------------
// IgSNPer / amino-acid allele metadata
// ---------------------------------------------------------------------------

export async function getIgSNPerData(
  allele: string,
): Promise<IgSNPerData | null> {
  const encodedAllele = encodeURIComponent(allele);
  let data: IgSNPerData | null = null;
  await axios
    .get(igSNPerEndpoint + encodedAllele, axiosConfig)
    .then((response) => {
      data = response.data;
    })
    .catch((response) => console.log(response.error));
  return data;
}

export async function getTopLevelAlleleAA(allele: string): Promise<string> {
  const encodedAllele = encodeURIComponent(allele);
  let topAllele = "";
  await axios
    .get(aminoAcidAllelesEndpoint + encodedAllele, axiosConfig)
    .then((response) => {
      topAllele = response.data.allele_aa;
    })
    .catch((response) => console.log(response.error));
  return topAllele;
}

export async function getAlleleListAA(allele: string): Promise<string[]> {
  const encodedAllele = encodeURIComponent(allele);
  let list: string[] = [];
  await axios
    .get(aminoAcidListEndpoint + encodedAllele, axiosConfig)
    .then((response) => {
      const responseData: AlleleListAA = response.data;
      if (responseData.aa_allele_list) {
        list = responseData.aa_allele_list;
      }
    })
    .catch((response) => console.log(response.error));
  return list;
}

// ---------------------------------------------------------------------------
// Frequency data
// ---------------------------------------------------------------------------

export async function getGenomicSuperpopulationFrequencies(
  allele: string,
): Promise<IGeneFrequencyData[]> {
  const encodedAllele = encodeURIComponent(allele);
  let data: IGeneFrequencyData[] = [];
  await axios
    .get(
      frequenciesEndpoint + "superpopulations?allele_name=" + encodedAllele,
      axiosConfig,
    )
    .then((response) => {
      data = response.data;
    })
    .catch((response) => console.log(response.error));
  return data;
}

export async function getGenomicPopulationFrequencies(
  allele: string,
): Promise<IGeneFrequencyData[]> {
  const encodedAllele = encodeURIComponent(allele);
  let data: IGeneFrequencyData[] = [];
  await axios
    .get(
      frequenciesEndpoint + "populations?allele_name=" + encodedAllele,
      axiosConfig,
    )
    .then((response) => {
      data = response.data;
    })
    .catch((response) => console.log(response.error));
  return data;
}

export async function getAminoAcidSuperpopulationFrequencies(
  allele: string,
): Promise<IGeneFrequencyData[]> {
  const encodedAllele = encodeURIComponent(allele);
  let data: IGeneFrequencyData[] = [];
  await axios
    .get(
      aminoAcidFrequenciesEndpoint +
        "superpopulations?aa_allele_name=" +
        encodedAllele,
      axiosConfig,
    )
    .then((response) => {
      data = response.data;
    })
    .catch((response) => console.log(response.error));
  return data;
}

export async function getAminoAcidPopulationFrequencies(
  allele: string,
): Promise<IGeneFrequencyData[]> {
  const encodedAllele = encodeURIComponent(allele);
  let data: IGeneFrequencyData[] = [];
  await axios
    .get(
      aminoAcidFrequenciesEndpoint +
        "populations?aa_allele_name=" +
        encodedAllele,
      axiosConfig,
    )
    .then((response) => {
      data = response.data;
    })
    .catch((response) => console.log(response.error));
  return data;
}

// ---------------------------------------------------------------------------
// MSA / sequence search
// ---------------------------------------------------------------------------

export async function getAlignedSequenceData(
  gene: string,
): Promise<IMSAData[]> {
  const encodedGene = encodeURIComponent(gene);
  let data: IMSAData[] = [];
  await axios
    .get(alignedSequencesEndpoint + encodedGene, axiosConfig)
    .then((response) => {
      data = response.data;
    })
    .catch((response) => console.log(response.error));
  return data;
}

export async function searchSequences(
  sequence: string,
): Promise<ISequenceSearchData[]> {
  const encodedURI = encodeURI(sequenceSearchEndpoint + sequence);
  let data: ISequenceSearchData[] = [];
  await axios
    .get(encodedURI, axiosConfig)
    .then((response) => {
      data = response.data;
    })
    .catch((response) => console.log(response.error));
  return data;
}

// ---------------------------------------------------------------------------
// Downloads
// ---------------------------------------------------------------------------

export async function getPlotDataTable(
  alleleOrGene: string,
  tableType: string,
  fullGene: boolean,
): Promise<Blob | null> {
  const encodedAlleleName = encodeURIComponent(alleleOrGene);
  const tableTypeURI =
    tableType == "genomicFreqPlot" ? "frequencies" : "aminoacidfrequencies";
  const alleleOrGeneURI = fullGene ? "gene" : "allele";
  const tableVariableName =
    tableType == "genomicFreqPlot"
      ? alleleOrGeneURI + "_name"
      : "aa_" + alleleOrGeneURI + "_name";
  const tableEndpoint =
    backendAPI +
    "data/" +
    tableTypeURI +
    "/table/" +
    alleleOrGeneURI +
    "?" +
    tableVariableName +
    "=" +
    encodedAlleleName;

  let data: Blob | null = null;
  await axios
    .get(tableEndpoint, axiosConfig)
    .then((response) => {
      data = response.data;
    })
    .catch((response) => console.log(response.error));
  return data;
}

export async function getGeneFasta(
  gene: string,
  fastaType: string,
): Promise<Blob | null> {
  const encodedGene = encodeURIComponent(gene);
  const fastaEndpoint =
    fastaEndpointBase + fastaType + "?file_name=" + encodedGene;

  // Deep clone axiosConfig, otherwise the original constant gets mutated
  // (for the entire app) when we add the Content-Type header for the download.
  const axiosConfigDownload = JSON.parse(JSON.stringify(axiosConfig));
  axiosConfigDownload.headers["Content-Type"] = "attachment";

  let data: Blob | null = null;
  await axios
    .get(fastaEndpoint, axiosConfigDownload)
    .then((response) => {
      data = response.data;
    })
    .catch((response) => console.log(response.error));
  return data;
}

// ---------------------------------------------------------------------------
// App meta (Next.js internal /meta/version route)
// ---------------------------------------------------------------------------

export async function getMetaVersion(): Promise<MetaVersion | null> {
  try {
    const res = await fetch(metaVersionEndpoint);
    return (await res.json()) as MetaVersion;
  } catch (err) {
    console.log(err);
    return null;
  }
}
