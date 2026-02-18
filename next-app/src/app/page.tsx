"use server";

import { BODY_CLASSES, H_2, YouTubeVideos } from "@/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import VideoIframe from "@/components/YoutubeIframe";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const newsImage1 = "/images/KIARVANewsThumbnail.jpeg";

const newsDate = new Date("2026-02-01");

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
              <VideoIframe className="max-w-full max-h-full w-[36em] h-[20em] lg:w-[32em] lg:h-[18em] xl:w-[36em] xl:h-[20em] pl-2" 
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

function DisplayNews(props: {imageName: string, imageAlt: string, children: React.ReactNode}) {
  return (
    <div className="flex flex-row gap-x-4">
      <img className="max-h-64 max-w-64" src={props.imageName} alt={props.imageAlt} aria-hidden="true" />
      {props.children}
    </div>
  )
}

export default async function HomePage() {
  const textLinkClasses: string = "font-medium text-fg-brand hover:underline";
  return (
    <main className={BODY_CLASSES}>
      <h1 className="sr-only">
        KIARVA - Adaptive Immune Receptor Gene Variant Atlas
      </h1>
      <section
        aria-labelledby="welcome-heading"
      >
        <h2 id="welcome-heading" className="text-lg font-semibold mb-2">Welcome to KIARVA</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:max-w-full items-stretch gap-x-6 gap-y-6 lg:gap-y-0 mb-6">
          <p className="lg:pr-8">
            Variation between individuals and populations within the 
            immunoglobulin (IG) locus involves both structural and allelic 
            diversity. The Karolinska Institutet Adaptive Immune Receptor Gene 
            Variant Atlas (<b>KIARVA</b>) hosts germline-encoded IG heavy chain 
            (IGH) alleles identified in 2486 individuals from the 1000 Genomes 
            Project (1KGP) collection, in total 561 IGHV, 51 IGHD and 12 IGHJ 
            alleles. <b>KIARVA</b> is open source and provides downloadable 
            FASTA files with all sequences, as well as information about the 
            frequency of each IGHV allele in 5 continental superpopulations and 25 
            subpopulations. As soon as possible, <b>KIARVA</b> will be extended to also 
            contain population-based information about IG kappa and lambda 
            genes, as well as T cell receptor genes.<br /><br />

            <b>When using this database, please cite Corcoran et al. Immunity 2026.
            The resource should not be used for commercial purposes.
            For questions, please contact the authors.
            </b>
          </p>
          <VideoIframe className="max-w-full max-h-full w-[36em] h-[20em] lg:w-[36em] lg:h-[20.25em] xl:w-[40em] xl:h-[22.5em]" 
            videoId={YouTubeVideos["intro"].address} 
            videoTitle={YouTubeVideos["intro"].title}
          />
        </div>
      </section>
      <h2 className="divider pt-4"/>
      <section
        aria-labelledby="news-heading"
      >
        <h2 id="news-heading" className="text-lg mb-4 lg:mb-2 font-semibold">News</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:max-w-full items-stretch gap-y-6 gap-x-6 lg:gap-y-0 mb-6">
          <DisplayNews imageName={newsImage1} imageAlt="DNA-strand">
            <div>
              <time
                dateTime={newsDate.toISOString()}
                className="block italic mb-2"
                >
                {newsDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  // day: "numeric",
                })}
              </time>
              <p className="lg:pr-8">
                We are happy to release the first public version of our new research tool, KIARVA. 
                Please visit our introduction and instruction videos and note that you can find 
                Frequently Asked Questions (FAQs) under “Additional information” in the top menu.
              </p>
            </div>
          </DisplayNews>
        </div>
      </section>
      <h2 className="divider pt-4"/>
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
      <p className="pt-10 text-lg">
        For more information about KIARVA, see the pages <Link href="/methodology" className={textLinkClasses}>Methodology</Link>, <Link href="/faq" className={textLinkClasses}>FAQ</Link> and <Link href="/about" className={textLinkClasses}>About</Link>.
      </p>
    </main>
  );
}
