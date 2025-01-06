'use client'
import { Rubik } from 'next/font/google'
import '@/styles/globals.css' // Globalne style aplikacji
import Navbar from '@/components/Navbar/Nav'
import MainHeader from '@/components/MainHeader/MainHeader'
import styles from '../styles/layout.module.scss'
import { usePathname } from 'next/navigation'
import SubPageHeader from '@/components/MainHeader/SubPageHeader'
import SectionContainer from '@/components/UI/SectionContainer'
import News from '@/components/News/News'
import CalendarCard from '@/components/Calendar/CalendarCard'
import CalendarSection from '@/components/Calendar/CalendarSection'
import NextNProgress from 'nextjs-progressbar'
import Aside from '@/components/Aside/Aside'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<MainHeader />

			<div className={styles.wrapper}>
				<main
					className={styles.main}
					style={{ zIndex: 0 }}>
					<SectionContainer
						isMainPage={true}
						title='Aktualności'
						priority='main'>
						<News />
					</SectionContainer>

					<Aside />

					{/* <aside className={styles.aside}>
						<SectionContainer
							isMainPage={true}
							title='Kalendarz'
							priority='aside'>
							<CalendarSection />
						</SectionContainer>
					</aside> */}
				</main>
			</div>
		</>
	)
}
