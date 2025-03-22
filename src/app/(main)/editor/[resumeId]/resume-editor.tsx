"use client";

import BreadcrumbComponent from "@/components/form-breadcrumb";
import FormFooter from "@/components/form-footer";
import { Button } from "@/components/ui/button";
import { formSteps } from "@/lib/form-steps";
import { ResumeWithRelations } from "@/lib/types";
import { LayoutGrid } from "lucide-react";
import React, { useState } from "react";

const ResumeEditor = ({
  resumeToEdit,
}: {
  resumeToEdit: ResumeWithRelations;
}) => {
  const [resumeData, setResumeData] =
    useState<ResumeWithRelations>(resumeToEdit);

  const [currentStep, setCurrentStep] = useState<number>(1);

  const FormComponent = formSteps.find(
    (step) => step.key === currentStep
  )?.component;

  console.log("FormComponent");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
      <div>
        <Button variant="outline" size="sm" className="flex gap-2">
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
      {/* <ResumePreview resumeData={resumeData} setResumeData={setResumeData} /> */}
    </div>
  );
};

export default ResumeEditor;
