"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { templates } from "@/lib/templates";
import Link from "next/link";

export default function ResumeTemplateShowcase() {
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Resume Templates
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
          Professional, modern resume templates to help you stand out and land
          your dream job.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Link href={"/resumes"} prefetch={true}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 cursor-pointer text-primary-foreground px-4 py-3 text-base"
            >
              Create Your Resume Now
            </Button>
          </Link>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="h-full"
          >
            <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl p-0 gap-0 bg-card border-muted">
              <div className="relative aspect-3/4 overflow-hidden">
                <Image
                  src={template?.image || "/placeholder.svg"}
                  alt={template?.name}
                  fill={true}
                  className="object-cover transition-transform duration-500 ease-in-out"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{template?.name}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
