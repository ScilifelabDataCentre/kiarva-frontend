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

    await page.getByText("Translated sequences").click();

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

    await page.getByText("Translated sequences").click();

    await expect(page.getByRole("button", { name: "Download" })).toBeDisabled();
  });

  // The FASTA type used to be set only by onClick on the label text, so the
  // radio button itself, the keyboard and assistive tech all moved the visible
  // selection without changing it: incompatible genes stayed enabled and the
  // genomic data was downloaded. The tests above click the label, so they
  // missed it. These go through the other paths.
  test("clicking the radio button itself disables incompatible gene checkboxes", async ({
    page,
  }) => {
    await page
      .getByRole("radio", { name: "Select translated sequences" })
      .click();

    await expect(
      page.getByRole("checkbox", { name: "Select IGHJ" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("checkbox", { name: "Select IGHD" }),
    ).toBeDisabled();
  });

  test("selecting the FASTA type with the keyboard disables incompatible gene checkboxes", async ({
    page,
  }) => {
    // A keypress sent before hydration is dropped.
    await page.waitForLoadState("networkidle");

    // Radix moves roving focus in a setTimeout after keydown, and a radio only
    // selects itself on focus while an arrow key is still held. keyboard.press()
    // sends keyup immediately, so it usually lands first and the radio is
    // focused but not selected. Hold the key the way a real keypress does.
    const arrowDownTo = async (name: string) => {
      await page.keyboard.down("ArrowDown");
      await expect(page.getByRole("radio", { name, exact: true })).toBeChecked();
      await page.keyboard.up("ArrowDown");
    };

    await page
      .getByRole("radio", { name: "Select genomic sequences", exact: true })
      .focus();
    await arrowDownTo("Select genomic sequences with flanking regions");
    await arrowDownTo("Select translated sequences");

    await expect(
      page.getByRole("checkbox", { name: "Select IGHJ" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("checkbox", { name: "Select IGHD" }),
    ).toBeDisabled();
  });

  test("radio button selection determines the downloaded FASTA type", async ({
    page,
  }) => {
    await page
      .getByRole("radio", { name: "Select translated sequences" })
      .click();
    await page.getByRole("checkbox", { name: "Select IGHV" }).check();

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download" }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(
      /Homo-sapiens_Igh_V_translated/,
    );
  });
});
