"use client"

import FormSection from '@/components/shared/FormSection'
import ResumePreview from '@/components/shared/ResumePreview'
import React from 'react'
import { ResumeContextProvider } from '@/context/context'

const EditResume = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
      <ResumeContextProvider>
        <FormSection />
        <ResumePreview />
      </ResumeContextProvider>
    </div>
  )
}

export default EditResume