"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";
import { hasCookie } from "cookies-next";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  BarChart3,
  AlignLeft,
  Search,
  BookOpen,
  FileText,
  History,
  HelpCircle,
  Download,
  Info,
  FileBadge,
  Menu,
  X,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types & static data
// ---------------------------------------------------------------------------

type NavLink = {
  text: string;
  href: string;
  icon: React.ReactNode;
  description: string;
};

const toolLinks: NavLink[] = [
  {
    text: "Download",
    href: "/download",
    icon: <Download className="h-4 w-4" />,
    description: "Download gene data and resources",
  },
  {
    text: "Population frequencies",
    href: "/plot",
    icon: <BarChart3 className="h-4 w-4" />,
    description: "Gene frequency distributions across populations",
  },
  {
    text: "Alignments",
    href: "/msa",
    icon: <AlignLeft className="h-4 w-4" />,
    description: "Multiple sequence alignment viewer",
  },
  {
    text: "Sequence search",
    href: "/sequencesearch",
    icon: <Search className="h-4 w-4" />,
    description: "Search sequences by pattern or identity",
  },
];

const additionalInformationLinks: NavLink[] = [
  {
    text: "About",
    href: "/about",
    icon: <Info className="h-4 w-4" />,
    description: "About the project and team",
  },
  {
    text: "Methodology",
    href: "/methodology",
    icon: <BookOpen className="h-4 w-4" />,
    description: "Analytical approach and methods",
  },
  {
    text: "Publications",
    href: "/publications",
    icon: <FileText className="h-4 w-4" />,
    description: "Related academic publications",
  },
  {
    text: "FAQ",
    href: "/faq",
    icon: <HelpCircle className="h-4 w-4" />,
    description: "Frequently asked questions",
  },
  {
    text: "Change log",
    href: "/changelog",
    icon: <History className="h-4 w-4" />,
    description: "Updates and version history",
  },
];

// ---------------------------------------------------------------------------
// Shared desktop nav-link base styles (text, padding, ring, transitions)
// ---------------------------------------------------------------------------

const DESKTOP_NAV_BASE =
  "flex items-center text-sm 13inch:text-base font-medium px-2 13inch:px-3 py-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30";

// ---------------------------------------------------------------------------
// Shared mobile nav-link base styles
// ---------------------------------------------------------------------------

const MOBILE_NAV_LINK =
  "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors";

const MOBILE_SECTION_HEADING =
  "text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-2 px-3";

// ---------------------------------------------------------------------------
// NavDropdown – accessible Radix dropdown for grouped links
// ---------------------------------------------------------------------------

