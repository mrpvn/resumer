"use client"

import { LoaderCircle, PlusSquare } from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateNewResume } from "@/services/api.svc";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const AddResume = () => {
  const [resumeTitle, setResumeTitle] = useState<string | null>("");
  const [uuid, setUuid] = useState<string | null>("");
  const {user} = useUser();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: CreateNewResume,
    onSuccess: () => {
      // Invalidate and refetch queries on success (optional)
      queryClient.invalidateQueries({queryKey: ['resumes']});
      toast({
        description: "Your resume has been created successfully!",
      })
      router.push(`/dashboard/resume/${uuid}/edit`);
    },
    onError: (error: any) => {
      console.error('Error creating resume:', error)
    }
  });
  
  const handleSubmit = () => {
    const uniqueId = uuidv4();
    setUuid(uniqueId);
    const newResumeData = {
      title: resumeTitle || "",
      resumeId: uniqueId,
      userName: user?.fullName || "",
      userEmail: user?.primaryEmailAddress?.emailAddress || ""
    }
    mutation.mutate(newResumeData);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center justify-center p-14 py-24 border-4 border-dashed bg-primary-foreground rounded-lg h-[280px] cursor-pointer mt-10 hover:scale-105 transition-all hover:shadow-md">
          <PlusSquare />
        </div>
      </DialogTrigger>
      <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new resume</DialogTitle>
            <DialogDescription>
              <span className="block my-3">
                Add a title for your new resume
              </span>
              <Input
                onChange={(e) => setResumeTitle(e.target.value)}
                placeholder="Ex.Full stack resume"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex gap-2 justify-end">
              <DialogClose asChild>
                <Button
                  onClick={() => {setResumeTitle("")}}
                  variant="ghost"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={!resumeTitle || mutation.isPending}
                onClick={() => handleSubmit()}
              >
                {mutation.isPending ? (
                  <LoaderCircle className="animate-spin mx-2" />
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

export default AddResume;
