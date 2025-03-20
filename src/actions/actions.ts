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
