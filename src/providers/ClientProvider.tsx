'use client'
import Navbar from '@/components/Navbar/Nav'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import NextTopLoader from 'nextjs-toploader'
import TanstackProvider from '@/providers/TanstackProvider'
import Footer from '@/components/Footer/Footer'
import { SnackbarProvider } from 'notistack'
export default function ClientProviders({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<SnackbarProvider maxSnack={1}>
				<NextTopLoader
					color='#c59b38'
					height={3}
					showSpinner={false}
				/>
				<Navbar />
				<TanstackProvider>{children}</TanstackProvider>
				<Footer />
			</SnackbarProvider>
		</Provider>
	)
}
