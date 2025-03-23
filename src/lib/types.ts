import {
  Achievement as PrismaAchievement,
  Education as PrismaEducation,
  PersonalInfo as PrismaPersonalInfo,
  Project as PrismaProject,
  Resume,
  Skills as PrismaSkills,
  WorkExperience as PrismaWorkExperience,
} from "@prisma/client";

export type PersonalInfo = Omit<PrismaPersonalInfo, "id" | "resumeId">;
export type Education = Omit<PrismaEducation, "id" | "resumeId">;
export type WorkExperience = Omit<PrismaWorkExperience, "id" | "resumeId">;
export type Project = Omit<PrismaProject, "id" | "resumeId">;
export type Skills = Omit<PrismaSkills, "id" | "resumeId">;
export type Achievement = Omit<PrismaAchievement, "id" | "resumeId">;

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
