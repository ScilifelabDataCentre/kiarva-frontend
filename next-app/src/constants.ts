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
  "bg-base-100 space-y-4 lg:space-y-6 p-4 lg:px-36 lg:pb-28 2xl:max-w-screen-2xl 2xl:mx-auto";

export const LINK_CLASSES: string = "link link-hover";

let backendAPI_tmp = "";
if (typeof window !== "undefined") {
  backendAPI_tmp =
    window.location.origin === "http://localhost:3000"
      ? "http://localhost:5000"
      : window.location.origin + "/api/";
}
export const backendAPI = backendAPI_tmp;

export const currentVersion: string = "0.1.0";
export const currentVersionFormatted: string = `${
  currentVersion.split(".")[0]
}_${currentVersion.split(".")[1]}`;
