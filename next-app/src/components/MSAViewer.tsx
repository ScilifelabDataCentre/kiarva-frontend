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
    //   '#4CAF50',  // Green
    //   '#2196F3',  // Blue
    //   '#FF9800',  // Orange
    //   '#F44336',  // Red
    //   '#BDBDBD', // Grey
    //   '#f1f5f9', // bg-muted
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
        const firstCharacter = sequences[0][i];
        for (let j = 1; j < nrOfSeqs; j++) {
          if (!(firstCharacter == sequences[j][i])) {
            differingIndexes.push(i);
            break;
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

  return (
    <div className="flex flex-col items-start max-w-full overflow-x-auto">
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
                    width: '20px',
                    height: '30px',
                    textAlign: 'center',
                    backgroundColor: color.background,
                    color: color.text,
                    padding: '5px',
                    margin: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
