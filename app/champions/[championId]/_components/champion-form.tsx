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

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  imageURL: z.string().min(1, {
    message: "Image is required",
  }),
});

interface ChampionFormProps {
  initialData: Champion | null;
}
type ChampionFormValues = z.infer<typeof formSchema>;

export const ChampionForm = ({ initialData }: ChampionFormProps) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const title = initialData ? "Edit champion" : "Create champion";
  const description = initialData ? "Edit a champion" : "Add a new champion";
  const toastMessage = initialData ? "Champion updated." : "Champion created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      imageURL: "",
    },
  });

  const onSubmit = async (data: ChampionFormValues) => {
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
          <div className="grid grid-cols-3 gap-8">
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
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
