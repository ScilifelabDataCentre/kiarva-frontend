// Should be server component, has no user interactivity.

"use client";

import { ReactElement } from "react";
import { ILink } from "@/interfaces/types";
import { LINK_CLASSES } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DisplayAppVersion from "@/components/DisplayAppVersion";
import { Button } from "@/components/ui/button";

const footerBackground = "images/hedestamFooterImage.png";

export default function FooterComponent(): ReactElement {
  const links: { [id: string]: ILink } = {
    l1: {
      text: "Download FASTA files",
      classes: LINK_CLASSES,
      link: "/download",
    },
    l2: {
      text: "Population frequencies",
      classes: LINK_CLASSES,
      link: "/plot",
    },
    l3: { text: "Methodology", classes: LINK_CLASSES, link: "/methodology" },
    l4: { text: "Change log", classes: LINK_CLASSES, link: "/changelog" },
    l5: { text: "Publications", classes: LINK_CLASSES, link: "/publications" },
    l6: { text: "About", classes: LINK_CLASSES, link: "/about" },
  };

  const currentPath = usePathname();

  return (
    <div className="relative bg-primary">
      <img
        className="h-64 w-full object-cover"
        src={footerBackground}
        alt="Footer Background Image"
      />
      <div className="absolute inset-0 bg-gray-700 opacity-85"></div>
      <footer className="absolute inset-0 footer footer-center pt-4 lg:pt-10 px-4 lg:px-36 2xl:max-w-screen-2xl 2xl:mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 z-10">
          <p className="text-primary-content text-base lg:text-lg font-semibold">
            Please visit the other pages of KIARVA
          </p>
          <nav className="grid grid-flow-row grid-cols-2 lg:grid-flow-col gap-2 lg:gap-4">
            {Object.keys(links)
              .filter((key) => links[key].link !== currentPath) // Filter out the current page link
              .map((key) => (
                <Button
                  key={key}
                  variant="default"
                  size="sm"
                  asChild
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <Link href={links[key].link} rel="noopener noreferrer">
                    {links[key].text}
                  </Link>
                </Button>
              ))}
          </nav>
          <DisplayAppVersion />
        </div>
      </footer>
    </div>
  );
}
