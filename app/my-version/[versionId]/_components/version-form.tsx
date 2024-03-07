"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

import { Header } from "@/components/header";
import { AlertModal } from "@/components/alert-modal";
import { useParams, useRouter } from "next/navigation";
import { gameVersion } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Version is required",
  }),
});

interface VersionFormProps {
  initialData: gameVersion | null;
}

type VersionFormValues = z.infer<typeof formSchema>;

export const VersionForm = ({ initialData }: VersionFormProps) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const action = initialData ? "Save changes" : "Create";

  const onSubmit = async (data: VersionFormValues) => {
    try {
      setLoading(true);

      const existingVersion = await axios.get(
        `/api/my-version?name=${form.getValues().name}`
      );
      const versions = existingVersion.data;
      const exactMatch = versions.find(
        (version: any) => version.name === form.getValues().name
      );

      if (exactMatch) {
        toast({
          variant: "destructive",
          description: "Version with this name already exists",
        });
        return;
      }
      if (initialData) {
        await axios.patch(`/api/my-version/${params.versionId}`, data);
        toast({
          variant: "success",
          description: "Version updated",
        });
      } else {
        await axios.post(`/api/my-version`, form.getValues());
        toast({
          variant: "success",
          description: "Version created",
        });
      }
      router.push(`/my-version`);
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
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onSubmit(form.getValues())}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Header title="Create Version" description="Add a new version" />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="max-w-96">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Version name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Version Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <Button
        disabled={loading}
        className="mt-10 max-w-96"
        onClick={() => setOpen(true)}
      >
        {action}
      </Button>
    </>
  );
};
