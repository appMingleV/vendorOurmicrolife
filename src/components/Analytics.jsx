import React from 'react'
import Sidebar from './Sidebar'


const Analytics = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex  w-full items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
          Under Development
        </h1>
        <p className="mt-4 text-gray-600 sm:text-lg">
          We're working hard to bring this page to life. Stay tuned!
        </p>
      </div>
    </div>
    </div>
  )
}

export default Analytics