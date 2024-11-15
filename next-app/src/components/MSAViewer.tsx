import { IAlleleData } from '@/interfaces/types';
import React from 'react';


interface MSAViewerProps {
  alleleSequenceData: IAlleleData[];
}

const MSAViewer: React.FC<MSAViewerProps> = ({ alleleSequenceData }) => {
  // Find the max length of sequences for proper alignment
  const maxLength = Math.max(...alleleSequenceData.map(seq => seq.alleleSequence.length));

  // Define colors for each nucleotide
  const nucleotideColors: { [key: string]: string } = {
    A: '#4CAF50',  // Green
    C: '#2196F3',  // Blue
    G: '#FF9800',  // Orange
    T: '#F44336',  // Red
    '-': '#BDBDBD', // Grey for gaps
  };

  // Get the color for each nucleotide
  const getNucleotideColor = (nucleotide: string) => {
    return nucleotideColors[nucleotide] || '#BDBDBD'; // Default to grey if unknown
  };

  return (
    <div className="flex flex-col items-start max-w-full overflow-x-auto">
      {/* Loop through sequences to display them in rows */}
      {alleleSequenceData.map((seq, seqIndex) => (
        <div key={seq.alleleName} className="flex flex-row">
          {/* Allele name on the left */}
          <div style={{ width: '200px', textAlign: 'left', padding: '5px 10px', fontWeight: 'bold' }}>
            {seq.alleleName}
          </div>

          {/* Sequence nucleotides on the right (with scrollable area) */}
          <div className="flex flex-row space-y-2">
            {Array.from({ length: maxLength }).map((_, index) => {
              const nucleotide = seq.alleleSequence[index] || '-'; // Use "-" for gaps
              const color = getNucleotideColor(nucleotide);

              return (
                <div
                  key={seq.alleleName + '-' + index}
                  style={{
                    width: '20px',
                    height: '30px',
                    textAlign: 'center',
                    backgroundColor: color,
                    color: 'white',
                    padding: '5px',
                    margin: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {nucleotide}
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
