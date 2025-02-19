"use client";

import { ReactElement, ReactNode } from "react";
import { BODY_CLASSES } from "@/constants";
import { TrackPageViewIfEnabled } from "@/util/cookiesHandling";
import Link from "next/link";
import { BadgeInfo, Rss, type LucideIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const downloadHeroBackground = "images/heroDownloadImage.jpg";
const plotHeroBackground = "images/heroPlotImage.jpg";

const newsDate = new Date("2024-11-13");

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
  TrackPageViewIfEnabled();

  return (
    <div>
      <div className={BODY_CLASSES}>
        <div className="flex flex-col lg:flex-row items-stretch place-items-center gap-6 mb-6">
          <FadeAlert title="Welcome to KIARVA" icon={BadgeInfo}>
            <p>
              Variation between individuals and populations within the
              immunoglobulin (IG) locus involves both structural and allelic
              diversity. The Karolinska Institutet Adaptive Immune Receptor Gene
              Variant Atlas (<b>KIARVA</b>) hosts germline-encoded IG heavy
              chain (IGH) alleles identified in 2485 individuals from the 1000
              Genomes Project (1KGP) collection, in total 479 IGHV, 10 IGHJ and
              40 IGHD alleles. <b>KIARVA</b> is open source and provides
              downloadable FASTA files with all sequences, as well as
              information about the frequency of each allele in 5
              superpopulations and 25 subpopulations. In the near future, KIARVA
              will be extended to also contain population-based information
              about IG kappa and lambda genes, as well as T cell receptor genes.
              When using this database, please cite Corcoran et al. BioRxivXX,
              and when using the resource for commercial purposes, contact the
              authors.
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
            We are excited to introduce the <b>light version</b> of our new
            research tool, designed to provide an early glimpse into the
            DSN&apos;s first dashboard. This preliminary release includes a few
            example plots to showcase the tool&apos;s analytical capabilities,
            while the full functionality is being finalized. In this light
            version, users can explore data visualizations but won&apos;t have
            access to download FASTA files at this stage. The complete tool,
            including all data and download options, will be available once the
            research team has published their findings.
          </FadeAlert>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-6">
          <div className="relative hero min-h-96 bg-neutral">
            <img
              className="object-cover w-full h-full"
              src={downloadHeroBackground}
              alt="Download Hero Image"
            />
            <div className="absolute inset-0 bg-gray-700 opacity-85"></div>
            <div className="hero-content text-secondary-content text-center">
              <div className="max-w-md flex flex-col items-center">
                <h1 className="mb-5 text-2xl lg:text-3xl font-bold text-nowrap">
                  Download FASTA files
                </h1>
                <p className="mb-5 text-sm lg:text-base">
                  Click on the button to see the light version
                </p>
                <Link href="/download">
                  <button
                    className="text-info-content text-base flex justify-center items-center w-24 sm:w-36 h-10 px-8 py-2 bg-info font-bold opacity-100 rounded-lg shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-fuchsia-800"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Go
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative hero min-h-96 bg-neutral">
            <img
              className="object-cover w-full h-full"
              src={plotHeroBackground}
              alt="Plot Image"
            />
            <div className="absolute inset-0 bg-gray-700 opacity-85"></div>
            <div className="hero-content text-secondary-content text-center">
              <div className="max-w-md flex flex-col items-center">
                <h1 className="mb-5 text-2xl lg:text-3xl font-bold">
                  Population frequencies
                </h1>
                <p className="mb-5 text-sm lg:text-base">
                  Click on the button to see the light version
                </p>
                <Link href="/plot">
                  <button
                    className="text-info-content text-base flex justify-center items-center w-24 sm:w-36 h-10 px-8 py-2 bg-info font-bold opacity-100 rounded-lg shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-fuchsia-800"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Go
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
