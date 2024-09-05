import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, RenderHookResult } from '@testing-library/react'

export const renderWithQueryClient = <T,>(hook: () => T) => {
	const queryClient = new QueryClient()
	return renderHook(() => hook(), {
		wrapper: ({ children }: { children: React.ReactNode }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		),
	})
}
