import { ReactElement } from "react";
import { BODY_CLASSES, H_1, H_2 } from "@/constants";

export default function FAQPage(): ReactElement {
  const pageTitle: string = "Frequently Asked Questions";
  const FAQH_2: string = H_2 + " pb-2 pt-2";
  const FAQH_3: string = "text-left text-black text-lg lg:text-lg font-semibold pb-1 pt-2";
  const paragraphClasses: string = "text-left lg:text-justify text-sm lg:text-base mb-4";
  const orderedListClasses: string = "list-decimal list-outside text-sm lg:text-base mb-4 ms-8";
  const listClasses: string = "mb-4";

  return (
    <main className={BODY_CLASSES}>
      <h1 className={H_1}>{pageTitle}</h1>
      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className={FAQH_2}>
            How are alleles named within KIARVA
        </h2>
        <h3 className={FAQH_3}>
            Nucleotide names
        </h3>
        <p className={paragraphClasses}>
            The IGHV alleles are provided in two formats within the KIARVA resource, 
            nucleotide and collapsed amino acid sequences. Nucleotide differences 
            within the IGHV alleles can result in synonymous or non-synonymous changes 
            in the coding sequence and are useful for population and genotyping purposes, even 
            if the variation results in functionally equivalent allelic sequences. 
            The names of the alleles are based on the nucleotide variation from the 
            closest alleles present within the initial reference database used for the 
            ImmuneDiscover process used in Corcoran et al. Immunity 2026, namely the AIRR-C 
            database (Collins et al. 2023, release version 9, downloaded on 10/12/2024). Alleles 
            that are identical to the AIRR-C sequences have the same names in KIARVA. Variant 
            sequences that differ from AIRR-C reference sequences were given names with a suffix 
            of the form _SXXXX, where the &rsquo;X&rsquo;s are integers provided by the 
            ImmuneDiscover software discovery setting. 
        </p>
        <h3 className={FAQH_3}>
            Amino acid-collapsed names
        </h3>
        <p className={paragraphClasses}>
            Amino acid (AA) collapsing of IGHV sequences enables allelic variants containing 
            synonymous nucleotide variants to be collapsed into a single coding sequence. This 
            allows IGHV alleles that have the same translated AA sequence and therefore are 
            functionally equivalent in their naïve unmutated state, to be separated from alleles 
            containing non-synonymous variations, which may have functional effects. The AA-collapsed 
            alleles naming principle is based on the lowest numerical allele present within each 
            collapsed set. For example, IGHV1-69*01 and IGHV1-69*12, IGHV1-69*13 and IGHV1-69*13_S7425 
            all encode the same AA sequence that is hence designated as IGHV1-69*01.
        </p>
        <h2 id="faq-heading" className={FAQH_2}>
            What does &rsquo;DEL&rsquo; in the allele dropdown menu mean?
        </h2>
        <p className={paragraphClasses}>
            Several common structural variants exist within the human IG locus, including some that 
            result in the segmental loss of one or more genes. The frequency of these means that many 
            individuals will be homozygous for such deletions, with the result that the genes located 
            within these segments will not be present in the genotypic output for these cases. We have 
            chosen to represent homozygous deletions as &rsquo;DEL&rsquo; in the frequency plots for IGHV7-4-1, IGH4-30-2, 
            IGHV4-30-4, IGHV4-31, IGHV3-30-3, IGHV3-33, IGHV3-64D, IGHV5-10-1, IGHV1-69-2, IGHV3-9 and IGHV1-8.
        </p>
        <h2 id="faq-heading" className={FAQH_2}>
            What about duplicated genes?
        </h2>
        <p className={paragraphClasses}>
            The ImmuneDiscover technique produces accurate sequence analysis of full-length unrearranged genes. 
            It does not enable physical linkage between genes in a phased haplotype manner. This means that it does 
            not distinguish variants of different genes that are identical in sequence (i.e. IGHV3-23*01/IGHV3-23D*01 
            or IGHV1-69*01/IGHV1-69D*01). This issue is limited to very few alleles and gene &rsquo;groups&rsquo;, namely IGHV1-69, 
            IGHV3-23 and IGHV3-30 associated with genomic duplications. For KIARVA and the 1KGP dataset, we have chosen 
            to use a single designation to represent allelic sequences that belong to such groups. 
        </p>
        <h2 id="faq-heading" className={FAQH_2}>
            Can we identify all IG genes from lymphoblastoid cell line (LCL) samples?
        </h2>
        <p className={paragraphClasses}>
            Analysis of the 1KGP samples using ImmuneDiscover revealed several critical points that both 
            enable and limit the use of LCL samples in IG genotyping. The samples are derived from EBV 
            transformed polyclonal B cells that have undergone different IG rearrangements on one haplotype 
            in each cell. In some cases, the cell line may be oligoclonal and contain cells that have undergone 
            rearrangement on both haplotypes. Our analysis of the frequency of DJ rearrangements, which occurs 
            prior to VDJ rearrangements, revealed that DNA from LCL samples of the vast majority of the 1KGP cases 
            contained enough unrearranged template to allow complete IGHV genotyping and calculation of population 
            frequencies for each allelic variant (Corcoran et al. Immunity 2026, Figure S2C-F). However, the 
            frequency of JD rearrangements means that J and D genotyping is less reliable for 1KGP cases, and 
            we therefore made the decision not to calculate IGHJ and IGHD allele frequencies from the 1KGP genotyping 
            results.
        </p>
        <h2 id="faq-heading" className={FAQH_2}>
            Is potential SHM present in lymphoblastoid cell lines an issue?
        </h2>
        <p className={paragraphClasses}>
            LCL samples contain a mixture of DNA templates that have or have not acquired somatic 
            hypermutation (SHM)-associated mutations within the rearranged V, D and J genes. Thus, 
            care must be taken in the analysis process to handle this. ImmuneDiscover genotyping has 
            two independent approaches to avoid including false-positive, mutated sequences in its 
            genotyping output. 
        </p>
        <ol className={orderedListClasses}>
          <li className={listClasses}>
            ImmuneDiscover libraries are produced using primers that target unrearranged V, D and J genes, 
            while rearranged sequences are not targeted and therefore not amplified. This approach excludes 
            the vast majority of SHM associated variation.
          </li>
          <li className={listClasses}>
            SHM of unrearranged genes is largely limited to when a V or J gene is positioned in the 
            immediate physical vicinity of a rearranged gene. This is particularly the case for J genes if 
            downstream unrearranged genes are present within approximately 3 kb of a rearranged neighboring J 
            gene. In the case of V genes, the distance between the genes is sufficient in most cases to avoid 
            SHM &rsquo;spreading&rsquo; to unrearranged neighbors. One exception is IGHV2-70/IGHV2-70D, which is located within 
            9 kb of the frequently rearranged IGHV1-69/IGH1-69D gene. In the KIARVA analysis of the 1KGP dataset, 
            we therefore required that all IGHV allelic sequences were present in at least 2 cases, with a higher 
            stringency applied for IGHV1-69 (4 cases required) and IGHV2-70/2-70D (10 cases required). 
          </li>
        </ol>
        <p className={paragraphClasses}>
            The issue of localized SHM spreading to unrearranged genes is specific to LCL samples and is 
            not an issue when using ImmuneDiscover for IG genotype using other genomic DNA templates.
        </p>
        <h2 id="faq-heading" className={FAQH_2}>
            How do we know that the alleles are accurate?
        </h2>
        <p className={paragraphClasses}>
            Care has been taken to ensure the accuracy of the alleles present within KIARVA, with several 
            steps of cross-validation.
        </p>
        <ol className={orderedListClasses}>
            <li className={listClasses}>
                The accuracy of the ImmuneDiscover procedure was confirmed using a validation cohort of 90 
                cases, the KI cohort. These 90 samples were genotyped using two independent methods, 
                IgDiscover (using two independent IgM libraries for each case) and ImmuneDiscover, resulting 
                in highly concordant results (Corcoran et al. Immunity 2026, Figure 1E and G). 
            </li>
            <li className={listClasses}>
                We further used the IgSNPer program to screen all alleles identified to confirm the presence 
                of allele specific SNP variants in an amalgamated cohort of over 1.2 million individuals.
            </li>
            <li className={listClasses}>
                All IGHV allele variants present in the KIARVA database were confirmed to be present in at 
                least two individuals, with the IGHV1-69 and IGHV2-70 variants (those most susceptible to 
                SHM spreading from neighbouring rearranged genes) requiring presence in four and ten individuals, 
                respectively. 
            </li>
        </ol>
        <h2 id="faq-heading" className={FAQH_2}>
            How many IGHV alleles are there yet to identify?
        </h2>
        <p className={paragraphClasses}>
            Saturation analysis in the accompanying paper indicates that of the population groups analyzed, the 
            set of alleles present in at least two individuals is approaching saturation (Corcoran et al. 2026, 
            Figure 2H). The populations included in the 1KGP set represent the major continental human population 
            groups. However, it is likely that additional populations that are not represented in the 1KGP set, 
            for example individuals from South-East Asia, the Middle East and Oceania, contain variants that are 
            local and even frequent within their own populations. 
        </p>
      </section>
    </main>
  );
}
