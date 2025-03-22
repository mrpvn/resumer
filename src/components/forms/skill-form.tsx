"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProps } from "@/lib/types";
import { SkillsSchema, SkillsSchemaType } from "@/lib/form-validation";
import AlertComponent from "../alert";

const SkillForm = ({ resumeData, setResumeData }: FormProps) => {
  const form = useForm<SkillsSchemaType>({
    resolver: zodResolver(SkillsSchema),
    defaultValues: {
      technicalSkills: resumeData?.skills?.technicalSkills || [],
      functionalSkills: resumeData?.skills?.functionalSkills || [],
    },
  });
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        skills: {
          id: resumeData.skills?.id || "",
          resumeId: resumeData.id,
          technicalSkills:
            values.technicalSkills
              ?.filter((skill) => skill !== undefined)
              .map((skill) => skill.trim())
              .filter((skill) => skill !== "") || [],
          functionalSkills:
            values.functionalSkills
              ?.filter((skill) => skill !== undefined)
              .map((skill) => skill.trim())
              .filter((skill) => skill !== "") || [],
        },
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary my-4">
      <h2 className="font-bold text-lg mb-1">Skills</h2>
      <AlertComponent description="Please separate different skills with a comma (,)" />
      <Form {...form}>
        <form className="grid grid-cols-2 mt-5 gap-3">
          <FormField
            control={form.control}
            name="technicalSkills"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Technical Skills</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Python, Java, PHP"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const skills = value.split(",");
                      field.onChange(skills);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="functionalSkills"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Functional Skills</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Agile, SDLC, JIRA"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const skills = value.split(",");
                      field.onChange(skills);
                    }}
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

export default SkillForm;
