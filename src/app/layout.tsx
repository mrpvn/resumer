import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider";
import TanstackProvider from "@/providers/tanstack-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Resumer",
    absolute: "Resumer",
  },
  description: "Create and manage your resumes with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="beforeInteractive"
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TanstackProvider>{children}</TanstackProvider>
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
