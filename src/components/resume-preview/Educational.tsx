import React from 'react'

const Educational: React.FC<AcademicsProps> = ({academics}) => {
  return (
    <div className='my-6'>
      <h2 className={`text-center font-bold text-sm mb-2`}>Education</h2>
      <hr className={`border`} />
      {academics?.map((education) => {
        return (
          <div className='my-5' key={education.id}>
            <h2 className={`font-bold text-sm`}>{education.universityName}</h2>
            <h2 className={`flex justify-between text-xs`}>
              {education.degree} in {education.major}
              <span>{education.startDate} - {education.endDate}</span>
            </h2>
            <p className='text-sm my-2'>{education.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Educational