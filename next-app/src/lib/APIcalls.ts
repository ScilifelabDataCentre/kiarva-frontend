import { API_HEADERS, backendAPI } from "@/constants";
import {
  AlleleListAA,
  IgSNPerData,
  IGeneFrequencyData,
  IMSAData,
  ISequenceSearchData,
} from "@/interfaces/types";

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
// Request helpers
// ---------------------------------------------------------------------------

/**
 * GET a backend URL with the shared API key header.
 *
 * The important difference from axios, which this replaced: fetch only rejects
 * on network failure, and resolves normally for 404, 500 and every other error
 * status. Without this check a failed request would fall through to the parse
 * step and either throw something misleading or hand back an error page as
 * data, so a non-OK status is turned into an error explicitly.
 */
async function apiFetch(
  url: string,
  extraHeaders?: Record<string, string>,
): Promise<Response> {
  const response = await fetch(url, {
    headers: { ...API_HEADERS, ...extraHeaders },
  });
  if (!response.ok) {
    throw new Error(`GET ${url} failed: ${response.status} ${response.statusText}`);
  }
  return response;
}

/**
 * GET and parse JSON, falling back to `fallback` if anything goes wrong.
 *
 * Every caller wants the same thing: a usable value, never a rejected promise,
 * with failures logged and the default returned. `select` picks a field out of
 * the response body for the endpoints that wrap their payload.
 */
async function getJson<T>(
  url: string,
  fallback: T,
  select: (body: unknown) => T | undefined | null = (body) => body as T,
): Promise<T> {
  try {
    const response = await apiFetch(url);
    return select(await response.json()) ?? fallback;
  } catch (error) {
    console.log(error);
    return fallback;
  }
}

/**
 * GET a text payload (TSV tables and FASTA files), or null on failure.
 */
async function getText(
  url: string,
  extraHeaders?: Record<string, string>,
): Promise<string | null> {
  try {
    const response = await apiFetch(url, extraHeaders);
    return await response.text();
  } catch (error) {
    console.log(error);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Gene / allele selection dropdowns
// ---------------------------------------------------------------------------

export async function getDbName(selection: string): Promise<string> {
  return getJson(
    dbNameEndpoint + encodeURIComponent(selection),
    "",
    (body) => (body as { db_name?: string }).db_name,
  );
}

export async function getPlotOptions(
  currentSelection: string,
): Promise<string[]> {
  return getJson<string[]>(
    geneSelectionEndpoint + encodeURIComponent(currentSelection),
    [],
  );
}

// ---------------------------------------------------------------------------
// IgSNPer / amino-acid allele metadata
// ---------------------------------------------------------------------------

export async function getIgSNPerData(
  allele: string,
): Promise<IgSNPerData | null> {
  return getJson<IgSNPerData | null>(
    igSNPerEndpoint + encodeURIComponent(allele),
    null,
  );
}

export async function getTopLevelAlleleAA(allele: string): Promise<string> {
  return getJson(
    aminoAcidAllelesEndpoint + encodeURIComponent(allele),
    "",
    (body) => (body as { allele_aa?: string }).allele_aa,
  );
}

export async function getAlleleListAA(allele: string): Promise<string[]> {
  return getJson<string[]>(
    aminoAcidListEndpoint + encodeURIComponent(allele),
    [],
    (body) => (body as AlleleListAA).aa_allele_list,
  );
}

// ---------------------------------------------------------------------------
// Frequency data
// ---------------------------------------------------------------------------

export async function getGenomicSuperpopulationFrequencies(
  allele: string,
): Promise<IGeneFrequencyData[]> {
  return getJson<IGeneFrequencyData[]>(
    frequenciesEndpoint +
      "superpopulations?allele_name=" +
      encodeURIComponent(allele),
    [],
  );
}

export async function getGenomicPopulationFrequencies(
  allele: string,
): Promise<IGeneFrequencyData[]> {
  return getJson<IGeneFrequencyData[]>(
    frequenciesEndpoint +
      "populations?allele_name=" +
      encodeURIComponent(allele),
    [],
  );
}

export async function getAminoAcidSuperpopulationFrequencies(
  allele: string,
): Promise<IGeneFrequencyData[]> {
  return getJson<IGeneFrequencyData[]>(
    aminoAcidFrequenciesEndpoint +
      "superpopulations?aa_allele_name=" +
      encodeURIComponent(allele),
    [],
  );
}

export async function getAminoAcidPopulationFrequencies(
  allele: string,
): Promise<IGeneFrequencyData[]> {
  return getJson<IGeneFrequencyData[]>(
    aminoAcidFrequenciesEndpoint +
      "populations?aa_allele_name=" +
      encodeURIComponent(allele),
    [],
  );
}

// ---------------------------------------------------------------------------
// MSA / sequence search
// ---------------------------------------------------------------------------

export async function getAlignedSequenceData(
  gene: string,
): Promise<IMSAData[]> {
  return getJson<IMSAData[]>(
    alignedSequencesEndpoint + encodeURIComponent(gene),
    [],
  );
}

export async function searchSequences(
  sequence: string,
): Promise<ISequenceSearchData[]> {
  // encodeURI rather than encodeURIComponent, matching the previous behaviour:
  // the whole URL is encoded here, not just the sequence.
  return getJson<ISequenceSearchData[]>(
    encodeURI(sequenceSearchEndpoint + sequence),
    [],
  );
}

// ---------------------------------------------------------------------------
// Downloads
// ---------------------------------------------------------------------------

// Both download helpers return the payload as text rather than a Blob. That is
// what they always did: axios only produces a Blob when asked for one, and with
// the default response type it handed back the raw string for these non-JSON
// endpoints. The declared Blob return type was inaccurate, and both callers
// pass the result straight to js-file-download or JSZip, which take either.
export async function getPlotDataTable(
  alleleOrGene: string,
  tableType: string,
  fullGene: boolean,
): Promise<string | null> {
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

  return getText(tableEndpoint);
}

export async function getGeneFasta(
  gene: string,
  fastaType: string,
): Promise<string | null> {
  const encodedGene = encodeURIComponent(gene);
  const fastaEndpoint =
    fastaEndpointBase + fastaType + "?file_name=" + encodedGene;

  // The extra header is merged per request rather than mutated onto a shared
  // config object, so the previous deep clone guarding against that is no
  // longer needed.
  return getText(fastaEndpoint, { "Content-Type": "attachment" });
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
