#!/usr/bin/env bash
#
# Records backend responses into tests/fixtures/recorded/ for reference.
#
# Precondition: local backend running at $BACKEND_URL (default http://localhost:5000)
# seeded with the mock data from kiarva-backend/tests/mock_data/.
#
# That mock data uses real gene and allele names, so what comes back here is directly
# comparable to the fixtures in tests/fixtures/ - the recorded files are the ground
# truth for their shape, their names and the order of their rows. Two deliberate
# differences remain:
#
#   * The frequency fixtures keep hand-picked n and frequency values. The mock dataset
#     has one case per population, so the real numbers are mostly 1.0 and would make
#     the plot rendering assertions much weaker.
#   * Which allele the sequence search hits is a property of the mock data, so check
#     sequence-search-match.json against the recording after changing it.

set -euo pipefail

BACKEND_URL="${BACKEND_URL:-http://localhost:5000}"
API_KEY="${API_KEY:-kiarvafrontend}"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/tests/fixtures/recorded"

mkdir -p "$OUT_DIR"

fetch() {
  local name="$1"
  local path="$2"
  echo "  $name  <-  $path"
  curl -sf -H "X-api-key: $API_KEY" "$BACKEND_URL$path" > "$OUT_DIR/$name" || {
    echo "    !! request failed"
    return 0
  }
}

echo "Recording fixtures from $BACKEND_URL into $OUT_DIR"

# Gene/allele options
fetch "plotoptions-ighv.json"       "/data/plotoptions?current_selection=IGHV"
fetch "plotoptions-ighv1-8.json"    "/data/plotoptions?current_selection=IGHV1-8%2A"
fetch "dbname-ighv1-8-01.json"      "/data/db_name?selection=IGHV1-8,01"

# Frequency data
fetch "superpop-frequencies-ighv1-8-01.json"    "/data/frequencies/superpopulations?allele_name=IGHV1-8%2A01"
fetch "pop-frequencies-ighv1-8-01.json"         "/data/frequencies/populations?allele_name=IGHV1-8%2A01"
fetch "aa-superpop-frequencies-ighv1-8-01.json" "/data/aminoacidfrequencies/superpopulations?aa_allele_name=IGHV1-8%2A01"
fetch "aa-pop-frequencies-ighv1-8-01.json"      "/data/aminoacidfrequencies/populations?aa_allele_name=IGHV1-8%2A01"
fetch "plot-table.tsv"                          "/data/frequencies/table/allele?allele_name=IGHV1-8%2A01"

# Allele metadata
fetch "igsnper-ighv1-8-01.json"     "/data/igsnperdata?allele_name=IGHV1-8%2A01"
fetch "aa-alleles-ighv1-8-01.json"  "/data/aminoacidalleles?aa_allele_name=IGHV1-8%2A01"
fetch "aa-list-ighv1-8-01.json"     "/data/aminoacidlist?aa_allele_name=IGHV1-8%2A01"

# Sequences
fetch "aligned-sequences-ighv1-8.json" "/data/sequences/alignedsequences?gene_name=IGHV1-8"
fetch "sequence-search-match.json"     "/data/sequences?sequence_str=ESEARCHTES"
fetch "sequence-search-empty.json"     "/data/sequences?sequence_str=NOMATCHFORTHIS"
fetch "fasta.txt"                      "/fasta/genomic?file_name=IGHV"

echo "Done. Recorded fixtures live in $OUT_DIR (gitignored)."
