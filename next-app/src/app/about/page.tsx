import { ReactElement } from "react";
import { BODY_CLASSES, H_1, LINK_CLASSES } from "@/constants";
import { ExternalLink } from "lucide-react";

export default function AboutPage(): ReactElement {
  const pageTitle: string = "About Us";

  return (
    <main className={BODY_CLASSES}>
      <h1 className={H_1}>{pageTitle}</h1>

      <section aria-labelledby="kiarva-dashboard-heading">
        <h2 id="kiarva-dashboard-heading" className="divider pt-4">
          KIARVA dashboard
        </h2>
        <p className="pb-8 text-left lg:text-justify text-sm lg:text-base">
          To create KIARVA, we applied a high throughput genomic technique
          designed for adaptive immune receptor germline gene sequencing,
          ImmuneDiscover (Corcoran et al. Immunity 2026), to 2486 cases from the
          1000 Genomes Project (1KGP),{" "}
          <a
            href="https://www.internationalgenome.org/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${LINK_CLASSES} italic`}
          >
            https://www.internationalgenome.org/
          </a>
          . The 1KGP sample set comprises 5 super-populations: 708 African cases
          (AFR), 414 European cases (EUR), 540 East Asian cases (EAS) and 543
          South Asian cases (SAS) and 281 American cases (AMR) representing 25
          sub-population groups. This resulted in the identification of 561
          IGHV, 51 IGHD and 12 IGHJ germline variants, many of which are
          reported here for the first time, as well as information about their
          population frequencies and validation scores using the IgSNPer
          program. KIARVA will host downloadable IGHV, IGHD and IGHJ allele
          database files comprising sequences with and without flanking regions
          for use in highly accurate antibody sequence assignment analysis and
          gene association studies. Future updates of KIARVA will include
          immunoglobulin light chain (kappa and lambda) and TCR (alpha, beta,
          delta and gamma) variants from the 1KGP sample collection in addition
          to constant exon variants from each of the receptor subtypes.
        </p>
      </section>

      <section aria-labelledby="funding-heading">
        <h2 id="funding-heading" className="divider pt-4">
          Funding
        </h2>
        <p className="pb-8 text-left lg:text-justify text-sm lg:text-base">
          Funding for this project was generously provided by a Distinguished
          Professor grant from the Swedish Research Council (2017-00968) and a
          European Research Council (ERC) Advanced Grant - ImmuneDiversity
          (788016) to GBKH.
        </p>
      </section>

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="divider pt-4">
          Contact
        </h2>
        <address className="not-italic pb-8">
          <p className="text-left lg:text-justify text-sm lg:text-base mb-4">
            For technical questions related to the website, please contact:
          </p>
          <p className="text-left lg:text-justify text-sm lg:text-base mb-4">
            <strong>
              Data Science Node in Precision Medicine & Diagnostics
            </strong>
            {" — "}
            <a
              href="mailto:precisionmedicine@scilifelab.se"
              className={`${LINK_CLASSES} italic`}
            >
              precisionmedicine@scilifelab.se
            </a>
          </p>
          <p className="text-left lg:text-justify text-sm lg:text-base mb-4">
            For questions related to the scientific content, please contact:
          </p>
          <p className="text-left lg:text-justify text-sm lg:text-base mb-4">
            <strong>Martin Corcoran</strong>
            {" — "}
            <a
              href="mailto:Martin.Corcoran@ki.se"
              className={`${LINK_CLASSES} italic`}
            >
              Martin.Corcoran@ki.se
            </a>
          </p>
          <p className="text-left lg:text-justify text-sm lg:text-base">
            <strong>Gunilla Karlsson Hedestam</strong>
            {" — "}
            <a
              href="mailto:Gunilla.Karlsson.Hedestam@ki.se"
              className={`${LINK_CLASSES} italic`}
            >
              Gunilla.Karlsson.Hedestam@ki.se
            </a>
          </p>
        </address>
      </section>

      <section aria-labelledby="team-heading">
        <h2 id="team-heading" className="divider pt-4">
          Team
        </h2>

        {/* Group summary card */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Header band */}
          <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-5 sm:px-8 sm:py-6">
            <p className="text-xs sm:text-sm font-medium tracking-wide uppercase text-white/70">
              Karolinska Institutet &middot; Dept. of Microbiology, Tumor and
              Cell Biology
            </p>
            <h3 className="mt-1 text-lg sm:text-xl lg:text-2xl font-semibold text-white leading-snug">
              Genetic Basis for B and T Cell Recognition and Function
            </h3>
            <p className="mt-1 text-sm sm:text-base text-white/90">
              Gunilla Karlsson Hedestam Group
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-6 sm:px-8 sm:py-8 space-y-8">
            {/* Introductory overview */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Our research focuses on adaptive immune responses and qualitative
              properties of B- and T-cell repertoires. A specific interest is to
              understand individual variation in germline V, D and J genes and
              how this influences antigen-specific responses in the context of
              infection, vaccination and autoimmunity.
            </p>

            {/* Team link */}
            <a
              href="https://ki.se/en/research/research-areas-centres-and-networks/research-groups/genetic-basis-for-b-and-t-cell-recognition-and-function-gunilla-karlsson-hedestam-group"
              target="_blank"
              rel="noopener noreferrer"
              className={`${LINK_CLASSES} inline-flex items-center gap-1.5 text-sm font-medium text-primary`}
            >
              Visit the group page at Karolinska Institutet
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
