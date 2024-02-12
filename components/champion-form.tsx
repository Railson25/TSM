"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Champion } from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface ChampionFormProps {
  champion: Champion | null;
}

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  winRate: z.number().optional(),
  games: z.number().optional(),
  damagePerMinute: z.number().optional(),
  goldAtFive: z.number().optional(),
  goldAtTen: z.number().optional(),
  win: z.number().optional(),
  lose: z.number().optional(),
});

export const ChampionForm = ({ champion }: ChampionFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      winRate: 0,
      games: 0,
      damagePerMinute: 0,
      goldAtFive: 0,
      goldAtTen: 0,
      win: 0,
      lose: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Champion</FormLabel>
              <FormDescription>Provide your champion name</FormDescription>
              <FormControl>
                <Input placeholder="Name of champion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
