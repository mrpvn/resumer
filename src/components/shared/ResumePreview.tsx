import React, { useEffect } from 'react'
import PersonalDetail from '../resume-preview/PersonalDetail'
import Summary from '../resume-preview/Summary'
import ProfessionalExp from '../resume-preview/ProfessionalExp'
import Educational from '../resume-preview/Educational'
import Skill from '../resume-preview/Skill'
import { useResumeContext } from '@/context/context'

const ResumePreview = ({resume, isSuccess} : {resume: any, isSuccess: boolean}) => {
  const {formPreview, setFormPreview} = useResumeContext();

  useEffect(() => {
    if(isSuccess) {
      setFormPreview({
        personalDetail: {
          firstName: resume?.firstName,
          lastName: resume?.lastName,
          jobTitle: resume?.jobTitle,
          address: resume?.address,
          phone: resume?.phone,
          email: resume?.email,
        },
        summary: {
          summary: resume?.summary,
        },
        experience: resume?.experiences,
        academics: resume?.academics,
        skills: resume?.skills,
      })
    }
  }, [resume, isSuccess, setFormPreview])

  return (
    <div className='shadow-lg h-full p-14'>
      <PersonalDetail personalDetail={formPreview.personalDetail}/>
      <Summary summary={ formPreview.summary}/>
      <ProfessionalExp experience={ formPreview.experience}/>
      <Educational academics={ formPreview.academics}/>
      <Skill skills={ formPreview.skills}/>
    </div>
  )
}

export default ResumePreview