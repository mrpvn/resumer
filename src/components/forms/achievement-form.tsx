"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { FormProps } from "@/lib/types";
import {
  AchievementSchema,
  AchievementSchemaType,
} from "@/lib/form-validation";

const AchievementForm = ({ resumeData, setResumeData }: FormProps) => {
  const form = useForm<AchievementSchemaType>({
    resolver: zodResolver(AchievementSchema),
    defaultValues: {
      achievements: resumeData?.achievements?.achievements || "",
    },
  });
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        achievements: {
          id: resumeData.achievements?.id || "",
          resumeId: resumeData.id,
          achievements: values.achievements || null,
        },
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary my-4">
      <h2 className="font-bold text-lg">Achievements</h2>
      <p>Add your achievements here</p>
      <Form {...form}>
        <form className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="achievements"
            render={({ field }) => (
              <FormItem className="mt-5 col-span-2">
                <div className="flex justify-between items-end">
                  <FormLabel>Achievements</FormLabel>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Won 1st prize in hackathon"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default AchievementForm;
