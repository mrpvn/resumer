import { Metadata } from "next";
import React from "react";
import ResumeEditor from "./resume-editor";
import { GetResume } from "@/actions/actions";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const metadata: Metadata = {
  title: "Design your resume",
};

export default async function Page({
  params,
}: {
  params: { resumeId: string };
}) {
  const { resumeId } = await params;
  if (!resumeId) {
    return null;
  }
  const resume = await GetResume(resumeId);

  if (!resume) {
    toast.error("Unable to find resume");
    redirect("/resumes");
  }

  return <ResumeEditor resumeToEdit={resume} />;
}
