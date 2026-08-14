import { test, expect } from "@playwright/test";
import { mockBackend } from "./helpers/mockBackend";
import { selectDropdown } from "./helpers/selectors";

test.describe("Plot page - genomic tab", () => {
  test.beforeEach(async ({ page }) => {
    await mockBackend(page);
    await page.goto("/plot");
  });

  test("allele selection populates frequency plot, IgSNPer data, download buttons", async ({
    page,
  }) => {
    await selectDropdown(page, "Loci", "IGH");
    await selectDropdown(page, "Gene type", "IGHV");
    await selectDropdown(page, "Gene", "1-8");
    await selectDropdown(page, "Allele", "01");

    await expect(page.getByText("Plot for IGHV1-8*01")).toBeVisible();

    await expect(page.getByText("IgSNPer SCORE: 2.0")).toBeVisible();
    await expect(page.getByText("rs12345678")).toBeVisible();
    await expect(page.getByText("rs87654321")).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Download allele frequency table" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Download gene frequency table" }),
    ).toBeVisible();
  });

  test("intermediate 'select allele' state shown when gene picked but allele not", async ({
    page,
  }) => {
    await selectDropdown(page, "Loci", "IGH");
    await selectDropdown(page, "Gene type", "IGHV");
    await selectDropdown(page, "Gene", "1-8");

    await expect(page.getByText(/Please select the allele above/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Download gene frequency table" }),
    ).toBeVisible();
  });

  test("download allele frequency table triggers a download", async ({
    page,
  }) => {
    await selectDropdown(page, "Loci", "IGH");
    await selectDropdown(page, "Gene type", "IGHV");
    await selectDropdown(page, "Gene", "1-8");
    await selectDropdown(page, "Allele", "01");

    // Wait for the dbName state to settle before triggering the download —
    // "Plot for IGHV1-8*01" only renders after the getDbName call resolves.
    await expect(page.getByText("Plot for IGHV1-8*01")).toBeVisible();

    const downloadPromise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "Download allele frequency table" })
      .click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/IGHV1-8_01/);
    expect(download.suggestedFilename()).toContain("_frequencies.tsv");
  });
});
