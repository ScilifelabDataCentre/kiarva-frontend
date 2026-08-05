import { test, expect } from "@playwright/test";
import { mockBackend } from "./helpers/mockBackend";

test.describe("Sequence search", () => {
  test("renders match table when backend returns hits", async ({ page }) => {
    await mockBackend(page);
    await page.goto("/sequencesearch");

    await page.getByRole("textbox", { name: "Sequence" }).fill("ESEARCHTES");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText("IGHV1-8*01")).toBeVisible();
    await expect(page.getByText(/THISISASEQUENCESEARCHTEST123/)).toBeVisible();
  });

  test("shows empty-state message when backend returns no hits", async ({
    page,
  }) => {
    await mockBackend(page, { sequenceSearchEmpty: true });
    await page.goto("/sequencesearch");

    await page.getByRole("textbox", { name: "Sequence" }).fill("NOMATCHFORTHIS");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(
      page.getByText(/No matches in database for the requested sequence/i),
    ).toBeVisible();
  });

  test("form validation rejects sequences under 10 characters", async ({
    page,
  }) => {
    await mockBackend(page);
    await page.goto("/sequencesearch");

    await page.getByRole("textbox", { name: "Sequence" }).fill("SHORT");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(
      page.getByText(/Sequence must be at least 10 nucleotides/i),
    ).toBeVisible();
  });
});
