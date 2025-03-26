"use client";

import BreadcrumbComponent from "@/components/form-breadcrumb";
import FormFooter from "@/components/form-footer";
import { Button } from "@/components/ui/button";
import { formSteps } from "@/lib/form-steps";
import { ResumeWithRelations } from "@/lib/types";
import { LayoutGrid } from "lucide-react";
import React, { useState } from "react";
import ResumePreviewContainer from "./resume-preview-container";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import useAutosave from "@/hooks/useAutoSave";
import TemplateSidebar from "./template-sidebar";

const ResumeEditor = ({
  resumeToEdit,
}: {
  resumeToEdit: ResumeWithRelations;
}) => {
  const [resumeData, setResumeData] =
    useState<ResumeWithRelations>(resumeToEdit);

  const { hasUnsavedChanges } = useAutosave(resumeData);
  useUnloadWarning(hasUnsavedChanges);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [open, setOpen] = useState(false);

  const FormComponent = formSteps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
      <div>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <LayoutGrid />
          Template
        </Button>
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
      <ResumePreviewContainer resumeData={resumeData} />
      <TemplateSidebar
        open={open}
        setOpen={setOpen}
        resumeData={resumeData}
        setResumeData={setResumeData}
      />
    </div>
  );
};

export default ResumeEditor;
