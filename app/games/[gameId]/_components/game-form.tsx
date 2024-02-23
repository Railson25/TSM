"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Champion, GameChampion } from "@prisma/client";

import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { useCallback, useEffect, useState } from "react";

import { useToast } from "../../../../components/ui/use-toast";

import { Button } from "../../../../components/ui/button";
import { Trash } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/header";
import { AlertModal } from "@/components/alert-modal";
import { useRouter } from "next/navigation";

import { frameworks } from "@/components/select-role";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGameData } from "@/context/game-data-context";

const formSchema = z.object({
  damage: z.number().min(1, {
    message: "Damage is required",
  }),
  gold: z.number().min(1, {
    message: "Gold is required",
  }),
  goldAtFiveMin: z.number().nullable(),
  goldAtTenMin: z.number().nullable(),
  role: z.string().min(1, {
    message: "Champion is required",
  }),
  championId: z.string().min(1, {
    message: "Champion is required",
  }),
});

interface GameFormProps {
  initialData: GameChampion | null;
}
export type GameFormValues = z.infer<typeof formSchema>;

export const GameForm = ({ initialData }: GameFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [champions, setChampions] = useState<Champion[]>([]);
  const { addToGameData } = useGameData();
  const { toast } = useToast();

  const title = initialData
    ? "Edit a champion in game"
    : "Create a champion in game";
  const description = initialData
    ? "Edit a champion in game"
    : "Add a new champion in game";

  const action = initialData ? "Save changes" : "Create a champion in game";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      role: "",
      championId: "",
      damage: 0,
      gold: 0,
      goldAtFiveMin: 0,
      goldAtTenMin: 0,
    },
  });

  const addToCreateAGame = (data: GameFormValues) => {
    try {
      formSchema.parse(data);
      addToGameData(data);
      console.log(data);
      form.reset();
    } catch (error: any) {
      console.error(error.errors);
      return;
    }
  };

  // useEffect(() => {}, [addToCreateAGame]);

  const onDelete = async () => {
    // try {
    //   setLoading(true);
    //   await axios.delete(`/api/champions/${params.championId}`);
    //   router.push(`/champions`);
    //   router.refresh();
    //   toast({
    //     variant: "success",
    //     description: "Game updated",
    //   });
    // } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     description:
    //       "Make sure you removed all games using this champion first.!",
    //   });
    // } finally {
    //   setLoading(false);
    //   setOpen(false);
    // }
  };

  const handleClick = async () => {
    try {
      const response = await axios.get("/api/champions");
      setChampions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("srklghjsdroilhosidrghj", form.watch());
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Header title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="mb-10" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addToCreateAGame)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Champion Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      onOpenChange={handleClick}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Role</SelectLabel>

                          {frameworks.map((champion) => (
                            <SelectItem
                              value={champion.label}
                              key={champion.value}
                            >
                              {champion.value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="championId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Champion</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      onOpenChange={handleClick}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Champion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Champions</SelectLabel>

                          {champions.map((champion) => (
                            <SelectItem value={champion.id} key={champion.id}>
                              {champion.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="damage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Champion Damage</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      {...field}
                      {...form.register("damage", { valueAsNumber: true })}
                      value={field.value.toString()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Champion Gold</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      value={field.value.toString()}
                      {...form.register("gold", { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goldAtFiveMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gold at Five</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      {...form.register("goldAtFiveMin", {
                        valueAsNumber: true,
                      })}
                      value={field.value?.toString()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goldAtTenMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gold at Ten</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      {...form.register("goldAtTenMin", {
                        valueAsNumber: true,
                      })}
                      value={field.value?.toString()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
