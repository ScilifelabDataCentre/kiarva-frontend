"use server";

import { H_2, YouTubeVideos } from "@/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import VideoIframe from "@/components/YoutubeIframe";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NewsCarousel from "@/components/NewsCarousel";

function DisplayService(props: {video: string, title: string, url: string}) {
  return (
    <div className="relative w-full rounded-lg border p-4 gap-6 flex flex-col bg-muted">
      <h3 className="text-xl lg:text-2xl font-bold">
        {props.title}
      </h3>
      <Accordion
          type="single"
          collapsible
          className="w-full rounded-lg hover:bg-primary/20"
          role="region"
        >
        <AccordionItem value="item-1">
          <AccordionTrigger className="pl-2">
            Watch example video
          </AccordionTrigger>
          <AccordionContent>
              <VideoIframe className="w-full aspect-video max-w-[36em] pl-2" 
                videoId={YouTubeVideos[props.video].address} 
                videoTitle={YouTubeVideos[props.video].title} 
              />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        variant="default"
        size="default"
        className="w-1/3"
        asChild
        >
        <Link href={"/" + props.url}>Go to page</Link>
      </Button>
    </div>
  )
}

export default async function HomePage() {
  const textLinkClasses: string = "font-medium text-fg-brand hover:underline";
  return (
    <main className="bg-base-100 space-y-4 lg:space-y-6 p-4 lg:px-12 lg:pb-18 xl:px-24 xl:pb-28 2xl:max-w-screen-2xl 2xl:mx-auto">
      <h1 className="sr-only">
        KIARVA - Adaptive Immune Receptor Gene Variant Atlas
      </h1>
      <section
        aria-labelledby="welcome-heading"
      >
        <h2 id="welcome-heading" className={H_2}>Welcome to KIARVA</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:max-w-full items-stretch gap-x-6 gap-y-6 lg:gap-y-0 mb-6 mt-6">
          <p className="pr-2 lg:pr-8">
            Variation between individuals and populations within the 
            genomic loci encoding adaptive immune receptor genes (immunoglobulin 
            (IG) and T cell receptor (TCR)) involves both structural and allelic 
            diversity. The first release of the Karolinska Institutet Adaptive 
            Immune Receptor Gene Variant Atlas &mdash; <b>KIARVA</b> &mdash; hosts validated 
            germline-encoded IG heavy chain (IGH) alleles identified in 2486 
            individuals from the 1000 Genomes Project (1KGP) collection.<br /><br />

            We chose to use the 1KGP collection as these are often used by population 
            geneticists to examine global human genetic variation. The results 
            provided in <b>KIARVA</b> can therefore be integrated into a larger body of 
            research involving the same populations and individual donor cases and 
            provides a means to test, compare and benchmark future genotyping protocols. 
            As additional alleles are discovered in populations and individuals that 
            are not represented in the 1KGP set they will be presented as part of 
            separate publications.<br /><br />

            <b>KIARVA</b> is open source and provides downloadable FASTA files of 561 IGHV, 
            51 IGHD and 12 IGHJ alleles, as well as information about the frequency 
            of each IGHV allele in 5 continental superpopulations and 25 subpopulations. 
            Soon, <b>KIARVA</b> will be extended to also contain population-based information 
            about IG kappa (IGK), lambda (IGK) and TCR alleles.<br /><br />

            <b>When using this database, please cite Corcoran et al. Immunity 2026.
            The resource should not be used for commercial purposes.
            For questions, please contact the authors.
            </b>
            <br /><br />
            For more information about KIARVA, see the pages{" "}
            <Link href="/methodology" className={textLinkClasses}>
              Methodology
            </Link>
            ,{" "}
            <Link href="/faq" className={textLinkClasses}>
              FAQ
            </Link>{" "}
            and{" "}
            <Link href="/about" className={textLinkClasses}>
              About
            </Link>
            .
          </p>
          <VideoIframe className="max-w-full aspect-video w-[36em]" 
            videoId={YouTubeVideos["intro"].address} 
            videoTitle={YouTubeVideos["intro"].title}
          />
        </div>
      </section>
      <div className="divider pt-4" aria-hidden="true" />
      <section
        aria-labelledby="news-heading"
      >
        <h2 id="news-heading" className={H_2}>News</h2>
          <NewsCarousel />
      </section>
      <div className="divider pt-4" aria-hidden="true" />
      <section
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" className={H_2}>
          Resources
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:max-w-full items-stretch gap-6 mb-6 mt-6">
          <DisplayService video="download" title="Download FASTA files" url="download" />
          <DisplayService video="frequencies" title="View population frequencies" url="plot" />
          <DisplayService video="alignments" title="View sequence alignments" url="msa" />
          <DisplayService video="search" title="Search for sequences" url="sequencesearch" />
        </div>
      </section>
    </main>
  );
}
