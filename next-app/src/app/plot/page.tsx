// Probably leave as client component. Only consists of loading icon or showing a client component child.
// May be able to change to server component for optimization/SEO, but dunno if Suspense/Loading works
// on server

'use client';

import { ReactElement, useState } from 'react';
import PlotPageParent from '@/components/PlotPageParent';
import { BODY_CLASSES, H_1 } from '@/constants';
import { Button } from '@/components/ui/button';

// Main function to render the plot components
export default function PlotPage(): ReactElement {
    const paths = ["genomic", "translated"]
    const [currentRoute, setCurrentRoute] = useState<string>("genomic");

    const handleTabClick = () => {
        const currentPathIndex = paths.indexOf(currentRoute);
        setCurrentRoute(paths[(currentPathIndex+1)%2]);
    }

    return (
    <main className={BODY_CLASSES}>
        <h1 className={H_1}>Allele frequency in global populations</h1>
            <aside
                className="bg-muted alert"
                role="note"
                aria-label="Plot page instructions"
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
                This page allows users to generate population frequency plots for the
                KI Adaptive Immune Receptor Gene Variant Atlas. You can select from
                various dropdowns to filter by gene segment, gene type, gene, and
                allele. The genomic plot page features associated SNPs and IgSNPer
                scores, while the translated plot page features a list of other
                alleles translating to the same amino acid.
                </p>
            </aside>
            <nav aria-label="Plot type navigation">
                <div role="tablist" className="tabs tabs-lifted pb-4">
                {paths.map((path) => (
                    <Button
                    key={path}
                    role="tab"
                    aria-selected={currentRoute == path}
                    onClick={handleTabClick}
                    className={`tab ${
                        currentRoute == path
                        ? "tab-active text-white !bg-info"
                        : "text-black bg-white shadow"
                    }`}
                    >
                    {String(path).charAt(0).toUpperCase() + String(path).slice(1)}
                    </Button>
                ))}
                </div>
            </nav>
            <PlotPageParent plotType={currentRoute + "FreqPlot"}/>
        </main>
    );
}
