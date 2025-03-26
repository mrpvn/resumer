import TemplateCard from "@/components/template-card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useTemplate from "@/hooks/useTemplate";
import { templates } from "@/lib/templates";
import { ResumeWithRelations } from "@/lib/types";
import { useState } from "react";

const TemplateSidebar = ({
  open,
  setOpen,
  resumeData,
  setResumeData,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  resumeData: ResumeWithRelations;
  setResumeData: (resumeData: ResumeWithRelations) => void;
}) => {
  const [purchasedTemplates, setPurchasedTemplates] = useState<string[]>([
    "standard",
  ]);
  const { selectedTemplate, setSelectedTemplate } = useTemplate();
  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (
      template &&
      (purchasedTemplates.includes(templateId) || !template.locked)
    ) {
      setSelectedTemplate(templateId);
      setResumeData({ ...resumeData, template: templateId });
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="w-[400px] sm:w-[540px] overflow-y-auto p-4"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">
            Select Resume Template
          </SheetTitle>
        </SheetHeader>
        <main className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id;
            const isPurchased = purchasedTemplates.includes(template.id);
            const isLocked = template.locked && !isPurchased;
            return (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={isSelected}
                isLocked={isLocked}
                onSelect={() => handleTemplateSelect(template.id)}
                onPurchase={() => console.log("purchase")}
              />
            );
          })}
        </main>
      </SheetContent>
    </Sheet>
  );
};

export default TemplateSidebar;
