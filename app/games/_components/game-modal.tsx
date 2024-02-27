"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";

import { useCallback, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import { useGameData } from "@/context/game-data-context";
import { GameFormValues } from "../[gameId]/_components/game-form";
import { useToast } from "@/components/ui/use-toast";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";

interface gameModalProps {
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  disabled?: boolean;
}

interface FieldValue extends GameFormValues {}

export const formSchema = z.object({
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

export const GameModal = ({
  body,
  onSubmit,
  footer,
  title,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  disabled,
}: gameModalProps) => {
  const [showModal, setShowModal] = useState(true);
  const { toast } = useToast();
  const form = useFormContext();
  const { addToGameData, gameData } = useGameData();

  const addToCreateAGame: SubmitHandler<FieldValues> = (data) => {
    try {
      formSchema.parse(data);
      addToGameData(data as FieldValue);
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

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  const handleSubmit = useCallback(() => {
    if (disabled || !onSubmit) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="relative w-full mx-auto h-full">
          <div
            className={`translate duration-300 ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="translate h-full rounded-lg flex flex-col w-full">
              <div className="flex items-center justify-center">
                <div className="text-lg font-semibold ">{title}</div>
              </div>
              <div className="flex items-center justify-between flex-col">
                <Separator className="mb-10" />
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(addToCreateAGame)}
                    className="space-y-8 w-full"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {body}
                    </div>
                    <div className="flex flex-col gap-2 p-6 max-sm:p-1">
                      <div className="flex flex-row items-center justify-between">
                        {actionLabel === "Add win/lose" && (
                          <Button variant="premium" type="submit">
                            Add champion to game
                          </Button>
                        )}
                        {secondaryAction && secondaryActionLabel && (
                          <Button
                            variant="outline"
                            onClick={handleSecondaryAction}
                          >
                            {secondaryActionLabel}
                          </Button>
                        )}
                        <Button onClick={handleSubmit}>{actionLabel}</Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
