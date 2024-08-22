import { RegistrationResult, Status } from '@/app/(mentoring)/mentoring.type'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type AlertBoxProps = RegistrationResult & React.HTMLAttributes<HTMLDivElement>

const alertOptions: Record<Status, string> = {
	error: 'destructive',
	success: 'creation',
}

const alertVariant = (status: Status) => {
	return alertOptions[status] ?? alertOptions.success
}

export const AlertBox: React.FC<AlertBoxProps> = ({ status, title, description, ...props }) => {
	return (
		<Alert {...props} variant={alertVariant(status)}>
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription>{description}</AlertDescription>
		</Alert>
	)
}
