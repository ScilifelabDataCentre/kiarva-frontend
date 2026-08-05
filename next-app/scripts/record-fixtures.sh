#!/usr/bin/env bash
#
# Records backend responses into tests/fixtures/recorded/ for reference.
#
# Precondition: local backend running at $BACKEND_URL (default http://localhost:5000)
# seeded with the mock TSV from kiarva-backend/tests/generate_mock_data.py.
#
# NOTE: These recordings use the mock TSV's TEST-named genes (TEST1-8, SEQTEST1-2,
# ALIGNMENTTEST1-2, ...). The frontend queries with IGHV-prefixed names, so the
# actual E2E fixtures under tests/fixtures/ are hand-crafted with the same shapes
# but IGHV names. Use the recorded output here as ground truth for shape when
# updating those fixtures.

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
fetch "plotoptions-test1-8.json"          "/data/plotoptions?current_selection=TEST1-8%2A"
fetch "plotoptions-test1-69-1-69d.json"   "/data/plotoptions?current_selection=TEST1-69%2F1-69D%2A"
fetch "dbname-test1-8-01.json"            "/data/db_name?selection=TEST1-8,01"

# Frequency data
fetch "superpop-frequencies-test1-8-01.json"    "/data/frequencies/superpopulations?allele_name=TEST1-8%2A01"
fetch "pop-frequencies-test1-8-01.json"         "/data/frequencies/populations?allele_name=TEST1-8%2A01"
fetch "aa-superpop-frequencies-test1-8-01.json" "/data/aminoacidfrequencies/superpopulations?aa_allele_name=TEST1-8%2A01"
fetch "aa-pop-frequencies-test1-8-01.json"      "/data/aminoacidfrequencies/populations?aa_allele_name=TEST1-8%2A01"

# Allele metadata
fetch "igsnper-test1-8-01.json"     "/data/igsnperdata?allele_name=TEST1-8%2A01"
fetch "aa-alleles-test1-8-01.json"  "/data/aminoacidalleles?aa_allele_name=TEST1-8%2A01"
fetch "aa-list-test1-8-01.json"     "/data/aminoacidlist?aa_allele_name=TEST1-8%2A01"

# Sequences
fetch "aligned-sequences-alignmenttest1-2.json" "/data/sequences/alignedsequences?gene_name=ALIGNMENTTEST1-2"
fetch "sequence-search-match.json"              "/data/sequences?sequence_str=ESEARCHTES"
fetch "sequence-search-empty.json"              "/data/sequences?sequence_str=NOMATCHFORTHIS"

echo "Done. Recorded fixtures live in $OUT_DIR (gitignored)."
