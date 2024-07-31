import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { type FormState } from '@/services/user-actions'

export const AlertBox: React.FC<FormState> = ({ status, message }) => {
	if (!status) return null

	return (
		<Alert variant={`${status == 'error' ? 'destructive' : 'creation'}`}>
			<AlertTitle>{message?.title}</AlertTitle>
			<AlertDescription>{message?.description}</AlertDescription>
		</Alert>
	)
}
