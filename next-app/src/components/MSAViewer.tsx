import { ISequenceData } from '@/interfaces/types';
import React from 'react';


interface MSAViewerProps {
  sequenceData: ISequenceData[];
}

const MSAViewer: React.FC<MSAViewerProps> = ({ sequenceData }) => {
  // Find the max length of sequences for proper alignment
  const maxLength = Math.max(...sequenceData.map(seq => seq.sequence.length));
  const differingIndexes: number[] = [];

  // Get the color for each sequence character
  const getCharColor = (index: number) => {
    if (differingIndexes.includes(index)) {
      return {'background': '#045C64', 'text': 'white'}
    }
    else {
      return {'background': 'bg-base-100', 'text': 'black'}
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
  }

  const sequences = [];
  for (let i = 0; i < sequenceData.length; i++) {
    sequences.push(sequenceData[i].sequence);
  }
  findDifferingCharacters(sequences);

  const width = "20px";
  const height = "30px";
  const textAlign = "center";
  const padding = "5px";
  const margin = "1px";
  const display = "flex";
  const alignItems = "center";
  const justifyContent = "center";

  return (
    <div className="flex flex-col items-start max-w-full overflow-x-auto">
      {sequenceData[0].sequence != "SEQUENCE" && <div className="flex flex-row">
          {/* Allele name on the left */}
          <div className="w-[250px] text-left text-black py-1 font-bold sticky left-0 bg-base-100">
            {""}
          </div>

          {/* Sequence nucleotides on the right (with scrollable area) */}
          <div className="flex flex-row space-y-2">
            {Array.from({ length: maxLength }).map((_, index) => {
              const output: string = (index+1) % 10 == 0 ? (index+1).toString() : ""
              return (
                <div
                  key={index}
                  style={{
                    width: width,
                    height: height,
                    textAlign: textAlign,
                    backgroundColor: 'bg-base-100',
                    color: 'black',
                    padding: padding,
                    margin: margin,
                    display: display,
                    alignItems: alignItems,
                    justifyContent: justifyContent,
                  }}
                >
                  {output}
                </div>
              );
            })}
          </div>
        </div>}
        {sequenceData[0].sequence != "SEQUENCE" && <div className="flex flex-row">
          {/* Allele name on the left */}
          <div className="w-[250px] text-left text-black py-1 font-bold sticky left-0 bg-base-100">
            {""}
          </div>
        {Array.from({ length: maxLength }).map((_, index) => {
              const output: string = (index+1) % 5 == 0 ? "|" : "."
              return (
                <div
                  key={index}
                  style={{
                    width: width,
                    height: height,
                    textAlign: textAlign,
                    backgroundColor: 'bg-base-100',
                    color: 'black',
                    padding: padding,
                    margin: margin,
                    display: display,
                    alignItems: alignItems,
                    justifyContent: justifyContent,
                  }}
                >
                  {output}
                </div>
              );
            })}
          </div>}
      {/* Loop through sequences to display them in rows */}
      {sequenceData.map((seq) => (
        <div key={seq.allele} className="flex flex-row">
          {/* Allele name on the left */}
          <div className="w-[250px] text-left text-black py-1 font-bold sticky left-0 bg-base-100">
            {seq.allele}
          </div>

          {/* Sequence nucleotides on the right (with scrollable area) */}
          <div className="flex flex-row space-y-2">
            {Array.from({ length: maxLength }).map((_, index) => {
              const character = seq.sequence[index] || '-'; // Use "-" for gaps
              const color = getCharColor(index);

              return (
                <div
                  key={seq.allele + '-' + index}
                  style={{
                    width: width,
                    height: height,
                    textAlign: textAlign,
                    backgroundColor: color.background,
                    color: color.text,
                    padding: padding,
                    margin: margin,
                    display: display,
                    alignItems: alignItems,
                    justifyContent: justifyContent,
                  }}
                >
                  {character}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MSAViewer;
