import { ISequenceData } from "@/interfaces/types";
import React from "react";

interface MSAViewerProps {
  sequenceData: ISequenceData[];
}

const MSAViewer: React.FC<MSAViewerProps> = ({ sequenceData }) => {
  // Find the max length of sequences for proper alignment
  const maxLength = Math.max(...sequenceData.map((seq) => seq.sequence.length));
  const differingIndexes: number[] = [];
  const coloredCharSequences: Object[] = [];

  // Get the color for each sequence character
  const getCharStyle = (index: number) => {
    if (differingIndexes.includes(index)) {
      return "bg-[#B8CCE0] text-black pb-2 pt-2 rounded-sm";
    } else {
      return "bg-base-100 text-black"
    }
  };

  const findDifferingCharacters = (sequences: string[]) => {
    const nrOfSeqs: number = sequences.length;
    if (nrOfSeqs > 1) {
      for (let i = 0; i < maxLength; i++) {
        if (!(sequences[0][i] == "X")) {
          const firstCharacter = sequences[0][i];
          for (let j = 1; j < nrOfSeqs; j++) {
            if (!(firstCharacter == sequences[j][i])) {
              if (!(sequences[j][i] == "X")) {
                differingIndexes.push(i);
                break;
              }
            }
          }
        }
      }
    }
  };

  const sequences = [];
  for (let i = 0; i < sequenceData.length; i++) {
    sequences.push(sequenceData[i].sequence);
  }

  findDifferingCharacters(sequences);

  const renderedUnitClasses = "w-auto grid font-mono h-auto text-center text-nowrap bg-base-100 text-black items-center justify-center";

  const renderUnitCounter = () => {
    return (
      <div
        role="gridcell"
        className={renderedUnitClasses}
        style={{ gridTemplateColumns: `repeat(${maxLength}, 1ch)` }}
      >
        {Array.from({ length: maxLength }).map((_, index) => {
          const output: string =
          (index + 1) % 10 == 0 ? (index + 1).toString() : " ";
          return(
            <pre>{output}</pre>
          )
        })}
      </div>
    );
  }

  const renderUnitDots = () => {
    return(
      <div
        aria-hidden="true"
        className={renderedUnitClasses + " pb-2"}
        style={{ gridTemplateColumns: `repeat(${maxLength}, 1ch)` }}
      >
        {Array.from({ length: maxLength }).map((_, index) => {
          const output: string = (index + 1) % 5 == 0 ? "|" : ".";
          return (
              <>{output}</>
            );
        })}
      </div>
    )
  }


 const renderColored = (seq: string) => {
    return (
      <div
        className={renderedUnitClasses}
        style={{ gridTemplateColumns: `repeat(${maxLength}, 1ch)` }}
      >
        <p>
          {seq.split("").map((char, index) => {
            const style = getCharStyle(index);
            return (
              <span key={index} className={`${style}`}>
                {char}
              </span>
            );
          })}
        </p>
      </div>
    );
  }

  return (
    <figure
      className="flex flex-col tracking-wide pt-4 pb-1 text-xs items-start overflow-x-auto lg:-mx-20 xl:-mx-28 2xl:-mx-36 min-[1920px]:-mx-80 min-[2200px]:-mx-96"
      aria-label="Multiple sequence alignment visualization"
    >
      {sequenceData[0].sequence != "SEQUENCE" && (
        <div className="flex flex-row" role="row" aria-label="Position numbers">
          {/* Allele name on the left */}
          <div
            className="w-[150px] text-left text-black py-1 font-bold sticky left-0 bg-base-100"
            role="columnheader"
            aria-label="Position header"
          >
            {""}
          </div>

          {/* Sequence nucleotides on the right (with scrollable area) */}
          <div className="flex flex-row gap-y-2" role="rowgroup">
            {renderUnitCounter()}
          </div>
        </div>
      )}
      {sequenceData[0].sequence != "SEQUENCE" && (
        <div
          className="flex flex-row"
          role="row"
          aria-label="Position separator"
          aria-hidden="true"
        >
          {/* Allele name on the left */}
          <div
            className="w-[150px] text-left text-black py-1 font-bold sticky left-0 bg-base-100"
            aria-hidden="true"
          >
            {""}
          </div>
          {renderUnitDots()}
        </div>
      )}
      {/* Loop through sequences to display them in rows */}
      {sequenceData.map((seq) => (
        <div key={seq.allele} className="flex flex-row" role="row">
          {/* Allele name on the left */}
          <div
            className="w-[150px] text-left text-black py-1 font-bold sticky left-0"
            role="rowheader"
          >
            {seq.allele}
          </div>

          {/* Sequence nucleotides on the right (with scrollable area) */}
          <div className="flex flex-row" role="rowgroup">
            {renderColored(seq.sequence)}
          </div>
        </div>
      ))}
    </figure>
  );
};

export default MSAViewer;
