import { test, expect, Page } from "@playwright/test";
import { readFileSync } from "fs";
import { join } from "path";
import { mockBackend } from "./helpers/mockBackend";
import { selectDropdown } from "./helpers/selectors";

// -----------------------------------------------------------------------------
// The other plot specs assert the UI *around* the chart — headings, IgSNPer
// values, download buttons, the amino-acid table — but never that Plotly
// actually drew anything, so a broken Plotly bundle passes all of them.
//
// That is not hypothetical. plotly.js reaches a dynamic require() through
// glslify, which is why the build opts out of Turbopack (see next.config.mjs).
// Any change to bundling, or to plotly.js itself, can break rendering while
// leaving every surrounding assertion green. These tests close that gap.
// -----------------------------------------------------------------------------

const readFixtureRows = (name: string): number =>
  JSON.parse(
    readFileSync(join(__dirname, "..", "fixtures", name), "utf-8"),
  ).length;

// FrequencyPlotComponent emits one bar trace per data point, across the
// superpopulation and population subplots. mockBackend serves the same two
// frequency fixtures to both the genomic and the translated tab, so the
// expected total is the same for each. Derived from the fixtures rather than
// hardcoded, so editing a fixture cannot silently weaken the assertion.
const EXPECTED_BARS =
  readFixtureRows("superpop-frequencies-ighv1-8-01.json") +
  readFixtureRows("pop-frequencies-ighv1-8-01.json");

// Without this, emptying a fixture would turn the bar assertion into
// toHaveCount(0), which passes against a chart that rendered nothing.
if (EXPECTED_BARS === 0) {
  throw new Error(
    "Frequency fixtures are empty; the bar count assertion would be vacuous.",
  );
}

/**
 * Collects browser-side errors for the lifetime of the page. Plotly failing to
 * initialise typically surfaces here rather than as a missing element.
 */
function trackPageErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  return errors;
}

/**
 * Asserts that Plotly mounted and drew the full dataset, rather than just
 * leaving an empty chart frame behind.
 */
async function expectFrequencyPlotRendered(page: Page) {
  const figure = page.getByRole("figure", {
    name: "Population frequency plot",
  });
  await expect(figure).toBeVisible();

  // .js-plotly-plot is added by Plotly itself once it takes over the container,
  // so its presence means the library loaded and ran.
  const plot = figure.locator(".js-plotly-plot");
  await expect(plot).toBeVisible({ timeout: 30_000 });
  await expect(plot.locator(".main-svg").first()).toBeVisible();

  // Every fixture row must have become a bar. This is what actually fails if
  // the bundle breaks or the data stops reaching the component.
  await expect(plot.locator(".barlayer .point")).toHaveCount(EXPECTED_BARS);

  // The y axis carries the "Allele Frequency" scale. x tick labels are
  // disabled in the layout, so only y ticks are asserted.
  expect(await plot.locator(".ytick").count()).toBeGreaterThan(0);
}

async function selectIghv1801(page: Page) {
  await selectDropdown(page, "Loci", "IGH");
  await selectDropdown(page, "Gene type", "IGHV");
  await selectDropdown(page, "Gene", "1-8");
  await selectDropdown(page, "Allele", "01");
}

test.describe("Plot page - Plotly rendering", () => {
  test("genomic tab draws the frequency chart", async ({ page }) => {
    const errors = trackPageErrors(page);

    await mockBackend(page);
    await page.goto("/plot");

    await selectIghv1801(page);
    await expect(page.getByText("Plot for IGHV1-8*01")).toBeVisible();

    await expectFrequencyPlotRendered(page);
    expect(errors).toEqual([]);
  });

  test("translated tab draws the frequency chart", async ({ page }) => {
    const errors = trackPageErrors(page);

    await mockBackend(page);
    await page.goto("/plot");
    await page.getByRole("tab", { name: "Translated" }).click();

    await selectIghv1801(page);
    await expect(
      page.getByText(
        /Combined frequency for .* and alleles with the same translated sequence/,
      ),
    ).toBeVisible();

    await expectFrequencyPlotRendered(page);
    expect(errors).toEqual([]);
  });

  // FrequencyPlotComponent refuses to render below 750px and shows an alert
  // instead. Asserting that keeps the viewport dependency of the tests above
  // explicit — if the breakpoint moves, this fails rather than them.
  test("narrow viewport shows the size warning instead of a chart", async ({
    page,
  }) => {
    await mockBackend(page);
    await page.setViewportSize({ width: 600, height: 800 });
    await page.goto("/plot");

    await selectIghv1801(page);
    await expect(page.getByText("Plot for IGHV1-8*01")).toBeVisible();

    await expect(
      page.getByRole("alert", { name: "Screen size requirement" }),
    ).toBeVisible();
    await expect(page.locator(".js-plotly-plot")).toHaveCount(0);
  });
});
