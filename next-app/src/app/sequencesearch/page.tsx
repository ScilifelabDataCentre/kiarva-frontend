// split out API calls and UI into separate server and client components? Should be doable, but could be
// a bit complicated.

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { axiosConfig, backendAPI, BODY_CLASSES, H_1 } from "@/constants";
import { ISequenceSearchData } from "@/interfaces/types";
import SequenceSearchComponent from "@/components/SequenceSearchComponent";

const FormSchema = z.object({
  sequence: z.string().min(10, {
    message: "Sequence must be at least 10 nucleotides.",
  }),
});

export default function SequenceSearchInputForm() {
  const sequenceSearchEndpoint = backendAPI + "data/sequences?sequence_str=";
  const [sequenceData, setSequenceData] = useState<ISequenceSearchData[]>([]);
  const [searchTermLength, setSearchTermLength] = useState<number>(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sequence: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following sequence:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    const encodedURI = encodeURI(sequenceSearchEndpoint + data.sequence);
    await axios
      .get(encodedURI, axiosConfig)
      .then((response) => {
        setSearchTermLength(data.sequence.length);
        setSequenceData(response.data);
      })
      .catch((response) => console.log(response.error));
  }

  return (
    <main className={BODY_CLASSES}>
      <h1 className={H_1}>Sequence search</h1>

      <aside
        className="bg-neutral alert border-none"
        role="note"
        aria-label="Sequence search instructions"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <p className="text-sm lg:text-base">
          This page allows users to search for exact matches of full-length IGHV 
          sequences in the KI Adaptive Immune Receptor Gene Variant Atlas. This enables 
          users to quickly screen novel variants identified in their own work for exact 
          identity to alleles within the KIARVA database.
        </p>
      </aside>

      <section aria-labelledby="search-form-heading">
        <h2 id="search-form-heading" className="sr-only">
          Search form
        </h2>
        <div className="border-2 p-4 rounded-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="sequence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sequence</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter sequence" {...field} />
                    </FormControl>
                    <FormDescription>
                      Search for a sequence in the KIARVA database.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="default" size="default" type="submit">
                <Search />
                Search
              </Button>
            </form>
          </Form>
        </div>
      </section>

      <section aria-labelledby="search-results-heading">
        <h2 id="search-results-heading" className="sr-only">
          Search results
        </h2>
        {sequenceData.length === 0 ? (
          <p role="status" aria-live="polite">
            Submit a sequence above to see matches.
          </p>
        ) : sequenceData[0] && sequenceData[0].allele ? (
          <SequenceSearchComponent
            sequenceData={sequenceData}
            searchTermLength={searchTermLength}
          />
        ) : (
          <p role="status" aria-live="polite">
            No matches in database for the requested sequence.
          </p>
        )}
      </section>
    </main>
  );
}
