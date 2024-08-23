import React from 'react'
import PersonalDetail from '../resume-preview/PersonalDetail'
import Summary from '../resume-preview/Summary'
import ProfessionalExp from '../resume-preview/ProfessionalExp'
import Educational from '../resume-preview/Educational'
import Skill from '../resume-preview/Skill'
import dummyData from '@/data/dummyData'

const ResumePreview = () => {
  return (
    <div>
      <PersonalDetail personalDetail={dummyData.personalDetail}/>
      <Summary summary={dummyData.summary}/>
      <ProfessionalExp experience={dummyData.experience}/>
      <Educational education={dummyData.education}/>
      <Skill skills={dummyData.skills}/>
    </div>
  )
}

export default ResumePreview