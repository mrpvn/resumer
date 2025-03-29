import React from "react";
import ResumePreview from "./resume-preview";
import { ResumeWithRelations } from "@/lib/types";

type Props = {
  resumeData: ResumeWithRelations;
  contentRef?: React.RefObject<HTMLDivElement | null>;
};

const ResumePreviewContainer = ({ resumeData, contentRef }: Props) => {
  return (
    <div className="w-full md:flex">
      <div className="flex w-full h-fit justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          className="max-w-2xl shadow-md"
          resumeData={resumeData}
          contentRef={contentRef}
        />
      </div>
    </div>
  );
};

export default ResumePreviewContainer;
