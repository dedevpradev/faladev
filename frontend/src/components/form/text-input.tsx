import React from 'react'

interface TextInputProps {
  label: string
  id: string
  type: string
  placeholder: string
  register: any 
}

export const TextInput: React.FC<TextInputProps> = ({ label, id, type, placeholder, register }) => {
  return (
    <div className="mb-2">
      <label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
      />
    </div>
  )
}

 