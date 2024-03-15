"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { toast } from "@/components/ui/use-toast";
import { useGameData } from "@/context/game-data-context";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface GameFormData {
  damage: number;
  gold: number;
  goldAtFiveMin: number | null;
  goldAtTenMin: number | null;
  role: string;
  championId: string;
  gameDuration: string;
  win: boolean;
  lose: boolean;
}

const formSchema = z.object({
  gameDuration: z.string().min(1, {
    message: "Game duration is required",
  }),
  win: z.boolean().default(false).optional(),
  lose: z.boolean().default(false).optional(),
  totalKills: z.number().min(0, {
    message: "Game kill is required",
  }),
  totalDeath: z.number().min(0, {
    message: "Game deaths is required",
  }),
});

export const GameForm = () => {
  const { gameData, clearGameData } = useGameData();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameDuration: "",
      win: false,
      lose: false,
      totalDeath: 0,
      totalKills: 0,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      console.log(data);
      const versions = await axios.get(`/api/my-version`);
      if (versions.data.length === 0) {
        toast({
          variant: "destructive",
          description:
            "No version found. Create a version before creating a game",
        });
        return;
      }

      if (Array.isArray(gameData) && gameData.length === 0) {
        toast({
          variant: "destructive",
          description: "Add champions to the game first",
        });
        return;
      }

      if (data.win && data.lose) {
        toast({
          variant: "destructive",
          description: "Choose only one result for the match",
        });
        return;
      }

      if (!data.win && !data.lose) {
        toast({
          variant: "destructive",
          description: "Choose the result of the match",
        });
        return;
      }

      const postData: GameFormData = {
        ...data,
        ...gameData,
      };

      await axios.post(`/api/games`, postData);
      toast({
        variant: "success",
        description: "Game created",
      });

      clearGameData();
      form.reset();

      router.push(`/games`);
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-2 pb-4 gap-10 flex flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="gameDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game duration</FormLabel>
                <FormControl>
                  <Input type="time" {...field} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalKills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game kills</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value}
                    {...form.register("totalKills", {
                      valueAsNumber: true,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalDeath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game deaths</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value}
                    {...form.register("totalDeath", {
                      valueAsNumber: true,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="win"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Game win?</FormLabel>
                  <FormDescription>
                    Mark this if you win this game?
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lose"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Game lose?</FormLabel>
                  <FormDescription>
                    Mark this if you lose this game?
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-center">
            <Button variant="premium" type="submit" disabled={loading}>
              Create a game
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
