import React from 'react'
import styles from '@/styles/layout.module.scss'
import CalendarCard from './CalendarCard'
const CalendarSection = () => {
	return (
		<div className='section-content other__calendar'>
			<p className={styles.sectionTitle}>Najbliższe wydarzenia</p>
			<CalendarCard
				description=''
				place='MZPN Delegatura Radom, ul. Chrobrego 52'
			/>
			<CalendarCard
				description='Szkolenie dla wszystkich sędziów'
				place='AHNS, ul. Traugutta 61A'
			/>
			<CalendarCard
				description='II Memoriał Prezesów KS Radom'
				place='Radom, ul. Ofiar Firleja 18'
			/>
		</div>
	)
}

export default CalendarSection
