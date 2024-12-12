"use client";

import Link from "next/link";
import { ILink } from "@/interfaces/types";
import { LINK_CLASSES } from "@/constants";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { HeaderDropdown } from "@/components/ui/header-dropdown";

export default function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const links: { [id: string]: ILink } = {
    l1: { text: "Download", classes: LINK_CLASSES, link: "/download" },
    l2: {
      text: "Population frequencies",
      classes: LINK_CLASSES,
      link: "/plot",
    },
    l3: {
      text: "Alignments",
      classes: LINK_CLASSES,
      link: "/msa",
    },
    l4: {
      text: "Sequence search",
      classes: LINK_CLASSES,
      link: "/sequencesearch",
    },
    l5: { text: "Methodology", classes: LINK_CLASSES, link: "/methodology" },
    l6: { text: "Change log", classes: LINK_CLASSES, link: "/changelog" },
    l7: { text: "Publications", classes: LINK_CLASSES, link: "/publications" },
    l8: { text: "About", classes: LINK_CLASSES, link: "/about" },
  };

  const mainLinks = Object.fromEntries(Object.entries(links).slice(0, 4));
  const dropdownLinks = Object.fromEntries(Object.entries(links).slice(4));

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <div className="text-white 2xl:max-w-screen-2xl 2xl:mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 px-6">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="font-bold text-center">
                <p className="text-2xl">KIARVA</p>
                <span className="lg:whitespace-nowrap text-xl">
                  KI Adaptive Immune Receptor Gene Variant Atlas
                </span>
              </div>
            </Link>
            <button
              className="lg:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } lg:block mt-4 lg:mt-0`}
          >
            <ul className="flex flex-col lg:flex-row lg:flex-wrap lg:items-center lg:space-x-6 space-y-2 lg:space-y-0 text-lg">
              {Object.entries(links).map(([key, link], index) => (
                <li key={key} className={index >= 4 ? "lg:hidden" : ""}>
                  <Link
                    className={clsx(
                      link.classes,
                      "block",
                      pathname === link.link && "underline"
                    )}
                    href={link.link}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
              <li className="hidden lg:block">
                <HeaderDropdown links={dropdownLinks} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
