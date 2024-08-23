import React from 'react'

const Skill: React.FC<SkillProps> = ({skills}) => {
  return (
    <div className='my-6'>
    <h2 className={`text-center font-bold text-sm mb-2`}>Skills</h2>
    <hr className={`border`} />
    <div className='grid grid-cols-2 gap-3 my-4'>
      {skills?.map((skill) => {
      return (
          <div className='my-5 flex items-center justify-between' key={skill.id}>
          <h2 className={`font-bold text-sm`}>{skill.name}</h2>
          <div className='h-2 bg-gray-200 w-[120px]'>
              <div className={`h-2 w-[${skill.rating}%]`}>
              </div>
          </div>
          </div>
      )
      })}
    </div>
  </div>
  )
}

export default Skill