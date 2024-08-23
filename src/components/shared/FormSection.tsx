import React from 'react'
import PersonalDetailForm from '../resume-forms/PersonalDetailForm'
import SummaryForm from '../resume-forms/SummaryForm'
import ExperienceForm from '../resume-forms/ExperienceForm'
import EducationalForm from '../resume-forms/EducationalForm'
import SkillForm from '../resume-forms/SkillForm'

const FormSection = () => {
  return (
    <div>
      <PersonalDetailForm/>
      <SummaryForm/>
      <ExperienceForm/>
      <EducationalForm/>
      <SkillForm/>
    </div>
  )
}

export default FormSection