function NavDropdown({
  label,
  links,
  pathname,
}: {
  label: string;
  links: NavLink[];
  pathname: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={clsx(
          DESKTOP_NAV_BASE,
          "gap-1 text-white/70 hover:text-white",
        )}
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={8} className="w-72 p-1.5">
        {links.map((link) => (
          <DropdownMenuItem key={link.href} asChild className="p-0">
            <Link
              href={link.href}
              className={clsx(
                "group flex items-start gap-3 rounded-md px-3 py-2.5 w-full cursor-pointer transition-colors",
                "hover:bg-primary/10 focus:bg-primary/10",
                pathname === link.href && "bg-primary/10",
              )}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  "mt-0.5 shrink-0 transition-colors",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary group-focus:text-primary",
                )}
              >
                {link.icon}
              </span>
              <div className="flex flex-col gap-0.5">
                <span
                  className={clsx(
                    "text-sm font-medium leading-tight transition-colors",
                    pathname === link.href
                      ? "text-primary"
                      : "text-foreground group-hover:text-primary group-focus:text-primary",
                  )}
                >
                  {link.text}
                </span>
                <span className="text-xs text-muted-foreground leading-snug">
                  {link.description}
                </span>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ---------------------------------------------------------------------------
// useMobileMenuTrap – focus-trap & keyboard handling for the mobile menu
// ---------------------------------------------------------------------------

function useMobileMenuTrap(
  isOpen: boolean,
  navRef: React.RefObject<HTMLElement | null>,
  toggleRef: React.RefObject<HTMLButtonElement | null>,
  close: () => void,
) {
  useEffect(() => {
    // Apply / remove the `inert` attribute to prevent focus when closed.
    // `inert` is supported in all modern browsers and prevents keyboard &
    // pointer interaction with hidden content.
    const nav = navRef.current;
    if (!nav) return;

    if (isOpen) {
      nav.removeAttribute("inert");
    } else {
      nav.setAttribute("inert", "");
    }
  }, [isOpen, navRef]);

  useEffect(() => {
    if (!isOpen) return;

    // Move focus into the menu after it opens.
    const raf = requestAnimationFrame(() => {
      const first = navRef.current?.querySelector<HTMLElement>("a[href]");
      first?.focus();
    });

    function handleKeyDown(e: KeyboardEvent) {
      const nav = navRef.current;
      const toggle = toggleRef.current;
      if (!nav) return;

      // Only act when focus is within the mobile menu or on the toggle.
      const focusInMenu = nav.contains(document.activeElement);
      const focusOnToggle = document.activeElement === toggle;
      if (!focusInMenu && !focusOnToggle) return;

      // ── Escape → close & return focus ──────────────────────────────
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        toggle?.focus();
        return;
      }

      // ── Tab / Shift+Tab → trap focus ───────────────────────────────
      if (e.key === "Tab") {
        const focusableEls = nav.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusableEls.length === 0) return;

        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];

        if (e.shiftKey) {
          // Shift+Tab on first menu item → wrap to toggle button
          if (document.activeElement === first) {
            e.preventDefault();
            toggle?.focus();
          }
          // Shift+Tab on toggle button → wrap to last menu item
          else if (focusOnToggle) {
            e.preventDefault();
            last.focus();
          }
        } else {
          // Tab on last menu item → wrap to toggle button
          if (document.activeElement === last) {
            e.preventDefault();
            toggle?.focus();
          }
          // Tab on toggle button → wrap to first menu item
          else if (focusOnToggle) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, navRef, toggleRef, close]);
}

// ---------------------------------------------------------------------------
// HeaderComponent
// ---------------------------------------------------------------------------

export default function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDemoBadge, setShowDemoBadge] = useState(false);
  const pathname = usePathname();

  const mobileNavRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setShowDemoBadge(!hasCookie("password"));
  }, [pathname]);

  // Focus-trap hook
  useMobileMenuTrap(isMenuOpen, mobileNavRef, hamburgerRef, closeMenu);

  return (
    <header className="bg-primary">
      <div className="text-white 2xl:max-w-screen-2xl 2xl:mx-auto">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between xl:gap-8 py-4 px-6">
          {/* ── Logo & mobile toggle row ─────────────────────────────── */}
          <div className="flex justify-between items-center xl:shrink-0">
            <Link
              href="/"
              className="font-bold text-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">KIARVA</span>
                {showDemoBadge && <Badge variant="accent">Demo</Badge>}
              </div>
              <p className="13inch:whitespace-nowrap text-xl">
                KI Adaptive Immune Receptor Gene Variant Atlas
              </p>
            </Link>

            <button
              ref={hamburgerRef}
              type="button"
              className="xl:hidden text-white/70 hover:text-white rounded-md p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* ── Desktop navigation ───────────────────────────────────── */}
          <nav className="hidden xl:block" aria-label="Main navigation">
            <ul className="flex items-center gap-0.5 13inch:gap-1" role="list">
              {/* Inline tool links */}
              {toolLinks.map((link) => (
                <li key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={clsx(
                      DESKTOP_NAV_BASE,
                      "gap-1.5 whitespace-nowrap",
                      pathname === link.href
                        ? "text-white"
                        : "text-white/70 hover:text-white",
                    )}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    <span aria-hidden="true">{link.icon}</span>
                    {link.text}
                    {/* Screen-reader-only description (sole source for AT) */}
                    <span className="sr-only">, {link.description}</span>
                  </Link>

                  {/* Visual tooltip (decorative – AT gets description via sr-only span above) */}
                  <div
                    aria-hidden="true"
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-1.5
                      bg-foreground text-background text-xs rounded-md whitespace-nowrap
                      opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150
                      shadow-lg z-50"
                  >
                    {link.description}
                    <div
                      aria-hidden="true"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45"
                    />
                  </div>
                </li>
              ))}

              {/* Visual separator */}
              <li aria-hidden="true" role="presentation">
                <div className="h-4 w-px bg-white/20 mx-1" />
              </li>

              {/* Additional information dropdown */}
              <li>
                <NavDropdown
                  label="Additional information"
                  links={additionalInformationLinks}
                  pathname={pathname}
                />
              </li>

              {/* Citation & License direct link */}
              <li>
                <Link
                  href="/citation-and-license"
                  className={clsx(
                    DESKTOP_NAV_BASE,
                    "gap-1.5",
                    pathname === "/citation-and-license"
                      ? "text-white"
                      : "text-white/70 hover:text-white",
                  )}
                  aria-current={
                    pathname === "/citation-and-license" ? "page" : undefined
                  }
                >
                  <FileBadge className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="inline-flex flex-col leading-tight">
                    <span>Citation</span>
                    <span className="whitespace-nowrap">& license</span>
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* ── Mobile navigation ──────────────────────────────────────── */}
        <nav
          ref={mobileNavRef}
          id="mobile-navigation"
          className={clsx(
            "xl:hidden overflow-hidden transition-all duration-200 ease-in-out",
            isMenuOpen
              ? "max-h-[700px] opacity-100 border-t border-white/10"
              : "max-h-0 opacity-0",
          )}
          aria-label="Mobile navigation"
        >
          <div className="px-6 py-4 space-y-4">
            {/* Tool section */}
            <div role="group" aria-labelledby="mobile-tool-heading">
              <h3
                id="mobile-tool-heading"
                className={MOBILE_SECTION_HEADING}
              >
                Tools
              </h3>
              <ul className="space-y-0.5" role="list">
                {toolLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={clsx(
                        MOBILE_NAV_LINK,
                        pathname === link.href
                          ? "text-white bg-white/10"
                          : "text-white/60 hover:text-white hover:bg-white/5",
                      )}
                      aria-current={pathname === link.href ? "page" : undefined}
                    >
                      <span aria-hidden="true">{link.icon}</span>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional information section */}
            <div
              role="group"
              aria-labelledby="mobile-additional-information-heading"
            >
              <h3
                id="mobile-additional-information-heading"
                className={MOBILE_SECTION_HEADING}
              >
                Additional information
              </h3>
              <ul className="space-y-0.5" role="list">
                {additionalInformationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={clsx(
                        MOBILE_NAV_LINK,
                        pathname === link.href
                          ? "text-white bg-white/10"
                          : "text-white/60 hover:text-white hover:bg-white/5",
                      )}
                      aria-current={pathname === link.href ? "page" : undefined}
                    >
                      <span aria-hidden="true">{link.icon}</span>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Citation & license */}
            <div className="border-t border-white/10 pt-3">
              <ul className="space-y-0.5" role="list">
                <li>
                  <Link
                    href="/citation-and-license"
                    onClick={closeMenu}
                    className={clsx(
                      MOBILE_NAV_LINK,
                      pathname === "/citation-and-license"
                        ? "text-white bg-white/10"
                        : "text-white/60 hover:text-white hover:bg-white/5",
                    )}
                    aria-current={
                      pathname === "/citation-and-license" ? "page" : undefined
                    }
                  >
                    <FileBadge className="h-4 w-4" aria-hidden="true" />
                    Citation & license
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
