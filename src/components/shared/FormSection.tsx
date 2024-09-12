import React, { useState } from 'react'
import PersonalDetailForm from '../resume-forms/PersonalDetailForm'
import SummaryForm from '../resume-forms/SummaryForm'
import ExperienceForm from '../resume-forms/ExperienceForm'
import EducationalForm from '../resume-forms/EducationalForm'
import SkillForm from '../resume-forms/SkillForm'
import { Button } from '../ui/button'
import { LayoutGrid } from 'lucide-react'
import { useResumeContext } from '@/context/context'

const FormSection = ({resume} : {resume: any}) => {
  const {activeFormIndex} = useResumeContext();

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" className="flex gap-2"><LayoutGrid/>Theme</Button>
      </div>
      {activeFormIndex === 1 && <PersonalDetailForm resume={resume}/>}
      {activeFormIndex === 2 && <SummaryForm resume={resume}/>}
      {activeFormIndex === 3 && <ExperienceForm resume={resume}/>}
      {activeFormIndex === 4 && <EducationalForm resume={resume}/>}
      {activeFormIndex === 5 && <SkillForm resume={resume}/>}
    </div>
  )
}

export default FormSection