import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-12 w-12 text-primary" />
        </div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Success!</h1>
        <p className="mb-8 text-muted-foreground">
          Your action was completed successfully.
        </p>
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/resumes">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
