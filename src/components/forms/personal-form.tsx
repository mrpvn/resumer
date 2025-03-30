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
import { Button } from "@/components/ui/button";
import { CirclePlus, Loader, WandSparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  PersonalInfoSchema,
  PersonalInfoSchemaType,
} from "@/lib/form-validation";
import { GenerateSummaryFromAI } from "@/actions/gemini";
import { FormProps } from "@/lib/types";

const PersonalInfoForm = ({ resumeData, setResumeData }: FormProps) => {
  const form = useForm<PersonalInfoSchemaType>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      firstName: resumeData?.personalInfo?.firstName || "",
      lastName: resumeData?.personalInfo?.lastName || "",
      email: resumeData?.personalInfo?.email || "",
      phone: resumeData?.personalInfo?.phone || "",
      linkedin: resumeData?.personalInfo?.linkedin || "",
      github: resumeData?.personalInfo?.github || "",
      website: resumeData?.personalInfo?.website || "",
      address: resumeData?.personalInfo?.address || "",
      summary: resumeData?.personalInfo?.summary || "",
    },
  });
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        personalInfo: {
          firstName: values.firstName || null,
          lastName: values.lastName || null,
          email: values.email || null,
          phone: values.phone || null,
          linkedin: values.linkedin || null,
          github: values.github || null,
          website: values.website || null,
          address: values.address || null,
          summary: values.summary || null,
        },
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const {
    data: summaries,
    isLoading,
    error = true,
    refetch,
  } = useQuery<
    Array<{
      experience_level: string;
      summary: string;
    }>,
    Error
  >({
    queryKey: ["summary"],
    queryFn: async () => GenerateSummaryFromAI(resumeData?.title || ""),
    enabled: false,
  });

  return (
    <div className="py-5 md:p-5 shadow-lg rounded-lg border-t-4 border-t-primary my-4">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with basis information</p>
      <Form {...form}>
        <form className="grid grid-cols-2 mt-5 gap-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@domain.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="9876543210" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Linkedin Profile</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. linkedin.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Github</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. github.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website/Portfolio URL</FormLabel>
                <FormControl>
                  <Input placeholder="yourwebsite.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="New Delhi, India" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className="mt-7 col-span-2">
                <div className="flex justify-between items-end">
                  <FormLabel>Resume Summary</FormLabel>
                  <Button
                    onClick={() => {
                      if (!summaries) {
                        refetch();
                      }
                    }}
                    type="button"
                    className="border-primary cursor-pointer text-primary hover:text-primary"
                    variant="outline"
                  >
                    {isLoading ? (
                      <Loader className="animate-spin" size={20} />
                    ) : (
                      <WandSparkles className="mr-1" size={20} />
                    )}
                    Generate from AI
                  </Button>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Professional with 5+ years' work experience in driving process automation, analysis, reporting, and end-toend client management. Strong problem-solving skills and a commitment to delivering high-quality results."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {error && toast.error("Unable to generate summary")}
      {!summaries && isLoading ? (
        <div className="flex flex-col gap-2 mt-2">
          <Skeleton className="w-full h-[120px]" />
          <Skeleton className="w-full h-[120px]" />
          <Skeleton className="w-full h-[120px]" />
        </div>
      ) : (
        <div>
          {summaries?.map((summary, i: number) => {
            return (
              <div className="my-2 border rounded-md p-4" key={i}>
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">
                    {summary.experience_level}
                  </h2>
                  <CirclePlus
                    className="cursor-pointer"
                    onClick={() => {
                      form.setValue("summary", summary.summary);
                    }}
                    size={16}
                  />
                </div>
                <p className="text-sm">{summary.summary}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PersonalInfoForm;
