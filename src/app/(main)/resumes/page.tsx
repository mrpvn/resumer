import { GetAllResumes } from "@/actions/actions";
import CreateResumeButton from "@/components/create-resume";
import { Metadata } from "next";
import React from "react";
import ResumesClient from "./resume-client";

export const metadata: Metadata = {
  title: "Your resumes",
};

const ResumesPage = async () => {
  const resumes = await GetAllResumes();
  return (
    <div className="relative container mx-auto h-[90vh] px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 md:mb-0">
          My Resumes
        </h1>
        <CreateResumeButton />
      </div>
      {resumes.length > 0 ? (
        <ResumesClient initialResumes={resumes} />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="mb-4 text-center">
            You have no resumes. Create your first resume now!
          </p>
          <CreateResumeButton />
        </div>
      )}
    </div>
  );
};

export default ResumesPage;
