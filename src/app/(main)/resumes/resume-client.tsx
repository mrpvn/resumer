"use client";

import { useQuery } from "@tanstack/react-query";
import { GetAllResumes } from "@/actions/actions";
import { Resume } from "@prisma/client";
import ResumeCard from "@/components/resume-card";

const ResumesClient = ({ initialResumes }: { initialResumes: Resume[] }) => {
  // Use react-query for caching and refetching
  const {
    data: resumes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["resumes"],
    queryFn: GetAllResumes,
    initialData: initialResumes,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading resumes...</p>;
  if (error) return <p>Error loading resumes.</p>;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </div>
  );
};

export default ResumesClient;
