"use server";

import prisma from "@/lib/prisma-client";
import { ResumeWithRelations } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

export async function CreateUser(
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  imageUrl: string
) {
  try {
    const user = await prisma.user.create({
      data: {
        userId: id,
        email: email,
        firstName: firstName,
        lastName: lastName,
        imageUrl: imageUrl,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create resume");
  }
}

export async function CreateResume(resumeTitle: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  try {
    const resume = await prisma.resume.create({
      data: {
        title: resumeTitle,
        user: {
          connect: {
            userId: userId,
          },
        },
      },
    });
    return resume;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create resume");
  }
}

export async function UpdateResume(
  resumeId: string,
  resumeData: ResumeWithRelations
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const resume = await prisma.resume.update({
      where: { id: resumeId, userId },
      data: {
        title: resumeData.title,
        template: resumeData.template,
        updatedAt: new Date(),

        // ✅ Update Personal Info
        personalInfo: {
          upsert: {
            create: {
              firstName: resumeData.personalInfo?.firstName,
              lastName: resumeData.personalInfo?.lastName,
              email: resumeData.personalInfo?.email,
              phone: resumeData.personalInfo?.phone,
              linkedin: resumeData.personalInfo?.linkedin,
              github: resumeData.personalInfo?.github,
              website: resumeData.personalInfo?.website,
              address: resumeData.personalInfo?.address,
              summary: resumeData.personalInfo?.summary,
            },
            update: {
              firstName: resumeData.personalInfo?.firstName,
              lastName: resumeData.personalInfo?.lastName,
              email: resumeData.personalInfo?.email,
              phone: resumeData.personalInfo?.phone,
              linkedin: resumeData.personalInfo?.linkedin,
              github: resumeData.personalInfo?.github,
              website: resumeData.personalInfo?.website,
              address: resumeData.personalInfo?.address,
              summary: resumeData.personalInfo?.summary,
            },
          },
        },

        // ✅ Update Work Experiences (Delete & Recreate)
        workExperiences: {
          deleteMany: {}, // Clear old experiences
          create: resumeData.workExperiences.map((exp) => ({
            companyName: exp.companyName,
            position: exp.position,
            startDate: exp.startDate ? new Date(exp.startDate) : null,
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            location: exp.location,
            workSummary: exp.workSummary,
          })),
        },

        // ✅ Update Educations (Delete & Recreate)
        educations: {
          deleteMany: {},
          create: resumeData.educations.map((edu) => ({
            institutionName: edu.institutionName,
            location: edu.location,
            degree: edu.degree,
            startDate: edu.startDate ? new Date(edu.startDate) : null,
            endDate: edu.endDate ? new Date(edu.endDate) : null,
            cgpa: edu.cgpa,
            subjects: edu.subjects,
          })),
        },

        // ✅ Update Skills
        skills: {
          upsert: {
            create: {
              technicalSkills: resumeData.skills?.technicalSkills || [],
              functionalSkills: resumeData.skills?.functionalSkills || [],
            },
            update: {
              technicalSkills: resumeData.skills?.technicalSkills || [],
              functionalSkills: resumeData.skills?.functionalSkills || [],
            },
          },
        },

        // ✅ Update Projects
        projects: {
          deleteMany: {},
          create: resumeData.projects.map((project) => ({
            projectTitle: project.projectTitle,
            startDate: project.startDate ? new Date(project.startDate) : null,
            endDate: project.endDate ? new Date(project.endDate) : null,
            link: project.link,
            projectSummary: project.projectSummary,
          })),
        },

        // ✅ Update Achievements
        achievements: {
          upsert: {
            create: {
              achievements: resumeData.achievements?.achievements || null,
            },
            update: {
              achievements: resumeData.achievements?.achievements || null,
            },
          },
        },
      },
      include: {
        personalInfo: true,
        workExperiences: true,
        educations: true,
        skills: true,
        projects: true,
        achievements: true,
      },
    });
    return resume;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update resume");
  }
}

export async function DeleteResume(resumeId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.resume.delete({
      where: { id: resumeId, userId },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete resume");
  }
}

export async function GetAllResumes() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const resumes = await prisma.resume.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        personalInfo: true,
        workExperiences: true,
        educations: true,
        skills: true,
        projects: true,
        achievements: true,
      },
    });
    return resumes;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get resumes");
  }
}

export async function GetResumeCount() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const resumeCount = await prisma.resume.count({ where: { userId } });
  return resumeCount;
}

export async function GetResume(resumeId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const resume = await prisma.resume.findUnique({
    where: { id: resumeId, userId },
    include: {
      personalInfo: true,
      workExperiences: true,
      educations: true,
      projects: true,
      skills: true,
      achievements: true,
    },
  });

  if (!resume) return null;
  return resume;
}
