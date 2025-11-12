// Should be possible to make into server component, but useage of hasCookie may cause problems.

"use client";

import { BODY_CLASSES, H_1 } from "@/constants";
import "../globals.css";
import { hasCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentRoute = usePathname();

  const paths = {
    Genomic: "/plot/genomic",
    Translated: "/plot/translated",
  };

  return (
    <div className={BODY_CLASSES}>
      <h1 className={H_1}>Allele frequency in global populations</h1>
      {!hasCookie("password") && (
        <div className="alert alert-info bg-info text-info-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M12 7v2" />
            <path d="M12 13h.01" />
          </svg>
          <span className="text-sm lg:text-base">
            You are currently exploring the demo version of KIARVA. The full
            version will be released once the underlying data has been
            published. Until then, the pages are visible as a demonstration but
            without full data access.
          </span>
        </div>
      )}

      <div className="bg-muted alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="text-sm lg:text-base">
          This page allows users to generate population frequency plots for the
          KI Adaptive Immune Receptor Gene Variant Atlas. You can select from
          various dropdowns to filter by gene segment, gene type, gene, and
          allele. The genomic plot page features associated SNPs and SNiPer
          scores, while the translated plot page features a list of other
          alleles translating to the same amino acid.
        </span>
      </div>
      <div role="tablist" className="tabs tabs-lifted pb-4">
        {Object.keys(paths).map((key) => (
          <Link
            key={key}
            href={paths[key as keyof typeof paths]}
            role="tab"
            className={`tab ${
              currentRoute == paths[key as keyof typeof paths]
                ? "tab-active text-white !bg-info"
                : "bg-white shadow"
            }`}
          >
            {key}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}
