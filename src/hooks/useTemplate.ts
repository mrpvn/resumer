import { create } from "zustand";

interface TemplateState {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
}

const useTemplate = create<TemplateState>((set) => ({
  selectedTemplate: "standard",
  setSelectedTemplate: (selectedTemplate: string) => set({ selectedTemplate }),
}));

export default useTemplate;
