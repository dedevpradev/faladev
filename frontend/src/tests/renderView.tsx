// eslint-disable-next-line import/order
import { render } from '@testing-library/react'
import { ReactQueryProvider } from '@/Provider/ReactQueryProvider'

export const renderView = (Element: React.ReactElement) => {
	return render(<ReactQueryProvider>{Element}</ReactQueryProvider>)
}
