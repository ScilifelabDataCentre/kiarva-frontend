// Could be server except for the dropdown menu. Split the dropdown out into its own client component?

"use client";

import Link from "next/link";
import { ILink } from "@/interfaces/types";
import { LINK_CLASSES } from "@/constants";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { HeaderDropdown } from "@/components/ui/header-dropdown";
import { Badge } from "@/components/ui/badge";
import { hasCookie } from "cookies-next";

export default function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDemoBadge, setShowDemoBadge] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowDemoBadge(!hasCookie("password"));
  }, [pathname]);
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

  // const mainLinks = Object.fromEntries(Object.entries(links).slice(0, 4));
  const dropdownLinks = Object.fromEntries(Object.entries(links).slice(4));

  return (
    <header className="bg-gradient-to-b from-primary to-secondary">
      <div className="text-white 2xl:max-w-screen-2xl 2xl:mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 px-6">
          <div className="flex justify-between items-center">
            <Link
              href="/#top"
              className="font-bold text-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl">KIARVA</h1>
                {showDemoBadge && <Badge variant="accent">Demo</Badge>}
              </div>
              <p className="lg:whitespace-nowrap text-xl">
                KI Adaptive Immune Receptor Gene Variant Atlas
              </p>
            </Link>

            <button
              className="lg:hidden text-white rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="main-navigation"
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
            id="main-navigation"
            className={`${
              isMenuOpen ? "block" : "hidden"
            } lg:block mt-4 lg:mt-0`}
            aria-label="Main navigation"
          >
            <ul className="flex flex-col lg:flex-row lg:flex-wrap lg:items-center lg:space-x-6 space-y-2 lg:space-y-0 text-lg">
              {Object.entries(links).map(([key, link], index) => (
                <li key={key} className={index >= 4 ? "lg:hidden" : ""}>
                  <Link
                    className={clsx(
                      link.classes,
                      "block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                      pathname === link.link && "underline"
                    )}
                    href={link.link}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={pathname === link.link ? "page" : undefined}
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
    </header>
  );
}
