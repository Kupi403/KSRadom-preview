'use client'
import '@/styles/globals.css'
import MainHeader from '@/components/Headers/MainHeader'
import styles from '../styles/layout.module.scss'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import Aside from '@/components/Aside/Aside'
import MainNews from '@/components/News/MainNews/MainNews'

export default function RootLayout() {
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
						<MainNews />
					</SectionContainer>

					<Aside />
				</main>
			</div>
		</>
	)
}
