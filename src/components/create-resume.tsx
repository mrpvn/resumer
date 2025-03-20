"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader, PlusCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateResume } from "@/actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateResumeButton = () => {
  const [resumeTitle, setResumeTitle] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createResume, isPending } = useMutation({
    mutationFn: CreateResume,
    onSuccess: (newResume) => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      setResumeTitle("");
      toast.success("Resume created successfully");
      router.push(`/editor/${newResume.id}`);
    },
    onError: () => {
      toast.error("Failed to create resume");
    },
  });
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex items-center gap-2 cursor-pointer">
          <PlusCircle className="h-4 w-4" />
          Create New Resume
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new resume</DialogTitle>
          <DialogDescription>
            <span className="block my-3">Add a title for your new resume</span>
            <Input
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              placeholder="Ex.Full stack resume"
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setResumeTitle("");
                }}
                variant="ghost"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="cursor-pointer"
              onClick={() => {
                if (resumeTitle === "") {
                  toast.error("Please enter a title");
                  return;
                }
                createResume(resumeTitle);
              }}
            >
              {isPending ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateResumeButton;
