import React from 'react'

const Summary: React.FC<SummaryProps> = ({summary}) => {
  return (
    <p className='text-sm'>
      {summary?.summary}
    </p>
  )
}

export default Summary