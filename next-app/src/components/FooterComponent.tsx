import Link from "next/link";
import DisplayAppVersion from "@/components/DisplayAppVersion";

type FooterLink = { label: string; href: string };

const toolsLinks: FooterLink[] = [
  { label: "Download", href: "/download" },
  { label: "Population frequencies", href: "/plot" },
  { label: "Alignments", href: "/msa" },
  { label: "Sequence search", href: "/sequencesearch" },
];

const projectLinks: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Methodology", href: "/methodology" },
  { label: "Publications", href: "/publications" },
  { label: "Change log", href: "/changelog" },
];

const externalLinks: Array<FooterLink & { external?: boolean }> = [
  {
    label: "Privacy policy",
    href: "https://precision-medicine-portal.scilifelab.se/privacy",
    external: true,
  },
  {
    label: "Citation and license",
    href: "https://precision-medicine-portal.scilifelab.se/citation-and-license",
    external: true,
  },
];

function FooterLinkList({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wide text-primary-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 rounded-sm"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterComponent() {
  return (
    <footer className="border-t border-primary/30 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-screen-2xl px-6 py-12">
        <h2 id="footer-navigation-heading" className="sr-only">
          Footer navigation
        </h2>
        <div className="grid gap-10 md:grid-cols-12">
          <section className="md:col-span-4">
            <Link
              href="/#top"
              className="inline-flex items-center gap-2 font-bold text-lg hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 rounded-sm"
              aria-label="KIARVA home"
            >
              KIARVA
            </Link>
            <p className="mt-3 text-sm text-primary-foreground/80">
              KI Adaptive Immune Receptor Gene Variant Atlas.
            </p>
          </section>

          <nav
            className="md:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-3"
            aria-labelledby="footer-navigation-heading"
          >
            <FooterLinkList title="Tools" links={toolsLinks} />
            <FooterLinkList title="Project" links={projectLinks} />
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-primary-foreground">
                Policies
              </h3>
              <ul className="mt-4 space-y-3">
                {externalLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 rounded-sm"
                    >
                      {l.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-10 border-t border-primary-foreground/20 pt-6 flex justify-start lg:justify-end">
          <div className="text-xs text-primary-foreground/70">
            <DisplayAppVersion />
          </div>
        </div>
      </div>
    </footer>
  );
}
