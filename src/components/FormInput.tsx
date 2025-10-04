import React from 'react'

type Props = {
  label: string
  id: string
  name?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput: React.FC<Props> = ({ label, id, type = 'text', placeholder, value, onChange, name }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-black mb-1">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  )
}

export default FormInput
