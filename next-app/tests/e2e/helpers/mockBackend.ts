import { Page, Route } from "@playwright/test";
import { readFileSync } from "fs";
import { join } from "path";

const FIXTURES_DIR = join(__dirname, "..", "..", "fixtures");

const readFixture = (name: string) =>
  readFileSync(join(FIXTURES_DIR, name), "utf-8");

const readBinaryFixture = (name: string) =>
  readFileSync(join(FIXTURES_DIR, name));

type BackendOverrides = {
  /** Serve the empty-results fixture for /data/sequences. Default: false (match fixture). */
  sequenceSearchEmpty?: boolean;
};

/**
 * Wires all APIcalls URL patterns to hand-crafted fixtures via page.route().
 * The frontend hits http://localhost:5000/* in dev (via window.location.origin
 * detection in constants.ts) and /meta/version on the app origin.
 */
export async function mockBackend(page: Page, overrides: BackendOverrides = {}) {
  const jsonRoute =
    (fixtureName: string) =>
    (route: Route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: readFixture(fixtureName),
      });

  // ---------- Meta (same-origin) ----------
  await page.route("**/meta/version", jsonRoute("meta-version.json"));

  // ---------- plotoptions ----------
  // The frontend calls this with current_selection=IGHV (initial gene list)
  // and current_selection=IGHV1-8* (allele list for a selected gene).
  await page.route(/\/data\/plotoptions\?.*current_selection=/, (route) => {
    const url = new URL(route.request().url());
    const selection = url.searchParams.get("current_selection") ?? "";
    const fixture = selection.includes("*")
      ? "plotoptions-ighv1-8.json"
      : "plotoptions-ighv.json";
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: readFixture(fixture),
    });
  });

  // ---------- db_name ----------
  await page.route(
    /\/data\/db_name\?/,
    jsonRoute("dbname-ighv1-8-01.json"),
  );

  // ---------- frequencies ----------
  await page.route(
    /\/data\/frequencies\/superpopulations\?/,
    jsonRoute("superpop-frequencies-ighv1-8-01.json"),
  );
  await page.route(
    /\/data\/frequencies\/populations\?/,
    jsonRoute("pop-frequencies-ighv1-8-01.json"),
  );
  // Deliberately different values from the genomic fixtures above. They used to
  // be the same, which meant a bug that served genomic data on the translated
  // tab was invisible to every test — exactly what happened when a computed
  // dynamic import made both tabs render GenomicPlot under Turbopack. The row
  // counts still match, since both endpoints cover the same populations.
  await page.route(
    /\/data\/aminoacidfrequencies\/superpopulations\?/,
    jsonRoute("aa-superpop-frequencies-ighv1-8-01.json"),
  );
  await page.route(
    /\/data\/aminoacidfrequencies\/populations\?/,
    jsonRoute("aa-pop-frequencies-ighv1-8-01.json"),
  );

  // ---------- allele metadata ----------
  await page.route(
    /\/data\/igsnperdata\?/,
    jsonRoute("igsnper-ighv1-8-01.json"),
  );
  await page.route(
    /\/data\/aminoacidalleles\?/,
    jsonRoute("aa-alleles-ighv1-8-01.json"),
  );
  await page.route(
    /\/data\/aminoacidlist\?/,
    jsonRoute("aa-list-ighv1-8-01.json"),
  );

  // ---------- sequences ----------
  await page.route(
    /\/data\/sequences\/alignedsequences\?/,
    jsonRoute("aligned-sequences-ighv1-8.json"),
  );
  await page.route(/\/data\/sequences\?sequence_str=/, (route) => {
    const fixture = overrides.sequenceSearchEmpty
      ? "sequence-search-empty.json"
      : "sequence-search-match.json";
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: readFixture(fixture),
    });
  });

  // ---------- frequency table (TSV download) ----------
  await page.route(/\/data\/(frequencies|aminoacidfrequencies)\/table\//, (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/tab-separated-values",
      body: readFixture("plot-table.tsv"),
    }),
  );

  // ---------- FASTA download ----------
  await page.route(/\/fasta\//, (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/plain",
      body: readBinaryFixture("fasta.txt"),
    }),
  );
}
