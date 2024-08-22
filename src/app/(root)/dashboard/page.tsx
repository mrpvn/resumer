import AddResume from '@/components/shared/AddResume';
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <div className="py-5 px-10 md:py-10 md:px-20 lg:py-16 lg:px-32">
        <h2 className="font-bold text-3xl">My resume</h2>
        <p className="my-4 text-lg">Create your resume to get your dream job.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
          <AddResume/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;