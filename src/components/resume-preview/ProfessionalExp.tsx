import React from 'react'

const ProfessionalExp: React.FC<ExperienceProps> = ({experience}) => {
  return (
    <div className='my-6'>
    <h2 className={`text-center font-bold text-sm mb-2`}>Professional Experience</h2>
    <hr className={`border`} />
    {experience?.map((exp) => {
      return (
        <div className='my-5' key={exp.id}>
          <h2 className={`font-bold text-sm`}>{exp.title}</h2>
          <h2 className={`flex justify-between text-xs`}>
            {exp.companyName}, {exp.city}, {exp.state}
            <span>{exp.startDate} - {exp.currentlyWorking?"Present" : exp.endDate}</span>
          </h2>
          <div className='text-sm my-2' dangerouslySetInnerHTML={{__html: exp?.workSummary}}/>
        </div>
      )
    })}
  </div>
  )
}

export default ProfessionalExp