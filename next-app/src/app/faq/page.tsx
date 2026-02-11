import { ReactElement } from "react";

import { H_1 } from "@/constants";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { LastUpdated } from "@/components/common/last-updated";
import { BODY_CLASSES } from "@/constants";

export default function FAQPage(): ReactElement {
  return (
    <main className={BODY_CLASSES}>
      <h1 className={H_1}>Frequently Asked Questions</h1>

      <section aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="sr-only">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          role="region"
          aria-label="Frequently asked questions"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How are alleles named within KIARVA?
            </AccordionTrigger>
            <AccordionContent>
              <h4 className="mb-1 text-base font-medium leading-6">
                Nucleotide names
              </h4>
              <p>
                The IGHV alleles are provided in two formats within the KIARVA
                resource, nucleotide and collapsed amino acid sequences.
                Nucleotide differences within the IGHV alleles can result in
                synonymous or non-synonymous changes in the coding sequence and
                are useful for population and genotyping purposes, even if the
                variation results in functionally equivalent allelic sequences.
                The names of the alleles are based on the nucleotide variation
                from the closest alleles present within the initial reference
                database used for the ImmuneDiscover process used in Corcoran et
                al. Immunity 2026, namely the AIRR-C database (Collins et al.
                2023, release version 9, downloaded on 10/12/2024). Alleles that
                are identical to the AIRR-C sequences have the same names in
                KIARVA. Variant sequences that differ from AIRR-C reference
                sequences were given names with a suffix of the form{" "}
                <code className="font-mono">_SXXXX</code>, where the Xs are
                integers provided by the ImmuneDiscover software discovery
                setting.
              </p>
              <h4 className="mt-4 mb-1 text-base font-medium leading-6">
                Amino acid-collapsed names
              </h4>
              <p>
                Amino acid (AA) collapsing of IGHV sequences enables allelic
                variants containing synonymous nucleotide variants to be
                collapsed into a single coding sequence. This allows IGHV
                alleles that have the same translated AA sequence and therefore
                are functionally equivalent in their naïve unmutated state, to
                be separated from alleles containing non-synonymous variations,
                which may have functional effects. The AA-collapsed alleles
                naming principle is based on the lowest numerical allele present
                within each collapsed set. For example, IGHV1-69*01 and
                IGHV1-69*12, IGHV1-69*13 and IGHV1-69*13_S7425 all encode the
                same AA sequence that is hence designated as IGHV1-69*01.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What does &quot;DEL&quot; in the allele dropdown menu mean?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Several common structural variants exist within the human IG
                locus, including some that result in the segmental loss of one
                or more genes. The frequency of these means that many
                individuals will be homozygous for such deletions, with the
                result that the genes located within these segments will not be
                present in the genotypic output for these cases. We have chosen
                to represent homozygous deletions as &quot;DEL&quot; in the
                frequency plots for:
              </p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>IGHV7-4-1</li>
                <li>IGHV4-30-2</li>
                <li>IGHV4-30-4</li>
                <li>IGHV4-31</li>
                <li>IGHV3-30-3</li>
                <li>IGHV3-33</li>
                <li>IGHV3-64D</li>
                <li>IGHV5-10-1</li>
                <li>IGHV1-69-2</li>
                <li>IGHV3-9</li>
                <li>IGHV1-8</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What about duplicated genes?</AccordionTrigger>
            <AccordionContent>
              <p>
                The ImmuneDiscover technique produces accurate sequence analysis
                of full-length unrearranged genes. It does not enable physical
                linkage between genes in a phased haplotype manner. This means
                that it does not distinguish variants of different genes that
                are identical in sequence (i.e. IGHV3-23*01/IGHV3-23D*01 or
                IGHV1-69*01/IGHV1-69D*01). This issue is limited to very few
                alleles and gene ’groups’, namely IGHV1-69, IGHV3-23 and
                IGHV3-30 associated with genomic duplications. For KIARVA and
                the 1KGP dataset, we have chosen to use a single designation to
                represent allelic sequences that belong to such groups. The
                IGHV2-70/2-70D genes are also difficult to disambiguate based on
                sequence alone and we have chosen to assign IGHV2-70/2-70D
                alleles that are predominantly associated with IGHV1-69-2
                containing genotypes as IGHV2-70D.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Can we identify all IG genes from lymphoblastoid cell line (LCL)
              samples?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Analysis of the 1KGP samples using ImmuneDiscover revealed
                several critical points that both enable and limit the use of
                LCL samples in IG genotyping. The samples are derived from EBV
                transformed polyclonal B cells that have undergone different IG
                rearrangements on one haplotype in each cell. In some cases, the
                cell line may be oligoclonal and contain cells that have
                undergone rearrangement on both haplotypes. Our analysis of the
                frequency of DJ rearrangements, which occurs prior to VDJ
                rearrangements, revealed that DNA from LCL samples of the vast
                majority of the 1KGP cases contained enough unrearranged
                template to allow complete IGHV genotyping and calculation of
                population frequencies for each allelic variant (Corcoran et al.
                Immunity 2026, Figure S2C-F). However, the frequency of JD
                rearrangements means that J and D genotyping is less reliable
                for 1KGP cases, and we therefore made the decision not to
                calculate IGHJ and IGHD allele frequencies from the 1KGP
                genotyping results.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Is potential SHM present in lymphoblastoid cell lines an issue?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                LCL samples contain a mixture of DNA templates that have or have
                not acquired somatic hypermutation (SHM)-associated mutations
                within the rearranged V, D and J genes. Thus, care must be taken
                in the analysis process to handle this. ImmuneDiscover
                genotyping has two independent approaches to avoid including
                false-positive, mutated sequences in its genotyping output.
              </p>
              <ol className="mt-2 list-decimal pl-6 space-y-2">
                <li>
                  ImmuneDiscover libraries are produced using primers that
                  target unrearranged V, D and J genes, while rearranged
                  sequences are not targeted and therefore not amplified. This
                  approach excludes the vast majority of SHM-associated
                  variation.
                </li>
                <li>
                  SHM of unrearranged genes is largely limited to when a V or J
                  gene is positioned in the immediate physical vicinity of a
                  rearranged gene. This is particularly the case for J genes if
                  downstream unrearranged genes are present within approximately
                  3 kb of a rearranged neighboring J gene. In the case of V
                  genes, the distance between the genes is sufficient in most
                  cases to avoid SHM spreading to unrearranged neighbors. One
                  exception is IGHV2-70/IGHV2-70D, which is located within 9 kb
                  of the frequently rearranged IGHV1-69/IGH1-69D gene. In the
                  KIARVA analysis of the 1KGP dataset, we therefore required
                  that all IGHV allelic sequences were present in at least 2
                  cases, with a higher stringency applied for IGHV1-69 (4 cases
                  required) and IGHV2-70/2-70D (10 cases required).
                </li>
              </ol>

              <p className="mt-2">
                The issue of localized SHM spreading to unrearranged genes is
                specific to LCL samples and is not an issue when using
                ImmuneDiscover for IG genotype using other genomic DNA
                templates.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              How do we know that the alleles are accurate?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Care has been taken to ensure the accuracy of the alleles
                present within KIARVA, with several steps of cross-validation.
              </p>
              <ol className="mt-2 list-decimal pl-6 space-y-2">
                <li>
                  The accuracy of the ImmuneDiscover procedure was confirmed
                  using a validation cohort of 90 cases, the KI cohort. These 90
                  samples were genotyped using two independent methods,
                  IgDiscover (using two independent IgM libraries for each case)
                  and ImmuneDiscover, resulting in highly concordant results
                  (Corcoran et al. Immunity 2026, Figure 1E and G).
                </li>
                <li>
                  We further used the IgSNPer program to screen all alleles
                  identified to confirm the presence of allele-specific SNP
                  variants in an amalgamated cohort of over 1.2 million
                  individuals.
                </li>
                <li>
                  All IGHV allele variants present in the KIARVA database were
                  confirmed to be present in at least two individuals, with the
                  IGHV1-69 and IGHV2-70 variants (those most susceptible to SHM
                  spreading from neighbouring rearranged genes) requiring
                  presence in four and ten individuals, respectively.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>
              How many IGHV alleles are there yet to identify?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Saturation analysis in the accompanying paper indicates that of
                the population groups analyzed, the set of alleles present in at
                least two individuals is approaching saturation (Corcoran et al.
                2026, Figure 2H). The populations included in the 1KGP set
                represent the major continental human population groups.
                However, it is likely that additional populations that are not
                represented in the 1KGP set, for example individuals from
                South-East Asia, the Middle East and Oceania, contain variants
                that are local and even frequent within their own populations.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <div className="mt-8">
        <LastUpdated date="04-02-2026" />
      </div>
    </main>
  );
}
