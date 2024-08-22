"use client"

import { LoaderCircle, PlusSquare } from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

const AddResume = () => {
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    alert("Fix it soon")
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
                disabled={!resumeTitle || loading}
                onClick={() => handleSubmit()}
              >
                {loading ? (
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
