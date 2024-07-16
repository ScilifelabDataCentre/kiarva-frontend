export interface ILink {
  text: string;
  classes: string;
  link: string;
}

export interface ISVG {
  href: string;
  xmlns: string;
  width: string;
  height: string;
  viewBox: string;
  classes: string;
  svg: string;
}

export interface ICardConfig {
  cardClasses: string;
  textClasses: string;
  imgClasses: string;
  buttonClasses: string;
  buttonPlacement: string;
}

export interface ICardContent {
  text: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

export interface IDataSourceFilters {
  dataTypes: string[];
  diseaseTypes: string[];
}

export interface IDataSourcesDC {
  data: string[];
  ddls: string[];
  description: string;
  name: string;
  search_tags: string[];
  target: string[];
  thumbnail: string;
  thumbnail_border?: boolean;
  type: string[];
  url: string;
  disease_type: string[];
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

export type ProfileComponentProps = {
  imageUrl: string;
  linkUrl: string;
  name: string;
  title: string;
  bgColor: string;
};

export type PublicationComponentProps = {
  linkUrl: string;
  title: string;
  authors: string;
  journal: string;
  bgColor: string;
};

export type NewsComponentProps = {
  title: string;
  date: string;
  text: string;
  bgColor: string;
};
