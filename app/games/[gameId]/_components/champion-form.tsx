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
import { useState } from "react";

import { useToast } from "../../../../components/ui/use-toast";

import { Button } from "../../../../components/ui/button";
import { Trash } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/header";

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
  damageByDeath: z.number().nullable(),
  damageSuffered: z.number().nullable(),
  teamParticipation: z.number().nullable(),
  shieldOfCure: z.number().nullable(),
  epicMonster: z.number().nullable(),
  wardNumber: z.number().nullable(),
  goldDamageRate: z.number().nullable(),
  farmMonster: z.number().nullable(),
  troopScore: z.number().nullable(),
  toppledTowers: z.number().nullable(),
});

interface ChampionFormProps {
  initialData: GameChampion | null;
}
export type ChampionFormValues = z.infer<typeof formSchema>;

export const ChampionForm = ({ initialData }: ChampionFormProps) => {
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
      damageByDeath: 0,
      damageSuffered: 0,
      epicMonster: 0,
      farmMonster: 0,
      goldDamageRate: 0,
      shieldOfCure: 0,
      teamParticipation: 0,
      toppledTowers: 0,
      troopScore: 0,
      wardNumber: 0,
    },
  });

  const addToCreateAGame = (data: ChampionFormValues) => {
    try {
      formSchema.parse(data);
      addToGameData(data);
      console.log(data);
      form.reset();
    } catch (error: any) {
      if (
        error instanceof Error &&
        error.message.startsWith("Champion with ID")
      ) {
        toast({
          variant: "destructive",
          description: "Esse campeão já foi adicionado a este game",
        });
        console.error(error.message);
      } else {
        console.error(error.errors);
      }
      return;
    }
  };

  const handleClick = async () => {
    try {
      const response = await axios.get("/api/champions");
      setChampions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
            <FormField
              control={form.control}
              name="damageSuffered"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Damage suffered</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      {...form.register("damageSuffered", {
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
              name="damageByDeath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Damage by death</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      {...form.register("damageByDeath", {
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
              name="teamParticipation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team participation</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      {...form.register("teamParticipation", {
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
              name="shieldOfCure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shield of cure</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      {...form.register("shieldOfCure", {
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
              name="epicMonster"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Epic monster</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      {...form.register("epicMonster", {
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
              name="wardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ward number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      {...form.register("wardNumber", {
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
              name="goldDamageRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gold gold/damage</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      {...form.register("goldDamageRate", {
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
              name="farmMonster"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farm monster</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      {...form.register("farmMonster", {
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
              name="troopScore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Troop score</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      {...form.register("troopScore", {
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
              name="toppledTowers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Toppled towers</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      {...form.register("toppledTowers", {
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
          <div>
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
            {/* TODO: checkbox */}
            <button>MARK THIS IF IS A ENEMY</button>
          </div>
        </form>
      </Form>
    </>
  );
};
