'use client';

import { 
  AlignmentViewer, 
  FastaAlignment
} from "alignment-viewer-2";
import { ReactElement } from "react";

export default function MSAComponent(prop: {
    alleleName: string,
    alleleSequenceFasta: string
  }): ReactElement {
    function RenderMSA(){
        const alignmentObj = FastaAlignment.fromFileContents(
            prop.alleleName, prop.alleleSequenceFasta
        );
        return(
            <AlignmentViewer alignment={ alignmentObj }/>
        )
    }

    return(
        <>
            {(prop.alleleName && prop.alleleSequenceFasta) && RenderMSA()}
        </>
    );
}