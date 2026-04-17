// turn into server component

"use client";

import { ReactElement } from "react";
import PublicationComponent from "@/components/PublicationComponent";
import { BODY_CLASSES, H_1 } from "@/constants";

export default function PublicationsPage(): ReactElement {
  return (
    <main className={BODY_CLASSES}>
      <h1 className={H_1}>Publications</h1>

      <section aria-labelledby="publications-heading">
        <h2 id="publications-heading" className="sr-only">
          Publication list
        </h2>
        <ul className="list-none pt-2 pb-4">
          <li>
            <PublicationComponent
              linkUrl="https://doi.org/10.1016/j.immuni.2026.01.026"
              title="Ultra-high throughput IGH genotyping of 25 global populations reveals population-biased allelic diversity and homozygous V and D gene deletions"
              authors="Martin Corcoran, Sanjana Narang, Mateusz Kaduk, Mark Chernyshev, Anna Färnert, Christopher Sundling and Gunilla B. Karlsson Hedestam"
              journal="Corcoran et al. Immunity 2026"
              bgColor="bg-neutral"
            />
            <PublicationComponent
              linkUrl="https://doi.org/10.1016/j.immuni.2026.03.002"
              title="Genetically diverse influenza antibodies highlight the role of IG germline gene variation and inform population-comprehensive vaccine strategies"
              authors="Alexandra A. Fischer#, Martin Corcoran#, Philip J. M. Brouwer, Mark Chernyshev, Rebecca A. Gillespie, Andrea Nicoletto, Johannes R. Loeffler, James A. Ferguson, Ioannis Zygouras, Pradeepa Pushparaj, Alesandra J. Rodriguez, Sanjana Narang, Marit J. van Gils, Xaquin Castro Dopico, Masaru Kanekiyo, Andrew B. Ward, Julianna Han, and Gunilla B. Karlsson Hedestam"
              journal="Fischer, Corcoran et al. Immunity 2026"
              bgColor="bg-neutral"
            />      
            <PublicationComponent
              linkUrl="https://www.cell.com/cell-reports/fulltext/S2211-1247(26)00258-5"
              title="Structural and immunogenetic signatures guide CD4-mimetic HIV vaccine development"
              authors="Daniel L.V. Bader, Claudia T. Flynn, Oleksandr Kalyuzhniy, Gabriel Ozorowski, Martin M. Corcoran, Alison Burns, Pilar Altman, Romy Rouzeau, Troy Sincomb, Alessia Liguori, Monica L. Fernández-Quintero, Johannes R. Loeffler, Jonathan L. Torres, Hannah L. Turner, Erik Georgeson, Amelia Zhou, Hannah Voic, Sue Goo, Lara Shahin, Iszac Burton, Mengyu Wu, Robyn L. Stanfield, Saman Eskandarzadeh, Danny Lu, Nushin Alavi, Nicole Phelps, Ryan Tingle, Katherine McKenney, John Youhanna, Sonya Amirzehni, Torben Schiffner, Jon M. Steichen, Dennis R. Burton, Ian A. Wilson, Gunilla B. Karlsson Hedestam, Elise Landais, Jeong Hyun Lee, Devin Sok, Christopher A. Cottrell, Andrew B. Ward, William R. Schief"
              journal="Bader et al. Cell Reports 2026"
              bgColor="bg-neutral"
            />      
          </li>
        </ul>
      </section>
    </main>
  );
}
