"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckIcon,
  ChevronRightIcon,
  Edit3Icon,
  FileTextIcon,
  StarIcon,
  ZapIcon,
  LayoutTemplateIcon,
} from "lucide-react";
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
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileTextIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Resumer</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </Link>
          </nav>
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
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Started for Free
                  </Button>
                  <Button size="lg" variant="outline">
                    See Templates <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
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
                <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                  <div className="text-sm font-medium">Trusted by</div>
                  <div className="text-2xl font-bold">10,000+</div>
                  <div className="text-sm">job seekers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create a standout resume that gets you
                noticed by employers.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-muted dark:bg-muted flex items-center justify-center mb-4">
                    <Edit3Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Easy to Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Intuitive resume editor with live preview. No design skills
                    required.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-muted dark:bg-muted flex items-center justify-center mb-4">
                    <LayoutTemplateIcon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Custom Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Choose from multiple professionally designed templates for
                    any industry.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-muted dark:bg-muted flex items-center justify-center mb-4">
                    <ZapIcon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>AI-Powered Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Generate resume content with AI assistance to highlight your
                    skills effectively.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-20 bg-muted/50 dark:bg-background"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Create your perfect resume in just three simple steps
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-violet-200 dark:bg-muted -translate-y-1/2 z-0"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Enter Your Details</h3>
                <p className="text-muted-foreground">
                  Fill out your personal information, work experience,
                  education, and skills.
                </p>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Choose a Template</h3>
                <p className="text-muted-foreground">
                  Select a resume template that fits your style and the job
                  you&#39;re applying for.
                </p>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Download or Share</h3>
                <p className="text-muted-foreground">
                  Export your resume in PDF format or share it online with
                  potential employers.
                </p>
              </div>
            </div>
            <div className="mt-16 text-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Try It Now <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-20 bg-white dark:bg-background"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of job seekers who have found success with
                Resumer
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        width={100}
                        height={100}
                        alt="Sarah Johnson"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-center italic mb-4">
                    &#34;Resumer helped me land my dream job in just a few
                    clicks! The templates are professional and the AI
                    suggestions made my resume stand out.&#34;
                  </blockquote>
                  <div className="text-center">
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">
                      Marketing Manager
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        width={100}
                        height={100}
                        alt="David Chen"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-center italic mb-4">
                    &#34;After struggling with my resume for weeks, I found
                    Resumer and created a professional CV in under an hour. I
                    received interview calls within days!&#34;
                  </blockquote>
                  <div className="text-center">
                    <div className="font-semibold">David Chen</div>
                    <div className="text-sm text-muted-foreground">
                      Software Engineer
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        width={100}
                        height={100}
                        alt="Emily Rodriguez"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-center italic mb-4">
                    &#34;The templates are beautiful and the interface is so
                    intuitive. Resumer made updating my resume a breeze instead
                    of a chore. Highly recommend!&#34;
                  </blockquote>
                  <div className="text-center">
                    <div className="font-semibold">Emily Rodriguez</div>
                    <div className="text-sm text-muted-foreground">
                      UX Designer
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background text-primary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Land Your Dream Job?
                </h2>
                <p className="text-xl opacity-90 mb-8">
                  Join thousands of job seekers who have boosted their careers
                  with Resumer.
                </p>
                <Button size="lg" variant="secondary">
                  Get Started for Free
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary text-primary-foreground backdrop-blur-sm p-4 rounded-lg">
                    <div className="text-4xl font-bold mb-2">10k+</div>
                    <div className="text-sm opacity-90">Active Users</div>
                  </div>
                  <div className="bg-primary text-primary-foreground backdrop-blur-sm p-4 rounded-lg">
                    <div className="text-4xl font-bold mb-2">50+</div>
                    <div className="text-sm opacity-90">Templates</div>
                  </div>
                  <div className="bg-primary text-primary-foreground backdrop-blur-sm p-4 rounded-lg">
                    <div className="text-4xl font-bold mb-2">85%</div>
                    <div className="text-sm opacity-90">Interview Rate</div>
                  </div>
                  <div className="bg-primary text-primary-foreground backdrop-blur-sm p-4 rounded-lg">
                    <div className="text-4xl font-bold mb-2">24/7</div>
                    <div className="text-sm opacity-90">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <FileTextIcon className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Resumer</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Create professional resumes in minutes with our easy-to-use
                builder.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    AI Tools
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Career Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Resume Examples
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Resumer. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <Button variant="ghost" size="sm">
                Privacy Policy
              </Button>
              <Button variant="ghost" size="sm">
                Terms of Service
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
