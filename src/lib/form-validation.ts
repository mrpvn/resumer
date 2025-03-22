import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const PersonalInfoSchema = z.object({
  firstName: optionalString,
  lastName: optionalString,
  email: optionalString,
  phone: optionalString,
  linkedin: optionalString,
  github: optionalString,
  website: optionalString,
  address: optionalString,
  summary: optionalString,
});

export type PersonalInfoSchemaType = z.infer<typeof PersonalInfoSchema>;

export const WorkExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        company: optionalString,
        position: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        location: optionalString,
        workSummary: optionalString,
      })
    )
    .optional(),
});

export type WorkExperienceSchemaType = z.infer<typeof WorkExperienceSchema>;

export const EducationSchema = z.object({
  educations: z
    .array(
      z.object({
        institution: optionalString,
        location: optionalString,
        degree: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        cgpa: optionalString,
        subjects: optionalString,
      })
    )
    .optional(),
});

export type EducationSchemaType = z.infer<typeof EducationSchema>;

export const SkillsSchema = z.object({
  technicalSkills: z.array(z.string().trim()).optional(),
  functionalSkills: z.array(z.string().trim()).optional(),
});

export type SkillsSchemaType = z.infer<typeof SkillsSchema>;

export const ProjectSchema = z.object({
  projects: z
    .array(
      z.object({
        title: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        link: optionalString,
        workSummary: optionalString,
      })
    )
    .optional(),
});

export type ProjectSchemaType = z.infer<typeof ProjectSchema>;

export const AchievementSchema = z.object({
  achievements: optionalString,
});

export type AchievementSchemaType = z.infer<typeof AchievementSchema>;

export const ResumeDataSchema = z.object({
  ...PersonalInfoSchema.shape,
  ...WorkExperienceSchema.shape,
  ...EducationSchema.shape,
  ...SkillsSchema.shape,
  ...ProjectSchema.shape,
  ...AchievementSchema.shape,
});

export type ResumeDataSchemaType = z.infer<typeof ResumeDataSchema> & {
  id?: string;
  title?: string;
  updatedAt?: Date;
  createdAt?: Date;
};
