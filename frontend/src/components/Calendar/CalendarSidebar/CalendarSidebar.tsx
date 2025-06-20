'use client'

import React, { useEffect } from 'react'
import CalendarCard from '../CalendarCard/CalendarCard'
import styles from './CalendarSidebar.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import LoadingCalendarCard from '../CalendarCard/LoadingCalendarCard'
import generateComponents from '@/lib/helpers/generateComponents'
import DataState from '@/components/UI/States/DataState'
import Button from '@/components/UI/Buttons/Options/Button/Button'
import { openEventModal } from '@/redux/slices/eventModalSlice'
import { EventTimeType } from '../types'
import {
	isPastOrCurrentMonth,
	isPastMonth,
	getEventTimeType,
	filterPastEvents,
	filterUpcomingEvents,
	filterEventsByMonth,
	getEventStateFlags,
} from './utils'

const CalendarSidebar = ({ currentMonth, isLoading }: { currentMonth: Date; isLoading: boolean }) => {
	const dispatch = useDispatch()

	const [eventTime, setEventTime] = React.useState<EventTimeType>(getEventTimeType(currentMonth))

	useEffect(() => {
		setEventTime(getEventTimeType(currentMonth))
	}, [currentMonth])

	const allEvents = useSelector((state: RootState) => state.calendar.events)
	const calendarEvents = filterEventsByMonth(allEvents, currentMonth)
	const pastEvents = filterPastEvents(calendarEvents)
	const upcomingEvents = filterUpcomingEvents(calendarEvents)

	const { shouldShowUpcoming, shouldShowPast, noUpcoming, noPast } = getEventStateFlags(
		eventTime,
		isLoading,
		upcomingEvents.length,
		pastEvents.length
	)
	return (
		<div className={styles.sidebar}>
			<h3>Wydarzenia w tym miesiącu</h3>
			{isLoading && (
				<div className={styles.events}>{generateComponents(LoadingCalendarCard, 3, { layout: 'mobile' })}</div>
			)}

			<div className={styles.buttons}>
				<Button
					value={EventTimeType.Upcoming}
					title={`${EventTimeType.Upcoming} ${upcomingEvents.length > 0 ? `(${upcomingEvents.length})` : ''}`}
					isActive={eventTime === EventTimeType.Upcoming}
					setActiveEvents={setEventTime}
					loading={isLoading}
					isShown={!isPastMonth(currentMonth)}
				/>
				<Button
					value={EventTimeType.Past}
					title={`${EventTimeType.Past} ${pastEvents.length > 0 ? `(${pastEvents.length})` : ''}`}
					isActive={eventTime === EventTimeType.Past}
					setActiveEvents={setEventTime}
					loading={isLoading}
					isShown={isPastOrCurrentMonth(currentMonth) && pastEvents.length !== 0}
				/>
			</div>

			{shouldShowUpcoming && (
				<div className={styles.events}>
					{upcomingEvents.map(event => (
						<div
							className={styles.event}
							key={event.id}>
							<CalendarCard
								place={event.place}
								startDate={new Date(event.startDate)}
								endDate={event.endDate !== null ? new Date(event.endDate) : null}
								description={event.name}
								layout='mobile'
								onClick={() => dispatch(openEventModal(event))}
							/>
						</div>
					))}
				</div>
			)}

			{shouldShowPast && (
				<div className={styles.events}>
					{pastEvents.map(event => (
						<div
							className={`${styles.event} ${styles.past}`}
							key={event.id}>
							<CalendarCard
								place={event.place}
								startDate={new Date(event.startDate)}
								endDate={event.endDate !== null ? new Date(event.endDate) : null}
								description={event.name}
								layout='mobile'
								onClick={() => dispatch(openEventModal(event))}
							/>
						</div>
					))}
				</div>
			)}

			{(noUpcoming || noPast) && <DataState message='Brak wydarzeń' />}
		</div>
	)
}

export default CalendarSidebar
