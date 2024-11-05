import React, { forwardRef } from 'react'

type TextInputProps = {
	label: string
} & React.ComponentProps<'input'>

// eslint-disable-next-line react/display-name
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ label, id, ...TextInputProps }, ref) => {
	return (
		<div className="mb-2">
			<label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor={id}>
				{label}
			</label>
			<input
				className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
				id={id}
				ref={ref}
				{...TextInputProps}
			/>
		</div>
	)
})
