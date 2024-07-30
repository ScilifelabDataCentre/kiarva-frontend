import { ReactElement } from "react";
import { BODY_CLASSES, H_1 } from "../constants";
import { TrackPageViewIfEnabled } from "../util/cookiesHandling";
import test2 from "../assets/images/test2.png";

export default function InformationPage(): ReactElement {
  TrackPageViewIfEnabled();

  var pageTitle: string = "Information";

  return (
    <>
      <div className={BODY_CLASSES}>
        <div className={H_1}>{pageTitle}</div>
        <div className="divider pt-4">IgSNPer</div>
        <p className="text-left lg:text-justify text-sm lg:text-base">
          Multiple research projects have accumulated data on the frequency of
          single nucleotide polymorphisms (SNPs) between individuals. These
          datasets provide an important resource to analyze individual and
          population level variation if the individual SNPs can be accurately
          assigned to specific gene loci. We have taken advantage of this
          resource by utilizing two processes. First, we amalgamated the various
          SNP databases into a single searchable program based on the assignment
          of individual SNPs to the human GRCh37 and GRCh38 assemblies. Second,
          we utilized the ability to assign IGHV, IGHD and IGHJ sequences to
          defined genomic loci within the same assemblies, thereby confirming
          the individual SNP variant locations within verified IG gene variants.
        </p>
        <p className="text-left lg:text-justify text-sm lg:text-base">
          The resultant program, termed IgSNPer, analyzes each nucleotide
          position within a complete variant allele, identifying whether
          specific nucleotide variations can be explained through the presence
          of a SNP variant within the amalgamated SNP databases above a
          particular frequency. IgSNPer uses dbSNP build 156 for humans, which
          contains 1,130,597,309 reference SNP (rs) calls in total. Of these,
          33,714,196 are on chromosome 14, where the immunoglobulin heavy chain
          (IGH) genes are located. This accumulated SNP reference set includes
          data from various population databases, including:
        </p>
        <ol className="list-decimal list-inside text-sm lg:text-base">
          <li className="mb-1">
            dbGaP_PopFreq: Aggregated frequency data on over 1 million
            individuals.
          </li>
          <li className="mb-1">
            1000Genomes: Includes data for 2,504 individuals from a total of 26
            populations.
          </li>
          <li className="mb-1">
            GnomAD: A variant collection incorporating 602M SNVs and 105M indels
            identified through whole-genome sequencing of 71,702 samples that
            were subsequently mapped to the GRCh38 reference assembly.
          </li>
          <li className="mb-1">
            ExAC: The Exome Aggregation Consortium (ExAC) dataset accumulated
            SNP variation data on 60,706 unrelated individuals that were
            sequenced during the analysis of several disease specific and
            population related projects.
          </li>
          <li className="mb-1">
            TOPMED: The TOPMED dataset utilizes data from 158,000 individuals of
            mainly European, African, Hispanic/Latino or East Asian ancestry.
          </li>
          <li className="mb-1">
            TOMMO: An allele frequency panel produced from the genomic sequence
            analysis of 8380 Japanese individuals.
          </li>
          <li>
            KOREAN Reference Genome Database: containing SNP variation data on
            1465 Korean individuals
          </li>
        </ol>
        <p className="text-left lg:text-justify text-sm lg:text-base">
          The program examines each full-length allelic sequence, identifying
          both common SNP variants according to the amalgamated SNP database,
          and uncommon variations that are either present at low frequency
          within the database or are not present in previously published SNPs
          within the database (labeled as uncommon). Each individual uncommon
          variation identified is given an IgSNPer score of one. The full
          IgSNPer score for each allele sequence is the sum of all uncommon
          variant nucleotides for that sequence. The resultant IgSNPer output
          for each allele provides an indication of whether a single or multiple
          rare SNP variants are present in that allelic sequence, with a score
          of zero indicating that the specific variation is found above the
          cutoff frequency within the set of individuals of the amalgamated SNP
          database.
        </p>
        <p className="pb-8 text-left lg:text-justify text-sm lg:text-base">
          The IgSNPer output serves several purposes. First, allelic sequences
          with zero scores indicate that the variation has been reported to be
          present in the human population at a certain frequency. Second,
          verified alleles with low IgSNPer counts (usually 1) reveal variations
          that are present at low frequency in the set of individuals in the
          reference set, for example alleles that may be specific to a
          population group that has not been utilized in the reference dataset.
          Finally, high IgSNPer counts are indicative of sequences that have an
          accumulation of variations that are absent in the reference set.
          Extreme caution should be taken with such alleles as a high IgSNPer
          score indicates technical issues such as those associated with
          truncated or incomplete alleles, or sequence errors present in such
          sequences.
        </p>

        <div className="divider pt-4">Populations</div>
        <p className="pb-4 text-left lg:text-justify text-sm lg:text-base">
          Ut rhoncus ante in metus lobortis, eu euismod magna dignissim. Duis
          nec condimentum purus. Quisque urna enim, placerat non fermentum sed,
          pharetra sit amet quam. Ut rhoncus ante in metus lobortis, eu euismod
          magna dignissim. Duis nec condimentum purus. Quisque urna enim,
          placerat non fermentum sed, pharetra sit amet quam. Ut rhoncus ante in
          metus lobortis, eu euismod magna dignissim. Duis nec condimentum
          purus. Quisque urna enim, placerat non fermentum sed, pharetra sit
          amet quam. Ut rhoncus ante in metus lobortis, eu euismod magna
          dignissim. Duis nec condimentum purus. Quisque urna enim, placerat non
          fermentum sed, pharetra sit amet quam. Ut rhoncus ante in metus
          lobortis, eu euismod magna dignissim. Duis nec condimentum purus.
          Quisque urna enim, placerat non fermentum sed, pharetra sit amet quam.
          Ut rhoncus ante in metus lobortis, eu euismod magna dignissim. Duis
          nec condimentum purus. Quisque urna enim, placerat non fermentum sed,
          pharetra sit amet quam. Ut rhoncus ante in metus lobortis, eu euismod
          magna dignissim. Duis nec condimentum purus. Quisque urna enim,
          placerat non fermentum sed, pharetra sit amet quam. Ut rhoncus ante in
          metus lobortis, eu euismod magna dignissim. Duis nec condimentum
          purus. Quisque urna enim, placerat non fermentum sed, pharetra sit
          amet quam. Ut rhoncus ante in metus lobortis, eu euismod magna
          dignissim. Duis nec condimentum purus. Quisque urna enim, placerat non
          fermentum sed, pharetra sit amet quam. Ut rhoncus ante in metus
          lobortis, eu euismod magna dignissim. Duis nec condimentum purus.
          Quisque urna enim, placerat non fermentum sed, pharetra sit amet quam.
          Ut rhoncus ante in metus lobortis, eu euismod magna dignissim. Duis
          nec condimentum purus. Quisque urna enim, placerat non fermentum sed,
          pharetra sit amet quam. Ut rhoncus ante in metus lobortis, eu euismod
          magna dignissim. Duis nec condimentum purus.{" "}
        </p>
        <div className="pb-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <img src={test2} alt="Test" className="w-full h-auto" />
          <img src={test2} alt="Test" className="w-full h-auto" />
        </div>
        <div className="divider pt-4">lgBLASTn</div>
        <div className="divider pt-4">IGH</div>
        <div className="divider pt-4">...</div>
      </div>
    </>
  );
}
