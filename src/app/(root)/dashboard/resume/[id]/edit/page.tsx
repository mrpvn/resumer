"use client"

import FormSection from '@/components/resume-preview/FormSection'
import ResumePreview from '@/components/resume-preview/ResumePreview'
import React from 'react'

const EditResume = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
       <FormSection />
       <ResumePreview />
    </div>
  )
}

export default EditResume