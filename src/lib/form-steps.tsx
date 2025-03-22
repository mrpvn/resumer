import AchievementForm from "@/components/forms/achievement-form";
import EducationForm from "@/components/forms/educational-form";
import PersonalInfoForm from "@/components/forms/personal-form";
import ProjectForm from "@/components/forms/project-form";
import SkillForm from "@/components/forms/skill-form";
import WorkExperienceForm from "@/components/forms/work-experience";

export const formSteps = [
  {
    title: "Personal Information",
    component: PersonalInfoForm,
    key: 1,
  },
  {
    title: "Work Experience",
    component: WorkExperienceForm,
    key: 2,
  },
  { title: "Education", component: EducationForm, key: 3 },
  { title: "Skills", component: SkillForm, key: 4 },
  { title: "Projects", component: ProjectForm, key: 5 },
  { title: "Achievements", component: AchievementForm, key: 6 },
];
