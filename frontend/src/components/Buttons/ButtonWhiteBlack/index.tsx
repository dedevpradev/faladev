import { ReactNode } from 'react'

interface ButtonWhiteBlackProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	classList?: string
}

export const ButtonWhiteBlack = ({ children, classList, ...rest }: ButtonWhiteBlackProps) => {
	return (
		<button
			className={`text-2xl text-center z-20   flex flex-col justify-center items-center border border-black p-4 w-3 h-3 rounded-full bg-white hover:bg-gray-950 hover:text-white transition duration-300 ease-in-out ${classList}`}
			{...rest}
		>
			{children}
		</button>
	)
}
