import { FieldError } from 'react-hook-form'

import { Errors } from '@/app/(mentoring)/mentoring.view'

type ErrorMessageProps = {
	errors?: any
	fieldName: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors, fieldName }) => {
	if (!errors?.hasOwnProperty(fieldName)) return null

	const error = errors[fieldName] as FieldError
	const errorMessage = error.message ?? (errors[fieldName] as unknown as string)

	return (
		<div aria-live="polite" className="mt-2 text-sm text-rose-500 border border-rose-500 bg-rose-500/10 rounded-sm">
			<p className="flex items-center py-1 font-medium rounded-sm">{errorMessage}</p>
		</div>
	)
}
