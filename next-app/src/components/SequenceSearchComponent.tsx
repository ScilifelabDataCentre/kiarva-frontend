import { ISequenceSearchData } from '@/interfaces/types';
import React from 'react';


interface SequenceSearchProps {
  sequenceData: ISequenceSearchData[];
  searchTermLength: number;
}

const SequenceSearchComponent: React.FC<SequenceSearchProps> = ({ sequenceData, searchTermLength }) => {
  // Find the max length of sequences for proper alignment
  const maxLength = Math.max(...sequenceData.map(seq => seq.sequence.length));

  const isCharInsideSearchTerm = (index: number, searchTermPositions: number[]) => {
    let startPos: number;
    let endPos: number;
    for (startPos of searchTermPositions) {
      endPos = startPos + searchTermLength;
      if (startPos <= index && index < endPos) {
        return true;
      }
    }
    return false;
  }

  // Get the color for each sequence character
  const getCharColor = (index: number, searchTermPositions: number[]) => {
    //   '#4CAF50',  // Green
    //   '#2196F3',  // Blue
    //   '#FF9800',  // Orange
    //   '#F44336',  // Red
    //   '#BDBDBD', // Grey
    //   '#f1f5f9', // bg-muted
    if (isCharInsideSearchTerm(index, searchTermPositions)) {
      return {'background': '#2196F3', 'text': 'white'}
    }
    else {
      return {'background': '#f8fafc', 'text': 'black'}
    }
  };

  const sequences = [];
  for (let i = 0; i < sequenceData.length; i++) {
    sequences.push(sequenceData[i].sequence);
  }

  return (
    <div className="flex flex-col items-start max-w-full overflow-x-auto">
      {/* Loop through sequences to display them in rows */}
      <div className="flex flex-row">
        <h2 className="w-[250px] font-bold">
          Allele
        </h2>
        <h2 className="font-bold">
          Sequence
        </h2>
      </div>
      <div className="divider pt-4 "></div>
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
              const color = getCharColor(index, seq.positions);

              return (
                <div
                  key={seq.allele + '-' + index}
                  style={{
                    width: '13px',
                    height: '30px',
                    textAlign: 'center',
                    backgroundColor: color.background,
                    color: color.text,
                    padding: '0px',
                    margin: '0px',
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

export default SequenceSearchComponent;
