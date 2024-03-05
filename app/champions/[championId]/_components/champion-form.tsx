"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Champion } from "@prisma/client";

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
import { ImageUpload } from "@/components/image-upload";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/header";
import { AlertModal } from "@/components/alert-modal";
import { useParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { frameworks } from "@/components/select-role";

const formSchema = z.object({
  imageURL: z.string().min(1, {
    message: "Image is required",
  }),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  roles: z.string().min(1, {
    message: "Champion is required",
  }),
  baseDamage: z.string().min(1, { message: "Base damage is required" }),
  baseLife: z.string().min(1, { message: "Base life is required" }),
  baseMana: z.string().min(1, { message: "Base mana is required" }),
  regenLife: z.string().min(1, { message: "Life regeneration is required" }),
  regenMana: z.string().min(1, { message: "Mana regeneration is required" }),
  armor: z.string().min(1, { message: "Armor is required" }),
  magicArmor: z.string().min(1, { message: "Magic armor is required" }),
  attackSpeed: z.string().min(1, { message: "Attack speed is required" }),
  moveSpeed: z.string().min(1, { message: "Move speed is required" }),
});

interface ChampionFormProps {
  initialData: Champion | null;
}
type ChampionFormValues = z.infer<typeof formSchema>;

export const ChampionForm = ({ initialData }: ChampionFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const title = initialData ? "Edit champion" : "Create champion";
  const description = initialData ? "Edit a champion" : "Add a new champion";

  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      imageURL: "",
      name: "",
      roles: "",
      baseDamage: "",
      baseLife: "",
      baseMana: "",
      armor: "",
      magicArmor: "",
      attackSpeed: "",
      moveSpeed: "",
      regenLife: "",
      regenMana: "",
    },
  });

  const onSubmit = async (data: ChampionFormValues) => {
    try {
      setLoading(true);

      const roles = [data.roles];

      const newData = { ...data, roles };

      if (initialData) {
        await axios.patch(`/api/champions/${params.championId}`, newData);
        toast({
          variant: "success",
          description: "Champion updated",
        });
      } else {
        await axios.post(`/api/champions`, newData);
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
        description: "Champion updated",
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
          <FormField
            control={form.control}
            name="imageURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Champion image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    disabled={loading}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Champion Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roles"
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
              name="baseDamage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base damage</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Champion Damage"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="baseLife"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base life</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Champion life"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="baseMana"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base mana</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Champion mana"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="armor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Armor</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Champion armor"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="magicArmor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Magic armor</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Champion magic armor"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attackSpeed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attack speed</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Champion attack speed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="moveSpeed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Move speed</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Champion move speed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="regenLife"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Life regeneration</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Champion life regeneration"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="regenMana"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mana regeneration</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Champion mana regeneration"
                      {...field}
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
