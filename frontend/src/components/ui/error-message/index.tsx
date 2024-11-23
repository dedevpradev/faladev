

export const ErrorMessage = ({ errors, name }: { errors: Record<string, { message: string }>, name: string }) => {
	const existError = errors && Object.keys(errors).includes(name)

	return (
		<>
			{existError && (
				<div
					aria-live="polite"
					className="mt-2 text-sm text-rose-500 border border-rose-500 bg-rose-500/10 rounded-sm"
				>
					<p className="flex items-center p-1 font-medium rounded-sm" data-testid="error-message">
						{errors[name].message}
					</p>
				</div>
			)}
		</>
	)
}
