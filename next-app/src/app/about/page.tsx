// Should be server component, has no user interactivity that I can see.

"use client";

import { ReactElement } from "react";
import ProfileComponent from "@/components/ProfileComponent";
import { BODY_CLASSES, H_1, LINK_CLASSES } from "@/constants";

const martinCorcoran = "/images/martinCorcoran.png";
const sanjanaNarang = "/images/sanjanaNarang.png";
const mateuszKaduk = "/images/mateuszKaduk.png";
const markChernyshev = "/images/markChernyshev.png";
const gunillaKarlssonHedestam = "/images/gunillaKarlssonHedestam.png";

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
          ImmuneDiscover (Corcoran et al. BioRXiv), to 2486 cases from the 1000
          Genomes Project (1KGP),{" "}
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
        <p className="text-left lg:text-justify text-sm lg:text-base">
          For technical questions related to the website, please contact:
          <br />
          <strong>Data Science Node in Precision Medicine & Diagnostics</strong>
          —
          <a
            href="mailto:precisionmedicine@scilifelab.se"
            className={`${LINK_CLASSES} italic`}
          >
            precisionmedicine@scilifelab.se
          </a>
          <br />
        </p>
        <p className="pb-8 text-left lg:text-justify text-sm lg:text-base">
          For questions related to the scientific content, please contact:
          <br />
          <strong>Martin Corcoran</strong>—
          <a
            href="mailto:Martin.Corcoran@ki.se"
            className={`${LINK_CLASSES} italic`}
          >
            Martin.Corcoran@ki.se
          </a>
          <br />
          <strong>Gunilla Karlsson Hedestam</strong>—
          <a
            href="mailto:Gunilla.Karlsson.Hedestam@ki.se"
            className={`${LINK_CLASSES} italic`}
          >
            Gunilla.Karlsson.Hedestam@ki.se
          </a>
        </p>
      </section>

      <section aria-labelledby="team-heading">
        <h2 id="team-heading" className="divider pt-4">
          Team
        </h2>
        <ul className="list-none">
          <li>
            <ProfileComponent
              imageUrl={martinCorcoran}
              linkUrl="https://ki.se/personer/martin-corcoran"
              name="Martin Corcoran"
              title="Head of Immunogenetics"
              bgColor="bg-neutral"
            />
          </li>
          <li>
            <ProfileComponent
              imageUrl={sanjanaNarang}
              linkUrl="https://ki.se/en/people/sanjana-narang"
              name="Sanjana Narang"
              title="Post-doctoral Scientist"
              bgColor="bg-white"
            />
          </li>
          <li>
            <ProfileComponent
              imageUrl={mateuszKaduk}
              linkUrl="https://ki.se/en/people/mateusz-kaduk"
              name="Mateusz Kaduk"
              title="Bioinformatician"
              bgColor="bg-neutral"
            />
          </li>
          <li>
            <ProfileComponent
              imageUrl={markChernyshev}
              linkUrl="https://ki.se/en/people/mark-chernyshev"
              name="Mark Chernyshev"
              title="PhD student / Bioinformatician"
              bgColor="bg-white"
            />
          </li>
          <li>
            <ProfileComponent
              imageUrl={gunillaKarlssonHedestam}
              linkUrl="https://ki.se/en/research/research-areas-centres-and-networks/research-groups/genetic-basis-for-b-and-t-cell-recognition-and-function-gunilla-karlsson-hedestam-group#tab-start"
              name="Gunilla Karlsson Hedestam"
              title="Professor / Group leader"
              bgColor="bg-neutral"
            />
          </li>
        </ul>
      </section>
    </main>
  );
}
