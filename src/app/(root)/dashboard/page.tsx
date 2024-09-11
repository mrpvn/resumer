"use client"

import React from 'react'
import AddResume from '@/components/shared/AddResume';
import { GetResumeList } from '@/services/api.svc';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Eye, FileDown, Pencil, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


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

const handleDeleteResume = (resumeId: string) => {
  
}

  return (
    <div>
      <div className="py-5 px-10 md:py-10 md:px-20 lg:py-16 lg:px-32">
        <h2 className="font-bold text-3xl">My resume</h2>
        <p className="my-4 text-lg">Create your resume to get your dream job.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
          <AddResume/>
          {
            resumes?.map((resume: any) => {
              return(
                <div key={resume.resumeId} className="flex group relative items-center justify-center p-14 py-24 bg-primary-foreground rounded-lg h-[280px] cursor-pointer mt-10 hover:scale-105 transition-all hover:shadow-md">
                  <p className='text-center text-xl font-semibold'>
                    {resume.title}
                  </p>
                  <div className='hidden group-hover:block absolute bottom-3 w-full animate-out'>
                    <div className='flex justify-around px-2'>
                      <div title='view' className='p-3 bg-secondary rounded-md hover:bg-primary'>
                        <Eye size={20}/>
                      </div>
                      <div onClick={() => handleEditResume(resume.resumeId)} title='edit' className='p-3 bg-secondary rounded-md hover:bg-primary'>
                        <Pencil size={20} />
                      </div>
                      <div title='download' className='p-3 bg-secondary rounded-md hover:bg-primary'>
                        <FileDown size={20} />
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <div title='delete' className='p-3 bg-secondary rounded-md hover:bg-red-500'>
                            <Trash2 size={20}/>
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your resume
                              and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteResume(resume.resumeId)} className='bg-red-500 hover:bg-red-500/70 text-white'>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
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