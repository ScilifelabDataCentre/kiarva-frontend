import { test, expect, Page } from "@playwright/test";
import { mockBackend } from "./helpers/mockBackend";

// -----------------------------------------------------------------------------
// Every route + its expected <h1> text. Anchors the smoke check for "did the
// page render at all". The home page's h1 is sr-only but still assertable.
// -----------------------------------------------------------------------------

const pages = [
  { path: "/", h1: "KIARVA - Adaptive Immune Receptor Gene Variant Atlas" },
  { path: "/plot", h1: "Allele frequency in global populations" },
  { path: "/msa", h1: "Multiple sequence alignments" },
  { path: "/sequencesearch", h1: "Sequence search" },
  { path: "/download", h1: "Download FASTA files" },
  { path: "/about", h1: "About Us" },
  { path: "/methodology", h1: "Methodology" },
  { path: "/faq", h1: "Frequently Asked Questions" },
  { path: "/changelog", h1: "Change log" },
  { path: "/publications", h1: "Publications" },
  { path: "/citation-and-license", h1: "Citation and license" },
] as const;

// Nav links present in the header on every page (from HeaderComponent.tsx).
const headerToolLinks = [
  { text: "Download", href: "/download" },
  { text: "Population frequencies", href: "/plot" },
  { text: "Alignments", href: "/msa" },
  { text: "Sequence search", href: "/sequencesearch" },
];

// Additional-information links live behind a dropdown trigger.
const additionalInfoLinks = [
  { text: "About", href: "/about" },
  { text: "Methodology", href: "/methodology" },
  { text: "Publications", href: "/publications" },
  { text: "Citation & License", href: "/citation-and-license" },
  { text: "FAQ", href: "/faq" },
  { text: "Change log", href: "/changelog" },
];

// Records browser console errors on the page so tests can assert nothing broke.
function trackConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

// -----------------------------------------------------------------------------
// Structure tests: every page renders with h1 + header + footer, no console errors.
// -----------------------------------------------------------------------------

test.describe("Page structure", () => {
  for (const { path, h1 } of pages) {
    test(`${path} renders h1, header, footer without console errors`, async ({
      page,
    }) => {
      await mockBackend(page);
      const errors = trackConsoleErrors(page);
      await page.goto(path);

      await expect(
        page.getByRole("heading", { level: 1, name: h1 }),
      ).toBeAttached();
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();

      // Give client-side hooks a beat to fire before we snapshot errors.
      await page.waitForLoadState("networkidle");
      expect(errors, `console errors on ${path}: ${errors.join("\n")}`).toEqual(
        [],
      );
    });
  }
});

// -----------------------------------------------------------------------------
// Header nav walk: every tool link is present, each one navigates correctly.
// -----------------------------------------------------------------------------

test.describe("Header navigation", () => {
  test("tool links are visible in the header on the home page", async ({
    page,
  }) => {
    await mockBackend(page);
    await page.goto("/");
    const header = page.getByRole("banner");
    for (const link of headerToolLinks) {
      await expect(
        header.getByRole("link", { name: new RegExp(link.text, "i") }),
      ).toBeVisible();
    }
  });

  for (const link of headerToolLinks) {
    test(`clicking "${link.text}" in the header navigates to ${link.href}`, async ({
      page,
    }) => {
      await mockBackend(page);
      await page.goto("/");
      await page
        .getByRole("banner")
        .getByRole("link", { name: new RegExp(link.text, "i") })
        .first()
        .click();
      await expect(page).toHaveURL(link.href);
    });
  }

  test("Additional information dropdown exposes all secondary links", async ({
    page,
  }) => {
    await mockBackend(page);
    await page.goto("/");
    await page
      .getByRole("banner")
      .getByRole("button", { name: /Additional information/i })
      .click();
    for (const link of additionalInfoLinks) {
      await expect(
        page.getByRole("menuitem", { name: new RegExp(link.text, "i") }),
      ).toBeVisible();
    }
  });
});

// -----------------------------------------------------------------------------
// Per-page interactive-element inventory. Catches "the plot dropdowns
// disappeared", "search button is gone", "download checkbox renamed" etc.
// -----------------------------------------------------------------------------

test.describe("Interactive elements", () => {
  test("plot page exposes the four cascading dropdowns and tabs", async ({
    page,
  }) => {
    await mockBackend(page);
    await page.goto("/plot");
    for (const label of ["Loci", "Gene type", "Gene", "Allele"]) {
      await expect(
        page.getByRole("button", { name: label, exact: true }),
      ).toBeVisible();
    }
    await expect(page.getByRole("tab", { name: "Genomic" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Translated" })).toBeVisible();
  });

  test("MSA page exposes locus/gene-type/gene dropdowns (no allele)", async ({
    page,
  }) => {
    await mockBackend(page);
    await page.goto("/msa");
    for (const label of ["Loci", "Gene type", "Gene"]) {
      await expect(
        page.getByRole("button", { name: label, exact: true }),
      ).toBeVisible();
    }
    await expect(
      page.getByRole("button", { name: "Allele", exact: true }),
    ).toHaveCount(0);
  });

  test("sequence-search page exposes input, description, and search button", async ({
    page,
  }) => {
    await mockBackend(page);
    await page.goto("/sequencesearch");
    await expect(
      page.getByRole("textbox", { name: "Sequence" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Search" })).toBeVisible();
  });

  test("download page exposes FASTA-type radios, IGH gene checkboxes, and Download button", async ({
    page,
  }) => {
    await mockBackend(page);
    await page.goto("/download");
    await expect(
      page.getByRole("radio", { name: "Select genomic sequences", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", {
        name: "Select genomic sequences with flanking regions",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", {
        name: "Select translated sequences",
        exact: true,
      }),
    ).toBeVisible();
    for (const gene of ["IGHV", "IGHD", "IGHJ"]) {
      await expect(
        page.getByRole("checkbox", { name: `Select ${gene}` }),
      ).toBeVisible();
    }
    await expect(page.getByRole("button", { name: "Download" })).toBeVisible();
  });
});
