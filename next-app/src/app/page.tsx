"use client";

import { ReactElement, ReactNode } from "react";
import { BODY_CLASSES } from "@/constants";
import Link from "next/link";
import { BadgeInfo, Rss, type LucideIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const downloadHeroBackground = "images/heroFastaImage.png";
const plotHeroBackground = "images/heroPlotImage.png";
const alignmentHeroBackground = "images/heroAlignmentImage.png";
const searchHeroBackground = "images/heroSearchImage.png";

const newsDate = new Date("2025-06-25");

interface FadeAlertProps {
  children: ReactNode;
  title: string;
  icon: LucideIcon;
}

function FadeAlert({ children, title, icon: Icon }: FadeAlertProps) {
  const [showFade, setShowFade] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = contentRef.current;
        setShowFade(
          scrollHeight > clientHeight &&
            scrollHeight - clientHeight - scrollTop > 1
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    const currentRef = contentRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkOverflow);
    }

    return () => {
      window.removeEventListener("resize", checkOverflow);
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkOverflow);
      }
    };
  }, []);

  return (
    <Alert className="flex-grow lg:basis-1/2 lg:my-5">
      <Icon className="h-6 w-6" />
      <AlertTitle className="text-sm lg:text-base mb-4">{title}</AlertTitle>
      <AlertDescription className="text-sm lg:text-base relative">
        <div ref={contentRef} className="max-h-60 overflow-y-auto pr-2">
          {children}
        </div>
        {showFade && (
          <div className="absolute bottom-0 left-0 right-2 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        )}
      </AlertDescription>
    </Alert>
  );
}

export default function HomePage(): ReactElement {
  return (
    <main className={BODY_CLASSES}>
      <h1 className="sr-only">
        KIARVA - Adaptive Immune Receptor Gene Variant Atlas
      </h1>

      <section
        aria-labelledby="welcome-news-heading"
        className="flex flex-col lg:flex-row items-stretch place-items-center gap-6 mb-6"
      >
        <h2 id="welcome-news-heading" className="sr-only">
          Welcome and News
        </h2>
        <FadeAlert title="Welcome to KIARVA" icon={BadgeInfo}>
          <p>
            Variation between individuals and populations within the
            immunoglobulin (IG) locus involves both structural and allelic
            diversity. The Karolinska Institutet Adaptive Immune Receptor Gene
            Variant Atlas (<b>KIARVA</b>) hosts germline-encoded IG heavy chain
            (IGH) alleles identified in 2486 individuals from the 1000 Genomes
            Project (1KGP) collection, in total 561 IGHV, 51 IGHD and 12 IGHJ
            alleles. <b>KIARVA</b> is open source and provides downloadable
            FASTA files with all sequences, as well as information about the
            frequency of each allele in 5 superpopulations and 25
            subpopulations. In the near future, KIARVA will be extended to also
            contain population-based information about IG kappa and lambda
            genes, as well as T cell receptor genes. When using this database,
            please cite Corcoran et al. BioRxivXX and if using the resource for
            commercial purposes, please contact the authors.
          </p>
        </FadeAlert>

        <FadeAlert title="News" icon={Rss}>
          <time
            dateTime={newsDate.toISOString()}
            className="block italic mb-2 text-muted-foreground"
          >
            {newsDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <p>
            We are excited to introduce our new research tool, designed to
            provide an interactive overview of the KIARVA dataset. This release
            includes population frequency plots, multiple sequence alignments,
            sequence search, and downloadable FASTA files.
          </p>
        </FadeAlert>
      </section>

      <section
        aria-labelledby="features-heading"
        className="flex flex-col max-w-xs md:max-w-sm lg:max-w-full lg:flex-row m-auto gap-6 mb-6"
      >
        <h2 id="features-heading" className="sr-only">
          Main Features
        </h2>
        <article className="relative hero min-h-80 bg-neutral">
          <img
            className="object-cover size-full"
            src={downloadHeroBackground}
            alt="Download FASTA files"
          />
          <div
            className="absolute inset-0 bg-gray-700 opacity-85"
            aria-hidden="true"
          ></div>
          <div className="hero-content text-secondary-content text-center">
            <div className="max-w-md flex flex-col items-center">
              <h3 className="mb-5 text-2xl lg:text-3xl font-bold">
                Download FASTA files
              </h3>
              <Button
                variant="default"
                size="default"
                asChild
                onClick={() => window.scrollTo(0, 0)}
              >
                <Link href="/download">Go to page</Link>
              </Button>
            </div>
          </div>
        </article>
        <article className="relative hero min-h-80 bg-neutral">
          <img
            className="object-cover size-full"
            src={plotHeroBackground}
            alt="View population frequencies"
          />
          <div
            className="absolute inset-0 bg-gray-700 opacity-85"
            aria-hidden="true"
          ></div>
          <div className="hero-content text-secondary-content text-center">
            <div className="max-w-md flex flex-col items-center">
              <h3 className="mb-5 text-2xl lg:text-3xl font-bold">
                View population frequencies
              </h3>
              <Button
                variant="default"
                size="default"
                asChild
                onClick={() => window.scrollTo(0, 0)}
              >
                <Link href="/plot">Go to page</Link>
              </Button>
            </div>
          </div>
        </article>
        <article className="relative hero min-h-80 bg-neutral">
          <img
            className="object-cover size-full"
            src={alignmentHeroBackground}
            alt="View sequence alignments"
          />
          <div
            className="absolute inset-0 bg-gray-700 opacity-85"
            aria-hidden="true"
          ></div>
          <div className="hero-content text-secondary-content text-center">
            <div className="max-w-md flex flex-col items-center">
              <h3 className="mb-5 text-2xl lg:text-3xl font-bold">
                View sequence alignments
              </h3>
              <Button
                variant="default"
                size="default"
                asChild
                onClick={() => window.scrollTo(0, 0)}
              >
                <Link href="/msa">Go to page</Link>
              </Button>
            </div>
          </div>
        </article>
        <article className="relative hero min-h-80 bg-neutral">
          <img
            className="object-cover size-full"
            src={searchHeroBackground}
            alt="Search for sequences"
          />
          <div
            className="absolute inset-0 bg-gray-700 opacity-85"
            aria-hidden="true"
          ></div>
          <div className="hero-content text-secondary-content text-center">
            <div className="max-w-md flex flex-col items-center">
              <h3 className="mb-5 text-2xl lg:text-3xl font-bold">
                Search for sequences
              </h3>
              <Button
                variant="default"
                size="default"
                asChild
                onClick={() => window.scrollTo(0, 0)}
              >
                <Link href="/sequencesearch">Go to page</Link>
              </Button>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
