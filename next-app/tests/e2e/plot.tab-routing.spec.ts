import { test, expect, Page } from "@playwright/test";
import { mockBackend } from "./helpers/mockBackend";
import { selectDropdown } from "./helpers/selectors";

// -----------------------------------------------------------------------------
// Each tab must render its own plot component and therefore hit its own
// frequency endpoints.
//
// PlotPageParent used to pick the component with a computed dynamic import,
// `import('@/components/' + plotName)`. Webpack compiled the directory into a
// lazy context module and it worked; Turbopack does not resolve computed
// specifiers that way, so the translated tab silently rendered GenomicPlot and
// both tabs plotted genomic frequencies.
//
// Nothing caught it: every existing test asserts the surrounding UI, and
// mockBackend used to serve the same fixtures to both endpoint families, so
// even the plot assertions could not tell the two apart. The fixtures are now
// distinct, and these tests pin the routing directly.
// -----------------------------------------------------------------------------

const GENOMIC_FREQ = /\/data\/frequencies\/(superpopulations|populations)\?/;
const AA_FREQ =
  /\/data\/aminoacidfrequencies\/(superpopulations|populations)\?/;

/** Records every backend URL requested, without altering the mocked responses. */
async function recordBackendCalls(page: Page): Promise<string[]> {
  const urls: string[] = [];
  await page.route(/\/data\//, async (route) => {
    urls.push(route.request().url());
    await route.fallback();
  });
  return urls;
}

async function selectIghv1801(page: Page) {
  await selectDropdown(page, "Loci", "IGH");
  await selectDropdown(page, "Gene type", "IGHV");
  await selectDropdown(page, "Gene", "1-8");
  await selectDropdown(page, "Allele", "01");
}

test.describe("Plot tab routing", () => {
  test("genomic tab fetches genomic frequencies only", async ({ page }) => {
    await mockBackend(page);
    const urls = await recordBackendCalls(page);

    await page.goto("/plot");
    await selectIghv1801(page);
    await expect(page.getByText("Plot for IGHV1-8*01")).toBeVisible();

    await expect
      .poll(() => urls.filter((u) => GENOMIC_FREQ.test(u)).length)
      .toBeGreaterThan(0);
    expect(urls.filter((u) => AA_FREQ.test(u))).toEqual([]);
  });

  test("translated tab fetches amino-acid frequencies, not genomic ones", async ({
    page,
  }) => {
    await mockBackend(page);
    await page.goto("/plot");

    // Record only after switching, so the genomic tab's own fetches — which are
    // correct and expected — do not count against this assertion.
    await page.getByRole("tab", { name: "Translated" }).click();
    const urls = await recordBackendCalls(page);

    await selectIghv1801(page);
    await expect(
      page.getByText(
        /Combined frequency for .* and alleles with the same translated sequence/,
      ),
    ).toBeVisible();

    await expect
      .poll(() => urls.filter((u) => AA_FREQ.test(u)).length)
      .toBeGreaterThan(0);
    expect(urls.filter((u) => GENOMIC_FREQ.test(u))).toEqual([]);
  });
});
