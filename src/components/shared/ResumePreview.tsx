import React, { useEffect, useMemo } from 'react'
import PersonalDetail from '../resume-preview/PersonalDetail'
import Summary from '../resume-preview/Summary'
import ProfessionalExp from '../resume-preview/ProfessionalExp'
import Educational from '../resume-preview/Educational'
import Skill from '../resume-preview/Skill'
import { useResumeContext } from '@/context/context'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { GetSingleResume } from '@/services/api.svc'

const ResumePreview = () => {
  const {formPreview, setFormPreview} = useResumeContext();
  const params = useParams();
  const { id } = params;
  const {data: resume, isSuccess} = useQuery({
    queryKey: ["resume", id],
    queryFn: GetSingleResume,
    enabled: !!id
  })

  const resumeData = useMemo(() => {
    return {
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
    };
  }, [resume]);

  useEffect(() => {
    if(isSuccess) {
      setFormPreview(resumeData)
    }
  }, [isSuccess, resumeData, setFormPreview])

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