import React from "react";
import { Button } from "./ui/button";
import { formSteps } from "@/lib/form-steps";

interface FormFooterProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const FormFooter = ({ currentStep, setCurrentStep }: FormFooterProps) => {
  const previousStep = formSteps.find(
    (_, index) => formSteps[index + 1]?.key === currentStep
  )?.key;

  const nextStep = formSteps.find(
    (_, index) => formSteps[index - 1]?.key === currentStep
  )?.key;

  return (
    <div className="grid grid-cols-2 mt-5 gap-3">
      <Button
        disabled={!previousStep}
        onClick={previousStep ? () => setCurrentStep(previousStep) : undefined}
        className="cursor-pointer"
        type="button"
      >
        Previous
      </Button>
      <Button
        disabled={!nextStep}
        onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
        className="cursor-pointer"
        type="submit"
      >
        Next
      </Button>
    </div>
  );
};

export default FormFooter;
