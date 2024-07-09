import React from "react";
import { DownloadButtonComponentProps } from "../interfaces/types";

  const DownloadButtonComponent: React.FC<DownloadButtonComponentProps> = ({ geneArray }) => {

    return (
      <div className="flex flex-col content-start items-start space-y-4 z-10">
      <div
    className="text-info-content text-base flex justify-center items-center w-36 h-10 px-8 py-2 bg-info font-bold opacity-100 rounded-lg shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-fuchsia-800"
  >
    <button onClick={() => downloadGeneFasta(geneArray[0])}>{geneArray[0]}</button>
  </div>
{geneArray.slice(1).map((gene: string, index: number) => (
  <div
    key={index}
    className="text-info-content text-base text-nowrap flex justify-center items-center w-36 h-10 px-8 py-2 bg-info font-medium opacity-80 rounded-lg shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-fuchsia-800"
  >
    <button onClick={() => downloadGeneFasta(gene)}>{gene}</button>
  </div>
))}
</div>

    );
  }
  
  export default DownloadButtonComponent;
