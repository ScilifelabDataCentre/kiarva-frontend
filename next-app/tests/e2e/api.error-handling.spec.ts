import { test, expect } from "@playwright/test";
import { mockBackend } from "./helpers/mockBackend";
import { selectDropdown } from "./helpers/selectors";

// -----------------------------------------------------------------------------
// Guards the one behaviour that changed shape when lib/APIcalls.ts moved from
// axios to fetch.
//
// axios rejects on any non-2xx status, so the old .catch() branch returned the
// caller's default. fetch resolves normally for 404 and 500, so APIcalls has to
// check response.ok itself. Without that check a JSON error body would be
// parsed and handed back as if it were real data — an object where the
// components expect an array — and FrequencyPlotComponent throws "data is not
// iterable" while looping it, taking the chart down with it.
//
// The first two tests were confirmed to fail with the response.ok check
// removed. The third passes either way, because res.json() rejects on an HTML
// body regardless; it is kept as a plain regression test that an error page
// never reaches the UI as content.
// -----------------------------------------------------------------------------

const jsonError = { error: "internal server error", detail: "boom" };

test.describe("Backend error handling", () => {
  test("a 500 with a JSON body degrades gracefully instead of crashing", async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));

    await mockBackend(page);

    // Registered after mockBackend so it takes precedence: Playwright matches
    // the most recently added handler first.
    await page.route(/\/data\/frequencies\/(superpopulations|populations)\?/, (route) =>
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify(jsonError),
      }),
    );

    await page.goto("/plot");
    await selectDropdown(page, "Loci", "IGH");
    await selectDropdown(page, "Gene type", "IGHV");
    await selectDropdown(page, "Gene", "1-8");
    await selectDropdown(page, "Allele", "01");

    // The page must still render and stay interactive.
    await expect(
      page.getByRole("heading", {
        name: "Allele frequency in global populations",
      }),
    ).toBeVisible();
    await expect(page.getByText("Plot for IGHV1-8*01")).toBeVisible();

    // Data that did succeed is unaffected.
    await expect(page.getByText("IgSNPer SCORE: 2.0")).toBeVisible();

    // This is the assertion that actually pins the response.ok check. The
    // fallback is an empty array, so Plotly still mounts and simply draws no
    // bars. Without the check the error object reaches the component instead,
    // it throws while iterating, and the chart never mounts at all.
    const plot = page.locator(".js-plotly-plot");
    await expect(plot).toBeVisible();
    await expect(plot.locator(".barlayer .point")).toHaveCount(0);

    expect(pageErrors).toEqual([]);
  });

  test("a 404 on the gene dropdown leaves the page usable", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));

    await mockBackend(page);
    await page.route(/\/data\/plotoptions\?/, (route) =>
      route.fulfill({
        status: 404,
        contentType: "application/json",
        body: JSON.stringify({ error: "not found" }),
      }),
    );

    await page.goto("/plot");

    await expect(
      page.getByRole("heading", {
        name: "Allele frequency in global populations",
      }),
    ).toBeVisible();
    expect(pageErrors).toEqual([]);
  });

  test("a non-JSON error body does not surface as data", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));

    await mockBackend(page);
    await page.route(/\/data\/igsnperdata\?/, (route) =>
      route.fulfill({
        status: 502,
        contentType: "text/html",
        body: "<html><body>Bad Gateway</body></html>",
      }),
    );

    await page.goto("/plot");
    await selectDropdown(page, "Loci", "IGH");
    await selectDropdown(page, "Gene type", "IGHV");
    await selectDropdown(page, "Gene", "1-8");
    await selectDropdown(page, "Allele", "01");

    await expect(page.getByText("Plot for IGHV1-8*01")).toBeVisible();
    await expect(page.getByText("Bad Gateway")).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });
});
