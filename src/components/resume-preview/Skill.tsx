'use client'

import React from 'react'

const Skill: React.FC<SkillProps> = ({skills}) => {
  
  return (
    <div className='my-6'>
    <h2 className={`text-center font-bold text-sm mb-2`}>Skills</h2>
    <hr className={`border`} />
    <div className='grid grid-cols-2 gap-2 gap-x-10 my-4'>
      {skills?.map((skill) => {
      return (
          <div className='my-5 flex items-center justify-between' key={skill.id}>
            <h2 className={`font-bold text-sm`}>{skill.name}</h2>
            <div className='flex items-center justify-center gap-1'>
              <div className='h-3 bg-primary-foreground w-[120px] rounded-md'>
                  <div className={`h-3 bg-primary rounded-md`} style={{ width: `${skill.rating}%` }}>
                  </div>
              </div>
              <p className='text-xs'>{skill.rating}%</p>
            </div>
          </div>
        )
      })}
    </div>
  </div>
  )
}

export default Skill