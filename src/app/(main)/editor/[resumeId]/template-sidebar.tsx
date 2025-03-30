import { GetUser } from "@/actions/actions";
import { CreateCheckoutSession } from "@/actions/stripe";
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
import { useQuery } from "@tanstack/react-query";

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
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => GetUser(resumeData.userId),
  });
  const { selectedTemplate, setSelectedTemplate } = useTemplate();
  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template && user?.templates.includes(templateId)) {
      setSelectedTemplate(templateId);
      setResumeData({ ...resumeData, template: templateId });
    }
  };
  const handlePurchase = async (priceId: string, templateId: string) => {
    const url = await CreateCheckoutSession(priceId, templateId);
    window.location.href = url;
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="w-[400px] max-sm:w-[300px] sm:w-[500px] overflow-y-auto p-4"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">
            Select Resume Template
          </SheetTitle>
        </SheetHeader>
        <main className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id;
            return (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={isSelected}
                onSelect={() => handleTemplateSelect(template.id)}
                onPurchase={() => handlePurchase(template.priceId, template.id)}
                isPurchased={user?.templates.includes(template.id)}
              />
            );
          })}
        </main>
      </SheetContent>
    </Sheet>
  );
};

export default TemplateSidebar;
