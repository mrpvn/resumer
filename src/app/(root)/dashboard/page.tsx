"use client"

import React from 'react'
import AddResume from '@/components/shared/AddResume';
import { GetResumeList } from '@/services/api.svc';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';


const Dashboard = () => {
const router = useRouter();
const {user} = useUser();
const {data: resumes} = useQuery({
  queryKey: ["resumes", user?.primaryEmailAddress?.emailAddress],
  queryFn: GetResumeList,
  enabled: !!user?.primaryEmailAddress?.emailAddress,
})

const handleEditResume = (resumeId: string) => {
  router.push(`/dashboard/resume/${resumeId}/edit`);
}

console.log("Resumes: ", resumes)
  return (
    <div>
      <div className="py-5 px-10 md:py-10 md:px-20 lg:py-16 lg:px-32">
        <h2 className="font-bold text-3xl">My resume</h2>
        <p className="my-4 text-lg">Create your resume to get your dream job.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
          <AddResume/>
          {
            resumes?.map((resume) => {
              return(
                <div onClick={() => handleEditResume(resume.resumeId)} key={resume.resumeId} className="flex items-center justify-center p-14 py-24 bg-primary-foreground rounded-lg h-[280px] cursor-pointer mt-10 hover:scale-105 transition-all hover:shadow-md">
                  <p className='text-center text-xl font-semibold'>
                    {resume.title}
                  </p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard;