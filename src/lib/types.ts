import {
  Achievement,
  Education,
  PersonalInfo,
  Project,
  Resume,
  Skills,
  WorkExperience,
} from "@prisma/client";

export interface ResumeEditorFormProps {
  resumeData: Resume;
  setResumeData: (data: Resume) => void;
}

export type ResumeWithRelations = Resume & {
  personalInfo: PersonalInfo | null;
  workExperiences: WorkExperience[];
  educations: Education[];
  projects: Project[];
  skills: Skills | null;
  achievements: Achievement | null;
};

export interface FormProps {
  resumeData: ResumeWithRelations;
  setResumeData: (data: ResumeWithRelations) => void;
}
