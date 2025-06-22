import '@/styles/globals.css'
import { Rubik } from 'next/font/google'
import ClientProviders from '@/providers/ClientProvider'

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
			<body className={rubik.className}>
				<ClientProviders>{children}</ClientProviders>
			</body>
		</html>
	)
}
