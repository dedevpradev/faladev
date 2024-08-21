import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { type FormState } from '@/services/user-actions'


type AlertBoxProps = FormState & React.HTMLAttributes<HTMLDivElement>

export const AlertBox: React.FC<AlertBoxProps> = ({ status, message, ...props }) => {
	if (!status) return null

	return (
		<Alert {...props} variant={`${status == 'error' ? 'destructive' : 'creation'}`}>
			<AlertTitle>{message?.title}</AlertTitle>
			<AlertDescription>{message?.description}</AlertDescription>
		</Alert>
	)
}
