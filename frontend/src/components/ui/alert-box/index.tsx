import { RegistrationResult, Status } from '@/app/(mentoring)/mentoring.type'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type AlertBoxProps = RegistrationResult & React.HTMLAttributes<HTMLDivElement>

type AlertVariant = 'destructive' | 'creation'

const alertOptions: Record<Status, AlertVariant> = {
	error: 'destructive',
	success: 'creation',
} as const

const alertVariant = (status: Status): AlertVariant => {
	return alertOptions[status]
}

export const AlertBox: React.FC<AlertBoxProps> = ({ status, title, description, ...props }) => {
	return (
		<Alert {...props} variant={alertVariant(status)}>
			<AlertTitle data-testid="alert-title">{title}</AlertTitle>
			<AlertDescription data-testid="alert-description">{description}</AlertDescription>
		</Alert>
	)
}
