"use client"

import ResumePreview from '@/components/shared/ResumePreview'
import { Button } from '@/components/ui/button'
import { GetSingleResume } from '@/services/api.svc';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ResumeContextProvider } from '@/context/context';
import html2pdf from "html2pdf.js"
import React from 'react'
import { ArrowDownToLine } from 'lucide-react';

const ViewResume = () => {

  const params = useParams();
  const { id } = params;

  const {data: resume, isSuccess} = useQuery({
    queryKey: ["resume", id],
    queryFn: ({queryKey}) => {
      const [, id] = queryKey
      return GetSingleResume(id as string);
    },
    enabled: !!id
  })

  function handleDownload(){
    const element = document.querySelector('#print-area') as HTMLElement | null;
    if (element) {
      html2pdf(element, {
          filename: 'resume.pdf'
      });
    } else {
        console.error('Element not found');
    }
  }

  return (
    <ResumeContextProvider>
      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <h2 className='text-center text-3xl font-medium'>Your resume is ready to<Button onClick={handleDownload} className='text-3xl' variant="link">Download</Button>🎉</h2>
        <div id='print-area' className='mx-auto my-4'>
          <ResumePreview resume={resume} isSuccess={isSuccess}/>
        </div>
      </div>
    </ResumeContextProvider>
  )
}

export default ViewResume