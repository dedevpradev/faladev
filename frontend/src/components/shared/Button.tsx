import React from 'react'
import classNames from 'classnames'

interface ButtonProps {
    children: React.ReactNode
    disabled?: boolean
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'danger'
}

const Button: React.FC<ButtonProps> = ({
    children,
    disabled = false,
    onClick,
    type = 'button',
    variant = 'primary'
}) => {
    const baseStyles = 'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
    const variants = {
        primary: 'bg-blue-500 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
        danger: 'bg-red-500 hover:bg-red-700 text-white',
    }

    const buttonClasses = classNames(baseStyles, variants[variant], {
        'opacity-50 cursor-not-allowed': disabled,
    })

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
