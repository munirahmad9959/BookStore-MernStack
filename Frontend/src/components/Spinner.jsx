import React from 'react'

function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-600'></div>
    </div>
  )
}

export default Spinner
