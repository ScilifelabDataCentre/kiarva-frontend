// turn into server component

"use client";

import { ReactElement } from "react";
import PublicationComponent from "@/components/PublicationComponent";
import { BODY_CLASSES, H_1 } from "@/constants";

export default function PublicationsPage(): ReactElement {
  return (
    <main className={BODY_CLASSES}>
      <h1 className={H_1}>Publications</h1>

      <aside
        className="alert"
        role="note"
        aria-label="Publications information"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <p className="text-sm lg:text-base">
          This page displays scientific publications that have cited the KI
          Adaptive Immune Receptor Gene Variant Atlas. If you reference the
          Atlas in your research and publish your findings, please notify the
          Hedestam research group.
        </p>
      </aside>

      <section aria-labelledby="publications-heading">
        <h2 id="publications-heading" className="sr-only">
          Publication list
        </h2>
        <ul className="list-none pt-2 pb-4">
          <li>
            <PublicationComponent
              linkUrl=""
              title="Ultra-high throughput IGH genotyping of 25 global populations reveals population-biased allelic diversity and homozygous IGHV and IGHD gene deletions"
              authors="Martin Corcoran, Sanjana Narang, Mateusz Kaduk, Mark Chernyshev, Anna Färnert, Christopher Sundling and Gunilla B. Karlsson Hedestam"
              journal="Corcoran et al. Immunity 2026"
              bgColor="bg-neutral"
            />
          </li>
        </ul>
      </section>
    </main>
  );
}
