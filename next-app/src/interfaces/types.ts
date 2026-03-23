export interface ILink {
  text: string;
  classes: string;
  link: string;
}

export interface IGeneFrequencyData {
  frequency: number;
  n: number;
  population: string;
}

export interface IPopulationRegion {
  superpopulation: string;
  population: string;
}

export interface ISuperpopulationColors {
  AFR: string;
  AMR: string;
  EAS: string;
  EUR: string;
  SAS: string;
}

export type ChangeLogComponentProps = {
  title: string;
  // doi: string;
  databaseUpdates: string | Array<string>;
  designAndBugFixes: string | Array<string>;
  frontEndLink: string;
  backEndLink: string;
  isCurrent: boolean;
};

export type PublicationComponentProps = {
  linkUrl: string;
  title: string;
  authors: string;
  journal: string;
  bgColor: string;
};

export type DropdownComponentProps = {
  menuName: string;
  menuItemsArray: Array<string>;
  currentPick: string;
  setCurrentPick: (currentPick: string) => void;
};

export type DownloadBoxComponentProps = {
  geneSegment: string;
  geneObjectArray: GeneObject[];
  setPropsSelectionArray: (propsSelectionArray: string[]) => void;
  radialSelected: string;
};

export interface GeneObject {
  name: string;
  isAvailable: boolean;
}

export type AbbreviationPopupComponentProps = {
  onClose: () => void;
};

export type IgSNPerData = {
  igSNPer_score: number;
  igSNPer_SNPs: string[];
};

export type AlleleListAA = {
  aa_allele_list: string[];
};

export type Locus = "IGH" | "TRG";
export type GeneType = "IGHV" | "TRGV";

export type IAlleleDropDownConfig = {
  loci: readonly Locus[];
  geneTypesByLocus: Readonly<Partial<Record<Locus, readonly GeneType[]>>>;
  geneSelectionEndpoint: string;
};

export type ISequenceData = {
  allele: string;
  sequence: string;
};

export type ISequenceSearchData = {
  allele: string;
  sequence: string;
  positions: number[];
};

export type IMSAData = {
  allele: string;
  sequence_nt: string;
  sequence_aa: string;
};

export type IPlotDimensions = {
  height: number;
  width: number;
};

export type IYouTubeVideo = {
  address: string;
  title: string;
}

export type IAxiosConfig = {
  headers: IAxiosConfigHeaders;
}

export type IAxiosConfigHeaders = {
  "X-api-key": string;
  "Content-Type"?: string;
}
