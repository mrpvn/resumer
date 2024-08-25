import { z } from "zod"

export const PersonalDetailFormSchema = z.object({
  firstName: z.string().min(2, {message: 'First name must be at least 2 characters long'}).max(50, {message: 'First name must be at most 50 characters long'}),
  lastName: z.string().max(50, {message: 'Last name must be at most 50 characters long',}).optional(),
  jobTitle: z.string().max(50, {message: 'Job title must be at most 50 characters long'}),
  address: z.string(),
  phone: z.string().regex(/^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/, {message: 'Invalid phone number format'}),
  email: z.string().email({message: 'Invalid email address'}),
})

export const SummaryFormSchema = z.object({
  summary: z.string().min(10, {message: 'Summary must be at least 10 characters long'})
})

export const ExperienceFormSchema = z.object({
  title: z.string(),
  companyName: z.string().max(50, {message: 'Company name must be at most 50 characters long'}),
  city: z.string(),
  state: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  workSummary: z.string().min(10, {message: 'Summary must be at least 10 characters long'})
})

export const EducationFormSchema = z.object({
  universityName: z.string().max(50, {message: 'University name must be at most 50 characters long'}),
  degree: z.string(),
  major: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string().min(10, {message: 'Description must be at least 10 characters long'}),
})

export const SkillsFormSchema = z.object({
  name: z.string().min(1, {message: "Please add your skill"}),
  rating: z.string().min(1, {message: "Please give rating to your skill"})
})




