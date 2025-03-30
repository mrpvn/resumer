"use client";

import BreadcrumbComponent from "@/components/form-breadcrumb";
import FormFooter from "@/components/form-footer";
import { Button } from "@/components/ui/button";
import { formSteps } from "@/lib/form-steps";
import { ResumeWithRelations } from "@/lib/types";
import { Eye, LayoutGrid, Printer } from "lucide-react";
import React, { useRef, useState } from "react";
import ResumePreviewContainer from "./resume-preview-container";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import useAutosave from "@/hooks/useAutoSave";
import TemplateSidebar from "./template-sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import useTemplate from "@/hooks/useTemplate";
import { useReactToPrint } from "react-to-print";

export default function ResumeEditor({
  resumeToEdit,
}: {
  resumeToEdit: ResumeWithRelations;
}) {
  const [resumeData, setResumeData] =
    useState<ResumeWithRelations>(resumeToEdit);

  const { hasUnsavedChanges } = useAutosave(resumeData);
  useUnloadWarning(hasUnsavedChanges);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [sampleResumeOpen, setSampleResumeOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrint = useReactToPrint({
    contentRef,
    documentTitle: resumeData.title || "Resume",
  });

  const FormComponent = formSteps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-sm:p-5 sm:p-5 md:p-10 gap-10">
      <div>
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            className="flex max-sm:gap-1 sm:gap-1 md:gap-2 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <LayoutGrid />
            Template
          </Button>
          <div className="flex justify-between max-sm:gap-1 sm:gap-1 md:gap-2 items-center">
            <Button
              onClick={() => setSampleResumeOpen(true)}
              className="cursor-pointer flex max-sm:gap-1 sm:gap-1 md:gap-2"
            >
              <Eye />
              Sample Resume
            </Button>
            <Button
              onClick={() => reactToPrint()}
              className="cursor-pointer max-sm:gap-1 sm:gap-1 md:gap-2 flex items-center"
            >
              <Printer />
              Print
            </Button>
          </div>
        </div>

        <BreadcrumbComponent
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        {FormComponent && (
          <FormComponent
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}
        <FormFooter currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
      <ResumePreviewContainer contentRef={contentRef} resumeData={resumeData} />
      <TemplateSidebar
        open={open}
        setOpen={setOpen}
        resumeData={resumeData}
        setResumeData={setResumeData}
      />
      <SampleResumeDialog
        open={sampleResumeOpen}
        setOpen={setSampleResumeOpen}
      />
    </div>
  );
}

const SampleResumeDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { selectedTemplate } = useTemplate();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sample Resume</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full">
          <Image
            src={`/templates/${selectedTemplate}.png`}
            alt="Sample Resume"
            width={595}
            height={842}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
