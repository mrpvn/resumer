"use client";

import useDimensions from "@/hooks/useDimension";
import { ResumeWithRelations } from "@/lib/types";
import { cn } from "@/lib/utils";
import StandardTemplate from "@/templates/standard";
import React, { useRef } from "react";

type Props = {
  resumeData: ResumeWithRelations;
  className?: string;
};

export default function ResumePreview({ resumeData, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <StandardTemplate resumeData={resumeData} />
      </div>
    </div>
  );
}
