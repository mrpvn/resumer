"use client";

import ResumePreview from "@/app/(main)/editor/[resumeId]/resume-preview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResumeWithRelations } from "@/lib/types";
import { formatDate } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Loader, MoreVertical, Pencil, Printer, Trash } from "lucide-react";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DeleteResume } from "@/actions/actions";
import { useReactToPrint } from "react-to-print";

export default function ResumeCard({
  resume,
}: {
  resume: ResumeWithRelations;
}) {
  const wasUpdated = resume.updatedAt !== resume.createdAt;
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrint = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });
  return (
    <Card className="group relative border gap-3 rounded-lg border-transparent hover:border-border transition-colors bg-secondary">
      <CardHeader>
        <CardTitle className="text-center sm:text-xs md:text-sm">
          {resume?.title}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground line-clamp-2 overflow-hidden whitespace-nowrap">
          {wasUpdated ? "Updated" : "Created"} on{" "}
          {resume.updatedAt
            ? formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")
            : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/editor/${resume.id}`} prefetch={true}>
          <ResumePreview
            className="shadow-sm group-hover:shadow-lg overflow-hidden"
            contentRef={contentRef}
            resumeData={resume}
          />
        </Link>
      </CardContent>
      <MenuButton resumeId={resume.id} reactToPrint={reactToPrint} />
    </Card>
  );
}

function MenuButton({
  resumeId,
  reactToPrint,
}: {
  resumeId: string | undefined;
  reactToPrint: () => void;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0.5 top-0.5 lg:opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center gap-2"
          >
            <Trash className="size-4" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Pencil className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={reactToPrint}
          >
            <Printer className="size-4" />
            Print
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        resumeId={resumeId}
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
      />
    </>
  );
}

function DeleteDialog({
  resumeId,
  showDeleteDialog,
  setShowDeleteDialog,
}: {
  resumeId: string | undefined;
  showDeleteDialog: boolean;
  setShowDeleteDialog: (show: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { mutate: deleteResume, isPending } = useMutation({
    mutationFn: DeleteResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      setShowDeleteDialog(false);
      toast.success("Resume Deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete resume");
    },
  });
  return (
    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete resume</DialogTitle>
          <DialogDescription>
            <span className="block my-3">
              Are you sure you want to delete this resume?
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button
                variant="ghost"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              className="cursor-pointer w-16"
              variant="destructive"
              onClick={() => {
                if (resumeId) {
                  deleteResume(resumeId);
                }
              }}
            >
              {isPending ? (
                <Loader className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
