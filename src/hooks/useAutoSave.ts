"use client";

import { useEffect, useState, useCallback } from "react";
import useDebounce from "./useDebounce";
import { toast } from "sonner";
import { ResumeWithRelations } from "@/lib/types";
import { UpdateResume } from "@/actions/actions";

export default function useAutosave(resumeData: ResumeWithRelations) {
  const debouncedResumeData = useDebounce(resumeData, 2000);
  const [resumeId, setResumeId] = useState(resumeData.id);

  const [lastSaved, setLastSaved] = useState(structuredClone(resumeData));

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  const save = useCallback(async () => {
    try {
      if (!resumeId) return;
      setIsError(false);
      const newData = structuredClone(debouncedResumeData);

      const updatedResume = await toast.promise(
        UpdateResume(resumeId, newData),
        {
          loading: "Saving...",
          success: "Resume saved successfully!",
          error: "Failed to save resume",
        }
      );
      setResumeId((await updatedResume?.unwrap()).id);
      setLastSaved(newData);
    } catch (error) {
      setIsError(true);
      console.log(error);
      throw error;
    }
  }, [resumeId, debouncedResumeData]);

  useEffect(() => {
    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSaved);

    if (hasUnsavedChanges && debouncedResumeData && !isError) {
      save();
    }
  }, [debouncedResumeData, lastSaved, isError, resumeId, save]);
  return {
    hasUnsavedChanges: JSON.stringify(resumeData) !== JSON.stringify(lastSaved),
  };
}
