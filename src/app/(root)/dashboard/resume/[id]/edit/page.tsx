"use client"

import FormSection from '@/components/shared/FormSection'
import ResumePreview from '@/components/shared/ResumePreview'
import React from 'react'
import { ResumeContextProvider } from '@/context/context'
import { useQuery } from '@tanstack/react-query'
import { GetSingleResume } from '@/services/api.svc'
import { useParams } from 'next/navigation'

const EditResume = () => {
  const params = useParams();
  const { id } = params;

  const {data: resume, isSuccess} = useQuery({
    queryKey: ["resume", id],
    queryFn: ({queryKey}) => {
      const [, id] = queryKey
      return GetSingleResume(id as string)
    },
    enabled: !!id
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
      <ResumeContextProvider>
        <FormSection resume={resume} />
        <ResumePreview isSuccess={isSuccess} resume={resume} />
      </ResumeContextProvider>
    </div>
  )
}

export default EditResume