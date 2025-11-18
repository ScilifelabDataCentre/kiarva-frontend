// no header, so already server component. However, since it's used inside a client component, I think
// we need to explicitly add a server header, need to look into it.

import { ISequenceSearchData } from "@/interfaces/types";
import React from "react";

interface SequenceSearchProps {
  sequenceData: ISequenceSearchData[];
  searchTermLength: number;
}

const SequenceSearchComponent: React.FC<SequenceSearchProps> = ({
  sequenceData,
  searchTermLength,
}) => {
  // Find the max length of sequences for proper alignment
  const maxLength = Math.max(...sequenceData.map((seq) => seq.sequence.length));

  const isCharInsideSearchTerm = (
    index: number,
    searchTermPositions: number[]
  ) => {
    let startPos: number;
    let endPos: number;
    for (startPos of searchTermPositions) {
      endPos = startPos + searchTermLength;
      if (startPos <= index && index < endPos) {
        return true;
      }
    }
    return false;
  };

  // Get the color for each sequence character
  const getCharColor = (index: number, searchTermPositions: number[]) => {
    //   '#4CAF50',  // Green
    //   '#2196F3',  // Blue
    //   '#FF9800',  // Orange
    //   '#F44336',  // Red
    //   '#BDBDBD', // Grey
    //   '#f1f5f9', // bg-muted
    if (isCharInsideSearchTerm(index, searchTermPositions)) {
      return { background: "#045C64", text: "white" };
    } else {
      return { background: "#f8fafc", text: "black" };
    }
  };

  const sequences = [];
  for (let i = 0; i < sequenceData.length; i++) {
    sequences.push(sequenceData[i].sequence);
  }

  return (
    <figure
      className="flex flex-col items-start max-w-full overflow-x-auto"
      aria-label="Sequence search results"
    >
      <caption className="sr-only">
        Sequence alignment table showing alleles and their sequences with
        highlighted search term matches
      </caption>
      <div className="min-w-full inline-block align-middle">
        <table className="w-full">
          <thead>
            <tr>
              <th
                scope="col"
                className="w-[250px] text-left font-bold sticky left-0 bg-base-100 z-10"
              >
                Allele
              </th>
              <th scope="col" className="text-left font-bold">
                Sequence
              </th>
            </tr>
          </thead>
          <tbody>
            {sequenceData.map((seq) => (
              <tr key={seq.allele}>
                <td className="w-[250px] text-left text-black py-1 font-bold sticky left-0 bg-base-100 z-10">
                  {seq.allele}
                </td>
                <td>
                  <div className="flex flex-row">
                    {Array.from({ length: maxLength }).map((_, index) => {
                      const character = seq.sequence[index] || "-"; // Use "-" for gaps
                      const color = getCharColor(index, seq.positions);

                      return (
                        <span
                          key={seq.allele + "-" + index}
                          className="inline-flex items-center justify-center"
                          style={{
                            width: "13px",
                            height: "30px",
                            textAlign: "center",
                            backgroundColor: color.background,
                            color: color.text,
                            padding: "0px",
                            margin: "0px",
                          }}
                          aria-label={`Position ${index + 1}: ${character}`}
                        >
                          {character}
                        </span>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
};

export default SequenceSearchComponent;
