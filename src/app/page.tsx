"use client";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { CheckIcon, ChevronRightIcon, FileTextIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-sm:px-5 sm:px-10 md:container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileTextIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Resumer</span>
          </div>
          {isSignedIn ? (
            <Button
              onClick={() => router.push("/resumes")}
              size="sm"
              className="bg-primary cursor-pointer hover:bg-primary/90"
            >
              Get Started
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push("/sign-in")}
                className="cursor-pointer"
                variant="ghost"
                size="sm"
              >
                Log in
              </Button>
              <Button
                onClick={() => router.push("/sign-up")}
                size="sm"
                className="bg-primary cursor-pointer hover:bg-primary/90"
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              <div className="flex flex-col gap-6">
                <Badge className="w-fit bg-muted text-primary dark:bg-muted dark:text-primary hover:bg-muted dark:hover:bg-muted">
                  Launch your career with confidence
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Create Professional Resumes in Minutes!
                </h1>
                <p className="text-xl text-muted-foreground">
                  Build, edit, and download job-winning resumes effortlessly
                  with Resumer.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={"/resumes"} prefetch={true}>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 cursor-pointer"
                    >
                      Get Started for Free
                    </Button>
                  </Link>
                  <Link href={"/templates"} prefetch={true}>
                    <Button size="lg" variant="outline">
                      See Templates{" "}
                      <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-lg overflow-hidden shadow-2xl border">
                  <Image
                    src="/resume.png"
                    width={800}
                    height={600}
                    alt="Resume editor interface"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
