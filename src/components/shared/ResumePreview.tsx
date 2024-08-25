import React from 'react'
import PersonalDetail from '../resume-preview/PersonalDetail'
import Summary from '../resume-preview/Summary'
import ProfessionalExp from '../resume-preview/ProfessionalExp'
import Educational from '../resume-preview/Educational'
import Skill from '../resume-preview/Skill'
import { useResumeContext } from '@/context/context'

const ResumePreview = () => {
  const {formPreview} = useResumeContext();
  console.log("Form Preview: ", formPreview)
  return (
    <div className='shadow-lg h-full p-14'>
      <PersonalDetail personalDetail={formPreview.personalDetail}/>
      <Summary summary={formPreview.summary}/>
      <ProfessionalExp experience={formPreview.experience}/>
      <Educational education={formPreview.education}/>
      <Skill skills={formPreview.skills}/>
    </div>
  )
}

export default ResumePreview