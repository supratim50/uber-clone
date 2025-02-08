import React from 'react'

const InputWithLabel = ({label, onChange, value, ...props}) => {
  return (
    <div className='mb-4'>
        <h3 className='text-md font-medium mb-2'>{label}</h3>
        <input 
            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-md placeholder:text-base'
            value={value}
            onChange={(e) => onChange(e.target.value)} 
            {...props}
        />
    </div>
  )
}

export default InputWithLabel