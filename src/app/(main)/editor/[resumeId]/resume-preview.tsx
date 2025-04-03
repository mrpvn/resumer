"use client";

import useDimensions from "@/hooks/useDimension";
import useTemplate from "@/hooks/useTemplate";
import { templates } from "@/lib/templates";
import { ResumeWithRelations } from "@/lib/types";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

type Props = {
  resumeData: ResumeWithRelations;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
};

export default function ResumePreview({
  resumeData,
  contentRef,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  const { setSelectedTemplate } = useTemplate();
  useEffect(() => {
    if (resumeData?.template) {
      setSelectedTemplate(resumeData.template);
    }
  }, [resumeData?.template, setSelectedTemplate]);
  const TemplateComponent = templates.find(
    (template) => template.id === resumeData?.template
  )?.component;
  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resume-preview"
      >
        {TemplateComponent && <TemplateComponent resumeData={resumeData} />}
      </div>
    </div>
  );
}
