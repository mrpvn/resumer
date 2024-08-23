import React from 'react'

const PersonalDetail: React.FC<PersonalDetailProps> = ({personalDetail}) => {
  return (
    <div>
      <h2 className={`font-bold text-center text-xl text-[${personalDetail?.themeColor}]`}>{personalDetail?.firstName} {personalDetail?.lastName}</h2>
      <h2 className={`text-center text-sm font-medium text-[${personalDetail?.themeColor}]`}>{personalDetail?.jobTitle}</h2>
      <h2 className={`text-center font-normal text-xs text-[${personalDetail?.themeColor}]`}>{personalDetail?.address}</h2>

      <div className='flex justify-between'>
          <h2 className={`font-normal text-xs text-[${personalDetail?.themeColor}]`}>{personalDetail?.phone}</h2>
          <h2 className={`font-normal text-xs text-[${personalDetail?.themeColor}]`}>{personalDetail?.email}</h2>
      </div>
      <hr className={`border my-2 border-[${personalDetail?.themeColor}]`} />
    </div>
  )
}

export default PersonalDetail