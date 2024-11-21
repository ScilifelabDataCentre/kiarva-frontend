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
import { backendAPI, BODY_CLASSES } from "@/constants"
import { ISequenceData } from "@/interfaces/types"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

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

  return (
    <div className={BODY_CLASSES}>
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
        {hasCookie('password') ? 
            <DataTable columns={columns} data={sequenceData} />
            :
            <p>Sequence seach disabled for light version. Will be available for full release.</p>}
    </div>
  )
}
