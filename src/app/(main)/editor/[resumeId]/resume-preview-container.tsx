import React from "react";
import ResumePreview from "./resume-preview";
import { ResumeWithRelations } from "@/lib/types";

type Props = {
  resumeData: ResumeWithRelations;
};

const ResumePreviewContainer = ({ resumeData }: Props) => {
  return (
    <div className="w-full md:flex">
      <div className="flex w-full h-fit justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          className="max-w-2xl shadow-md"
          resumeData={resumeData}
        />
      </div>
    </div>
  );
};

export default ResumePreviewContainer;
