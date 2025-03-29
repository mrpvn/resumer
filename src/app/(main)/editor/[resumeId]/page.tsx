import { Metadata } from "next";
import React from "react";
import ResumeEditor from "./resume-editor";
import { GetResume } from "@/actions/actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Design your resume",
};

interface PageProps {
  params: Promise<{ resumeId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { resumeId } = await params;
  if (!resumeId) {
    return null;
  }
  const resume = await GetResume(resumeId);

  if (!resume) {
    redirect("/resumes");
  }

  return <ResumeEditor resumeToEdit={resume} />;
}
