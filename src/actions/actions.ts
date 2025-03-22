"use server";

import prisma from "@/lib/prisma-client";
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
