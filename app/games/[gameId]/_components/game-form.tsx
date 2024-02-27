"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
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
import { GameModal, formSchema } from "../../_components/game-modal";

interface GameFormProps {
  initialData: GameChampion | null;
}
enum STEPS {
  championInGame = 0,
  gameResult = 1,
}

export type GameFormValues = z.infer<typeof formSchema>;

export const GameForm = ({ initialData }: GameFormProps) => {
  const router = useRouter();

  const { toast } = useToast();
  const [step, setStep] = useState(STEPS.championInGame);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [champions, setChampions] = useState<Champion[]>([]);

  const title = initialData
    ? "Edit a champion in game"
    : "Create a champion in game";
  const description = initialData
    ? "Edit a champion in game"
    : "Add a new champion in game";

  const action = initialData ? "Save changes" : "Create a champion in game";

  const form = useFormContext();

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     role: "",
  //     championId: "",
  //     damage: 0,
  //     gold: 0,
  //     goldAtFiveMin: 0,
  //     goldAtTenMin: 0,
  //   },
  // });

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

  let bodyContent = (
    <>
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
                      <SelectItem value={champion.label} key={champion.value}>
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
    </>
  );

  if (step === STEPS.gameResult) {
    bodyContent = (
      <>
        <FormField
          control={form.control}
          name="damage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game duration</FormLabel>
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
          name="damage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game duration</FormLabel>
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
      </>
    );
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      {/* {initialData && (
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      )} */}

      <GameModal body={bodyContent} title="create champion in game" />
    </>
  );
};
