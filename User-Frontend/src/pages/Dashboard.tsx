import React from 'react'
import Logout from '../component/Logout'

const Dashboard = () => {
  return (
    <div className='flex justify-between items-center px-6 py-6'>
      <h1 className='text-yellow-400 text-2xl'>Welcome to the Dashboard!</h1>
      <Logout/>
    </div>
  )
}

export default Dashboard
