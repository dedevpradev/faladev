import { type Fields } from '@/services/user-actions'

type ErrorMessageProps = {
	errors?: Partial<Record<keyof Fields, string[]>> | null
	fieldName: keyof Fields
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors, fieldName }) => {
	if (!errors?.hasOwnProperty(fieldName)) return null

	return (
		<div aria-live="polite" className="mt-2 text-sm text-rose-500 border border-rose-500 bg-rose-500/10 rounded-sm">
			<p className="flex items-center py-1 font-medium rounded-sm">{errors[fieldName]}</p>
		</div>
	)
}
