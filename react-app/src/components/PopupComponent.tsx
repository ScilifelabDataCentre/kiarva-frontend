import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PopupComponentProps } from "../interfaces/types";

const PopupComponent: React.FC<PopupComponentProps> = ({ onClose }) => {
  // This component is only used a single time.
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const superPopulations: { [key: string]: string } = {
    AFR: "African",
    AMR: "Americans",
    EAS: "East Asians",
    EUR: "European",
    SAS: "South Asians",
  };

  const superPopulationColorsDict: { [key: string]: string } = {
    AFR: "#f25c5c",
    AMR: "#dab862",
    EAS: "#70c265",
    EUR: "#5480f0",
    SAS: "#999999",
  };

  const populations: { [key: string]: string } = {
    ACB: "African Caribbean in Barbados",
    ASW: "African Ancestry in Southwestern USA",
    ESN: "Esan in Nigeria",
    GWD: "Gambian in Western Division",
    LWK: "Luhya in Webuye, Kenya",
    MSL: "Mende in Sierra Leone",
    YRI: "Yoruba in Ibadan, Nigeria",
    FIN: "Finnish in Finland",
    GBR: "British from England and Scotland",
    IBS: "Iberian populations in Spain",
    TSI: "Toscani in Italy",
    CDX: "Chinese Dai in Xishuangbanna, China",
    CHB: "Han Chinese in Beijing, China",
    CHS: "Han Chinese South, China",
    JPT: "Japanese in Tokyo, Japan",
    KHV: "Kinh in Ho Chi Minh City, Vietnam",
    BEB: "Bengali in Bangladesh",
    GIH: "Gujarati Indians in Houston, Texas, USA",
    ITU: "Indian Telugu in the UK",
    PJL: "Punjabi in Lahore, Pakistan",
    STU: "Sri Lankan Tamil in the UK",
    CLM: "Colombian in Medellín, Colombia",
    MXL: "Mexican Ancestry in Los Angeles CA USA",
    PEL: "Peruvian in Lima, Peru",
    PUR: "Puerto Rican in Puerto Rico",
  };

  const populationColorsDict: { [key: string]: string } = {
    ACB: "#f25c5c",
    ASW: "#f25c5c",
    ESN: "#f25c5c",
    GWD: "#f25c5c",
    LWK: "#f25c5c",
    MSL: "#f25c5c",
    YRI: "#f25c5c",
    FIN: "#5480f0",
    GBR: "#5480f0",
    IBS: "#5480f0",
    TSI: "#5480f0",
    CDX: "#70c265",
    CHB: "#70c265",
    CHS: "#70c265",
    JPT: "#70c265",
    KHV: "#70c265",
    BEB: "#999999",
    GIH: "#999999",
    ITU: "#999999",
    PJL: "#999999",
    STU: "#999999",
    CLM: "#dab862",
    MXL: "#dab862",
    PEL: "#dab862",
    PUR: "#dab862",
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-secondary bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle className="text-xl font-semibold leading-6 text-base-content">
                    Legend
                  </DialogTitle>
                  <div className="mt-6">
                    <span className="font-semibold">Superpopulations</span>
                    <ul className="list-disc list-inside space-y-1 mb-4 mt-2">
                      {Object.keys(superPopulations).map((key) => (
                        <li key={key} className="flex items-center">
                          <span
                            className="inline-block w-3 h-3 rounded-full mr-2"
                            style={{
                              backgroundColor: superPopulationColorsDict[key],
                            }}
                          ></span>
                          {key} - {superPopulations[key]}
                        </li>
                      ))}
                    </ul>
                    <span className="font-semibold">Populations</span>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      {Object.keys(populations).map((key) => (
                        <li key={key} className="flex items-center">
                          <span
                            className="inline-block w-3 h-3 rounded-full mr-2"
                            style={{
                              backgroundColor: populationColorsDict[key],
                            }}
                          ></span>
                          {key} - {populations[key]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              data-autofocus
              onClick={handleClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PopupComponent;
