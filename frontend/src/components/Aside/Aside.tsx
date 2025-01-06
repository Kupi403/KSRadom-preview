import React from 'react'
import SectionContainer from '../UI/SectionContainer'
import CalendarSection from '../Calendar/CalendarSection'
import UsefulLinks from '../UsefulLinks/UsefulLinks'
import styles from '@/styles/layout.module.scss'

const Aside = () => {
	
	return (
		<aside className={styles.aside}>
			<SectionContainer
				priority='aside'
				subpage
				isMainPage
				title='Kalendarz'>
				<CalendarSection />
			</SectionContainer>
			<SectionContainer
				priority='aside'
				subpage
				isMainPage
				title='Przydatne linki'>
				<UsefulLinks />
			</SectionContainer>
		</aside>
	)
}

export default Aside
