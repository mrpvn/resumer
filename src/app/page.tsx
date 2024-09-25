"use client"

import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { FileText, Zap, CheckCircle} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { LuGithub } from "react-icons/lu";
import { BsTwitterX } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter();
  const {user} = useUser();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <Image src="/logo.svg" width={50} height={50} alt="Logo" />
          <span className="ml-2 text-4xl font-bold text-primary">Resumer</span>
        </a>
 
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create Your Perfect Resume with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Resumer uses advanced AI to help you craft a professional, tailored resume in minutes. Stand out from the crowd and land your dream job.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={() => router.push('/dashboard')} className="bg-primary hover:bg-primary/90">Get Started</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <FileText className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">AI-Powered Content</h3>
                <p className="text-gray-500 dark:text-gray-400">Our AI generates tailored content based on your experience and the job you&#39;re applying for.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Instant Generation</h3>
                <p className="text-gray-500 dark:text-gray-400">Create a professional resume in minutes, not hours. Save time and reduce stress.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">ATS-Friendly</h3>
                <p className="text-gray-500 dark:text-gray-400">Our resumes are optimized to pass Applicant Tracking Systems, increasing your chances of landing an interview.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="text-xl font-bold mb-2">Input Your Information</h3>
                <p className="text-gray-500 dark:text-gray-400">Enter your work experience, skills, and education into our user-friendly interface.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="text-xl font-bold mb-2">AI Generation</h3>
                <p className="text-gray-500 dark:text-gray-400">Our AI analyzes your input and creates a tailored, professional resume.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="text-xl font-bold mb-2">Download and Apply</h3>
                <p className="text-gray-500 dark:text-gray-400">Review, edit if needed, and download your polished resume. You&#39;re ready to apply!</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Create Your Perfect Resume?</h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground md:text-xl">
                  Join thousands of job seekers who have successfully landed their dream jobs with Resumer.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex justify-center space-x-2">
                  <Button onClick={() => router.push('/dashboard')} className="bg-white text-primary hover:bg-gray-100" type="button">
                    Get Started
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Resumer. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="https://github.com/mrpvn">
            <LuGithub size={20} />
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="https://x.com/mrpvnx">
            <BsTwitterX size={20} />
          </Link>
        </nav>
      </footer>
    </div>
  )
}