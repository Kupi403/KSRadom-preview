'use client'

import React from 'react'
import styles from './AsideCalendar.module.scss'
import CalendarCard from '@/components/Calendar/CalendarCard/CalendarCard'
import CTAButton from '@/components/UI/Buttons/CTA/CTAButton'
import useFetchEvents from '@/hooks/ReactQuery/useFetchEvents'
import LoadingCalendarCard from '@/components/Calendar/CalendarCard/LoadingCalendarCard'
import generateComponents from '@/lib/helpers/generateComponents'
import NoData from '@/components/UI/States/DataState'

const AsideCalendar = () => {
	const { data: events, isLoading, error, status } = useFetchEvents({ limit: 3, type: 'upcoming', sort: 'asc' })

	return (
		<div className={styles['aside-calendar']}>
			{isLoading && generateComponents(LoadingCalendarCard, 3)}

			{!isLoading && status == 'success' && events?.length === 0 && <NoData message='Brak najbliższych wydarzeń' />}

			{!isLoading && status == 'success' && events?.length > 0 && (
				<>
					<p className={styles.title}>Najbliższe wydarzenia:</p>
					{events.map(event => (
						<CalendarCard
							key={event.id}
							place={event.place}
							startDate={new Date(event.startDate)}
							endDate={event.endDate !== null ? new Date(event.endDate) : null}
							description={event.name}
						/>
					))}
				</>
			)}

			{!isLoading && status == 'error' && <p>Wystąpił błąd: {error.message}</p>}
			{!isLoading && (
				<CTAButton
					priority='tertiary'
					href='/kalendarz'
					style={{ alignSelf: 'center' }}>
					Zobacz kalendarz
				</CTAButton>
			)}
		</div>
	)
}

export default AsideCalendar
