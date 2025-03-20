import CreateResumeButton from "@/components/create-resume";
import ResumeCard from "@/components/resume-card";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Your resumes",
};

const ResumesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 md:mb-0">
          My Resumes
        </h1>
        <CreateResumeButton />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* <CreateResume /> */}
        {/* <ResumeCard /> */}
      </div>
    </div>
  );
};

export default ResumesPage;
