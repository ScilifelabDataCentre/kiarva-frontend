import { IAxiosConfig, IYouTubeVideo } from "./interfaces/types";

// reused tailwind classes
export const H_1: string =
  "text-left text-black text-2xl lg:text-3xl font-semibold";
export const H_2: string =
  "text-left text-black text-xl lg:text-2xl font-semibold";

export const BUTTON_TYPE_ONE: string =
  "btn bg-fuchsia-950 text-white hover:bg-fuchsia-800 active:bg-fuchsia-900 focus:outline-none focus:ring focus:ring-fuchsia-300";
export const BUTTON_TYPE_TWO: string =
  "btn bg-gray-950 text-white hover:bg-gray-800 active:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-300";

export const BODY_CLASSES: string =
  "bg-base-100 space-y-4 lg:space-y-6 p-4 lg:px-12 lg:pb-18 xl:px-36 xl:pb-28 2xl:max-w-screen-2xl 2xl:mx-auto";

export const LINK_CLASSES: string = "link link-hover";

let backendAPI_tmp = "";
if (typeof window !== "undefined") {
  backendAPI_tmp =
    window.location.origin === "http://localhost:3000"
      ? "http://localhost:5000/"
      : window.location.origin + "/api/";
}
export const backendAPI = backendAPI_tmp;

// currentVersion is used in two ways: 
// 1. To add a suffix to downloaded Fasta data indicating the current version
// 2. To label the changelog page with the current version when creating a new changelog
// Currently, currentVersion is a placeholder and not used correctly. The version number is
// not automatic or controlled by any entity. TBD
export const currentVersion: string = "1.0.0";
export const currentVersionFormatted: string = `${
  currentVersion.split(".")[0]
}_${currentVersion.split(".")[1]}`;

export const YouTubeVideos: { [id: string]: IYouTubeVideo } = {
  "intro": {"address": "S51-19cyK48", "title": "Introduction video"},
  "download": {"address": "5ymJotmdQZw", "title": "Download FASTA files"},
  "frequencies": {"address": "rzJI-cq2DHs", "title": "View population frequencies"},
  "alignments": {"address": "4jj5IuO8C1U", "title": "View sequence alignments"},
  "search": {"address": "WDaeGC6ZGy0", "title": "Search for sequences"}
}

export const axiosConfig: IAxiosConfig = {
  headers: {
    "X-api-key": "kiarvafrontend"
  }
}

export const prepubEnv: boolean = (process.env.NEXT_PUBLIC_CLUSTER_ENV == "prepub" || false);