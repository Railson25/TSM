"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Champion } from "@prisma/client";

import axios from "axios";

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
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { useToast } from "./ui/use-toast";
import Image from "next/image";
import { Button } from "./ui/button";
import { Loader2, XCircle } from "lucide-react";

interface ChampionFormProps {
  champion: Champion | null;
}

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  image: z.string().min(1, {
    message: "Image is required",
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
  const [image, setImage] = useState<string | undefined>(champion?.image);
  const [imageIsDeleting, setImageIsDeleting] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
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

  const handleImageDelete = (image: string) => {
    setImageIsDeleting(true);
    const imageKey = image.substring(image.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage("");
          toast({
            variant: "success",
            description: "Image removed",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Something went wrong",
        });
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h3 className="text-lg font-semibold">
          {champion ? "Update your champion" : "Create a champion"}
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6">
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
            <div>
              <FormLabel>Champion data </FormLabel>
              <FormDescription>
                Fill the field with the champion data
              </FormDescription>
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-2">
                <FormField
                  control={form.control}
                  name="games"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 rounded-md border p-4 ">
                      <FormControl className="w-1/2">
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormLabel className="uppercase font-extrabold">
                        Games
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="win"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 rounded-md border p-4 ">
                      <FormControl className="w-1/2">
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormLabel className="uppercase font-extrabold">
                        Victory
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lose"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 rounded-md border p-4 ">
                      <FormControl className="w-1/2">
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormLabel className="uppercase font-extrabold">
                        Defeat
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goldAtFive"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 rounded-md border p-4 ">
                      <FormControl className="w-1/2">
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormLabel className="uppercase font-extrabold">
                        Gold at five
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goldAtTen"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 rounded-md border p-4  ">
                      <FormControl className="w-1/2">
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormLabel className="uppercase font-extrabold ">
                        Gold at Ten
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-3">
                  <FormLabel>Upload an image</FormLabel>
                  <FormDescription>Choose an image</FormDescription>
                  <FormControl>
                    {image ? (
                      <>
                        <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                          <Image
                            fill
                            src={image}
                            alt="Champion Image"
                            className="object-contain"
                          />
                          <Button
                            onClick={() => handleImageDelete(image)}
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute right-[-12px] top-0"
                          >
                            {imageIsDeleting ? <Loader2 /> : <XCircle />}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col items-center max-w-[400px] p-12 border-2 border-dashed border-primary/50 rounded mt-4">
                          <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              setImage(res[0].url);
                              toast({
                                variant: "success",
                                description: "Upload completed!",
                              });
                            }}
                            onUploadError={(error: Error) => {
                              toast({
                                variant: "destructive",
                                description: `ERROR! ${error.message}`,
                              });
                            }}
                          />
                        </div>
                      </>
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1 flex flex-col gap-6">Image</div>
        </div>
      </form>
    </Form>
  );
};
