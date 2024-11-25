"use client"

import { ColumnDef } from "@tanstack/react-table"

export type SequenceRow = {
  allele: string
  sequence: string
}

export const columns: ColumnDef<SequenceRow>[] = [
  {
    accessorKey: "allele",
    header: "Allele",
  },
  {
    accessorKey: "sequence",
    header: "Sequence",
  },
]
