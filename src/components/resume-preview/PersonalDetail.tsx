import React from 'react'

const PersonalDetail: React.FC<PersonalDetailProps> = ({personalDetail}) => {
  return (
    <div>
      <h2 className={`font-bold text-center text-xl`}>{personalDetail?.firstName} {personalDetail?.lastName}</h2>
      <h2 className={`text-center text-sm font-medium`}>{personalDetail?.jobTitle}</h2>
      <h2 className={`text-center font-normal text-xs`}>{personalDetail?.address}</h2>

      <div className='flex justify-between'>
          <h2 className={`font-normal text-xs`}>{personalDetail?.phone}</h2>
          <h2 className={`font-normal text-xs`}>{personalDetail?.email}</h2>
      </div>
      <hr className={`border my-2`} />
    </div>
  )
}

export default PersonalDetail