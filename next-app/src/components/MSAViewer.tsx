import { ISequenceData } from "@/interfaces/types";
import React from "react";

interface MSAViewerProps {
  sequenceData: ISequenceData[];
}

const MSAViewer: React.FC<MSAViewerProps> = ({ sequenceData }) => {
  // Find the max length of sequences for proper alignment
  const maxLength = Math.max(...sequenceData.map((seq) => seq.sequence.length));

  // Used to store which indices where NT/AA characters are "misaligned" with the rest of the sequence
  const differingIndices: number[] = [];

  // load sequence data into array for ease of use
  const sequences = [];
  for (let i = 0; i < sequenceData.length; i++) {
    sequences.push(sequenceData[i].sequence);
  }


  // Get the color for each sequence character
  const getCharStyle = (index: number) => {
    if (differingIndices.includes(index)) {
      return "bg-[#B8CCE0] text-black pb-2 pt-2 rounded-xs";
    } else {
      return "bg-base-100 text-black"
    }
  }

  // Function that looks through the sequences and finds indices where all characters do not match
  // across the sequences, storing them in differingIndices for later use.
  const findDifferingCharacters = (sequences: string[]) => {
    const nrOfSeqs: number = sequences.length;
    if (nrOfSeqs > 1) {
      for (let i = 0; i < maxLength; i++) {
        if (!(sequences[0][i] == "X")) {
          const firstCharacter = sequences[0][i];
          for (let j = 1; j < nrOfSeqs; j++) {
            if (!(firstCharacter == sequences[j][i])) {
              if (!(sequences[j][i] == "X")) {
                differingIndices.push(i);
                break;
              }
            }
          }
        }
      }
    }
  }

  findDifferingCharacters(sequences);

  // tailwind classes for rendered sequences, and helping "counters"
  const renderedUnitClasses = "w-auto grid lg:tracking-widest font-mono h-auto text-center text-nowrap bg-base-100 text-black items-center justify-center";

  // Renders out a numerical counter, showing every tenth character
  const renderUnitCounter = () => {
    return (
      <div
        role="gridcell"
        className={renderedUnitClasses}
        style={{ gridTemplateColumns: `repeat(${maxLength}, 1ch)` }}
      >
        {Array.from({ length: maxLength }).map((_, index) => {
          // we want to render every tenth index (or index+1 rather). Every time the counter
          // index gains an extra digit (e.g. 9->10, 99->100), the rendered index starts taking up
          // one extra character space. To keep the index numbers aligned with the rest of the figure, we need 
          // to dynamically skip "\u00A0" (whitespace) characters depending on the size of the current index. 
          // The number of characters we want to skip is the same as the number of digits in the shown index number
          // after the current one, minus one. E.g. if we're at indices 1-89, we always skip one character, so we
          // render 8 of "\u00A0", skip one character, and render one index value per 10 indices. Then
          // between indices 90-989 we skip two characters per 10 indices, and so on.
          const nextIndexNumDigits: number = (index + 11).toString().length;
          const output: string =
          (index + 1) % 10 == 0
            ? 
            (index + 1).toString()
            : 
            ([...Array(nextIndexNumDigits)].map((_, i) => i).includes((index+1) % 10)
              ?
              ""
              :
              "\u00A0"
            );
          return(
            <>{output}</>
          )
        })}
      </div>
    );
  }

  // Renders helping dots and bars to make it easier to see which number nucleotide/aminoacid you are viewing.
  const renderUnitDots = () => {
    return(
      <div
        aria-hidden="true"
        className={renderedUnitClasses + " pb-2"}
        style={{ gridTemplateColumns: `repeat(${maxLength}, 1ch)` }}
      >
        {Array.from({ length: maxLength }).map((_, index) => {
          // Every fifth character is a bar, all other characters are dots
          const output: string = (index + 1) % 5 == 0 ? "|" : ".";
          return (
              <>{output}</>
            );
        })}
      </div>
    )
  }

  // Renders the nucleotide/amino acid characters, adding different stylings to characters at 
  // indices saved in differingIndices to indicate that they are misaligned from the rest of the sequence
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
      className="flex flex-col pt-4 pb-1 text-[0.58rem] xl:text-sm items-start overflow-x-auto lg:-mx-20 xl:-mx-28 2xl:-mx-36 min-[1920px]:-mx-80 min-[2200px]:-mx-96"
      aria-label="Multiple sequence alignment visualization"
    >
      {sequenceData[0].sequence != "SEQUENCE" && (
        <div className="flex flex-row" role="row" aria-label="Position numbers">
          {/* Empty area that lines up with numbers indicating index */}
          <div
            className="w-40 xl:w-56 text-left text-black py-1 font-bold sticky left-0 bg-base-100"
            role="columnheader"
            aria-label="Position header"
          >
            {""}
          </div>

          {/* Index counter showing every tenth index */}
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
          {/* Empty area that lines up with helper dots and bars */}
          <div
            className="w-40 xl:w-56 text-left text-black py-1 font-bold sticky left-0 bg-base-100"
            aria-hidden="true"
          >
            {""}
          </div>
          {/* Helping visual "counter" with dots and bars ....|....| */}
          {renderUnitDots()}
        </div>
      )}
      {/* Loop through sequences to display them in rows */}
      {sequenceData.map((seq) => (
        <div key={seq.allele} className="flex flex-row" role="row">
          {/* Allele name on the left */}
          <div
            className="w-40 xl:w-56 text-left text-black py-1 font-bold sticky left-0 bg-base-100"
            role="rowheader"
          >
            {seq.allele}
          </div>

          {/* Sequence on the right (with scrollable area) */}
          <div className="flex flex-row" role="rowgroup">
            {renderColored(seq.sequence)}
          </div>
        </div>
      ))}
    </figure>
  );
};

export default MSAViewer;
