'use client'
import { Rubik } from 'next/font/google'
import Navbar from '@/components/Navbar/Nav'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import NextTopLoader from 'nextjs-toploader'
import TanstackProvider from '@/components/providers/QueryProvider/tanstack-provider'
import Footer from '@/components/Footer/Footer'
import { SnackbarProvider } from 'notistack'

const rubik = Rubik({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	display: 'swap',
})
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pl'>
			<head>
				<title>Komisja Sędziowska Radom | Strona główna</title>
				<meta
					name='description'
					content='Opis strony głównej aplikacji Next.js'
				/>
			</head>
			<Provider store={store}>
				<body className={rubik.className}>
					<SnackbarProvider maxSnack={1}>
						<NextTopLoader
							color='#c59b38;'
							height={3}
							showSpinner={false}
						/>
						<Navbar />
						<TanstackProvider>{children}</TanstackProvider>
						<Footer />
					</SnackbarProvider>
				</body>
			</Provider>
		</html>
	)
}
