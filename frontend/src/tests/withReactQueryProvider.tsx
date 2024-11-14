import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export function withReactQueryProvider<T extends object>(Component: React.ComponentType<T>) {
	return function WrapperComponent(props: T) {
		const queryClient = new QueryClient()
		return (
			<QueryClientProvider client={queryClient}>
				<Component {...props} />
			</QueryClientProvider>
		)
	}
}
