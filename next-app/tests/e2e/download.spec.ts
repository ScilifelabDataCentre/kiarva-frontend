import { test, expect } from "@playwright/test";
import { mockBackend } from "./helpers/mockBackend";

test.describe("Download page", () => {
  test.beforeEach(async ({ page }) => {
    await mockBackend(page);
    await page.goto("/download");
  });

  test("Download button is disabled with no selection", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Download" })).toBeDisabled();
  });

  test("single-gene selection triggers FASTA download", async ({ page }) => {
    await page.getByRole("checkbox", { name: "Select IGHV" }).check();

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download" }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/Homo-sapiens_Igh_V_genomic/);
    expect(download.suggestedFilename()).toContain(".fasta");
  });

  test("multi-gene selection triggers ZIP download", async ({ page }) => {
    await page.getByRole("checkbox", { name: "Select IGHV" }).check();
    await page.getByRole("checkbox", { name: "Select IGHD" }).check();

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download" }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/-fastas\.zip$/);
  });

  test("switching FASTA type to translated disables incompatible gene checkboxes", async ({
    page,
  }) => {
    await expect(
      page.getByRole("checkbox", { name: "Select IGHJ" }),
    ).toBeEnabled();

    await page.getByText("Translated V gene sequences").click();

    await expect(
      page.getByRole("checkbox", { name: "Select IGHJ" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("checkbox", { name: "Select IGHD" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("checkbox", { name: "Select IGHV" }),
    ).toBeEnabled();
  });

  test("switching FASTA type clears existing selection", async ({ page }) => {
    await page.getByRole("checkbox", { name: "Select IGHV" }).check();
    await expect(page.getByRole("button", { name: "Download" })).toBeEnabled();

    await page.getByText("Translated V gene sequences").click();

    await expect(page.getByRole("button", { name: "Download" })).toBeDisabled();
  });
});
