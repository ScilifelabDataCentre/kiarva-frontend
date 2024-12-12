"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import axios from "axios"
import { getCookie, hasCookie } from "cookies-next"
import { backendAPI, BODY_CLASSES, H_1 } from "@/constants"
import { ISequenceData } from "@/interfaces/types"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import DisclaimerPopupComponent from "@/components/DisclaimerPopupComponent"

const FormSchema = z.object({
  sequence: z.string().min(10, {
    message: "Sequence must be at least 10 nucleotides.",
  }),
})

export default function SequenceSearchInputForm() {
    const [axiosConfig, setAxiosConfig] = useState({
        headers: {
          "X-api-key": "",
        }
      })

    const sequenceSearchEndpoint = backendAPI + "data/sequences/"
    const [sequenceData, setSequenceData] = useState<ISequenceData[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sequence: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following sequence:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    await axios
    .get(sequenceSearchEndpoint + data.sequence, axiosConfig)
    .then((response) => {
      setSequenceData(response.data);
    })
    .catch((response) => console.log(response.error));
  }

  // check on page load if password cookie has been set yet, and if it has add to axios headers for all requests to backend
  useEffect(() => {
    if (hasCookie('password')) {
      setAxiosConfig({
        headers: {
            'X-api-key': getCookie('password') as string,
        }
      })
    }
  }, [])

  function setIsDisclaimerPopupOpen(arg0: boolean): void {
    if (arg0) {
        console.log("Disclaimer popup button not implemented.")
    }
  }

  return (
    <div className={BODY_CLASSES}>
      <h1 className={H_1}>Sequence search</h1>
        {!hasCookie('password') &&
        <button
          className="bg-warning text-warning-content text-base lg:text-lg flex gap-2 justify-center items-center px-4 order-first lg:px-0 w-full h-12 font-bold rounded-3xl shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:opacity-90"
          onClick={() => setIsDisclaimerPopupOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Disclaimer
        </button>}
        {!hasCookie('password') && setIsDisclaimerPopupOpen && (
          <DisclaimerPopupComponent
            onClose={() => setIsDisclaimerPopupOpen(false)}
            explanation="This page is fully developed and allows you to explore its
                      design and functionality. However, the underlying data has
                      not been officially published yet."
          />
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
            This page allows users to search for subsets or exact matches of genomic sequences in
            the KI Adaptive Immune Receptor Gene Variant Atlas. Enter a sequence of at least 10 nucleotides
            and receive matches from the KIARVA database.
          </span>
        </div>
        <div className="border-2 p-4 rounded-md">
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
              <Button type="submit">Search</Button>
          </form>
          </Form>
        </div>
        {hasCookie('password') ? 
            <DataTable columns={columns} data={sequenceData} />
            :
            <p>Sequence seach disabled for light version. Will be available for full release.</p>}
    </div>
  )
}
