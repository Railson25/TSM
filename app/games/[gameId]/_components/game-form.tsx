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
import { AlertModal } from "@/components/alert-modal";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
  damage: z.number().min(1, {
    message: "Damage is required",
  }),
  gold: z.number().min(1, {
    message: "Gold is required",
  }),
  goldAtFiveMin: z.number().nullable().default(0),
  goldAtTenMin: z.number().nullable().default(0),
});

interface GameFormProps {
  initialData: GameChampion | null;
}
type GameFormValues = z.infer<typeof formSchema>;

export const GameForm = ({ initialData }: GameFormProps) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const title = initialData ? "Edit game" : "Create game";
  const description = initialData ? "Edit a game" : "Add a new game";
  const toastMessage = initialData ? "Game updated." : "Game created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      damage: 0,
      gold: 0,
      goldAtFiveMin: 0,
      goldAtTenMin: 0,
    },
  });

  const onSubmit = async (data: GameFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/champions/${params.championId}`, data);
        toast({
          variant: "success",
          description: "Champion updated",
        });
      } else {
        await axios.post(`/api/champions`, data);
        toast({
          variant: "success",
          description: "Champion created",
        });
      }
      router.push(`/champions`);
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

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/champions/${params.championId}`);
      router.push(`/champions`);
      router.refresh();
      toast({
        variant: "success",
        description: "Game updated",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          "Make sure you removed all games using this champion first.!",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

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
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="damage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Champion Damage</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
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
                    <Input disabled={loading} type="number" {...field} />
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
                      value={field.value !== null ? field.value : 0}
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
                      value={field.value !== null ? field.value : 0}
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
