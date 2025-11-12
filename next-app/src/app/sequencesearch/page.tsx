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
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie, hasCookie } from "cookies-next";
import { backendAPI, BODY_CLASSES, H_1 } from "@/constants";
import { ISequenceSearchData } from "@/interfaces/types";
import SequenceSearchComponent from "@/components/SequenceSearchComponent";

const FormSchema = z.object({
  sequence: z.string().min(10, {
    message: "Sequence must be at least 10 nucleotides.",
  }),
});

export default function SequenceSearchInputForm() {
  const [axiosConfig, setAxiosConfig] = useState({
    headers: {
      "X-api-key": "",
    },
  });

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

  // check on page load if password cookie has been set yet, and if it has add to axios headers for all requests to backend
  useEffect(() => {
    if (hasCookie("password")) {
      setAxiosConfig({
        headers: {
          "X-api-key": getCookie("password") as string,
        },
      });
    }
  }, []);

  return (
    <div className={BODY_CLASSES}>
      <h1 className={H_1}>Sequence search</h1>
      {!hasCookie("password") && (
        <div className="alert alert-info bg-info text-info-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M12 7v2" />
            <path d="M12 13h.01" />
          </svg>
          <span className="text-sm lg:text-base">
            You are currently exploring the demo version of KIARVA. The full
            version will be released once the underlying data has been
            published. Until then, the pages are visible as a demonstration but
            without full data access.
          </span>
        </div>
      )}

      <div className="bg-muted alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="text-sm lg:text-base">
          This page allows users to search for subsets or exact matches of
          genomic sequences in the KI Adaptive Immune Receptor Gene Variant
          Atlas. Enter a sequence of at least 10 nucleotides and receive matches
          from the KIARVA database.
        </span>
      </div>
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
      {hasCookie("password") ? (
        sequenceData[0] &&
          (sequenceData[0].allele ? 
          <SequenceSearchComponent
            sequenceData={sequenceData}
            searchTermLength={searchTermLength}
          />
          :
          <p>No matches in database for the requested sequence.</p>
          )
      ) : (
        <p>
          Sequence search is currently disabled in the demo version. The feature
          will be available in the full release.
        </p>
      )}
    </div>
  );
}
