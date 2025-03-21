import React from 'react'

const FullImage = ({imageUrl, onClose}) => {
  return (
    <div className='w-[100%] h-[100vh] fixed left-0 z-10000 flex items-center justify-center top-0 bg-[rgba(0,0,0,0.6)]' onClick={onClose}>
      <img  className='w-[500px]' src={imageUrl} alt="" />
    </div>
  )
}

export default FullImage
