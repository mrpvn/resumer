"use client";

import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import usePremiumModal from "@/hooks/usePremiumModal";

export function SubscriptionPlanModal() {
  const { open, setOpen } = usePremiumModal();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Choose Your Plan
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Premium Plan */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-md">
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Premium</h3>
              <p className="text-muted-foreground">Perfect for professionals</p>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>AI tools</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Up to 3 resumes</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Customizable templates</span>
                </div>
              </div>

              <Button
                className="w-full bg-background hover:bg-background/90 text-primary"
                variant="outline"
                onClick={() => {
                  // Handle premium subscription
                  setOpen(false);
                }}
              >
                Get Premium
              </Button>
            </div>
          </div>

          {/* Premium Plus Plan */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-md">
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Premium Plus</h3>
              <p className="text-muted-foreground">
                For unlimited possibilities
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>AI tools</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Infinite resumes</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Design customizations</span>
                </div>
              </div>

              <Button
                className={cn("w-full text-primary-foreground", "bg-primary")}
                onClick={() => {
                  // Handle premium plus subscription
                  setOpen(false);
                }}
              >
                Get Premium Plus
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
