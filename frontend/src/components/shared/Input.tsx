import React from "react"

interface InputProps {
    error?: string
    label: string
    name: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    required?: boolean
    type: string
    value: string
}

const Input: React.FC<InputProps> = ({
    error,
    label,
    name,
    onChange,
    placeholder = '',
    required = false,
    type,
    value
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
            />
            {error && <p id={`${name}-error`} className="text-red-500 text-xs italic">{error}</p>}
        </div>
    )
}

export default Input