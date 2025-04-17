import React from 'react'

const NotFound = () => {
  return (
    <div className='flex' style={{ height: "100vh" }}>
        <div className='flex flex-col justify-center items-center w-full gap-[10px]'>
            <img src="/404.jpg" alt="404 Not Found" className='w-[900px] h-[400px]' />
            <h1 className='text-4xl font-bold text-gray-800 uppercase mt-10'>Page Not Found</h1>
            <p className='text-lg text-gray-600 uppercase'>Sorry, the page you are looking for does not exist.</p>
        </div>
    </div>
  )
}

export default NotFound
