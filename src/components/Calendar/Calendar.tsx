'use client'
import { useState } from 'react'
import styles from './Calendar.module.scss'
import CalendarHeader from './CalendarHeader/CalendarHeader'
import CalendarGrid from './CalendarContent/CalendarGrid'
import useFetchEvents from '@/hooks/ReactQuery/useFetchEvents'
import { generateCalendarRange } from './utils'
import EventModal from './CalendarModal/EventModal'
import CalendarSidebar from './CalendarSidebar/CalendarSidebar'
import ErrorComponent from '../UI/States/Error'
import LoadingSubpage from '../UI/Loading/LoadingSubpage'

const Calendar = () => {
	const today = new Date()
	const [selectedYear, setSelectedYear] = useState(today.getFullYear())
	const [selectedMonth, setSelectedMonth] = useState(today.getMonth())
	const currentMonth = new Date(selectedYear, selectedMonth)

	const { calendarStartDate, calendarEndDate } = generateCalendarRange(currentMonth)

	const {
		data: events = [],
		isLoading,
		isError,
		refetch,
		error,
	} = useFetchEvents({ type: 'all', startDate: calendarStartDate, endDate: calendarEndDate })

	if (isError)
		return (
			<ErrorComponent
				description='Błąd pobierania danych.'
				error={error}
				refetchFn={refetch}
			/>
		)

	if (isLoading) return <LoadingSubpage />

	return (
		<div className={styles.calendar}>
			<CalendarHeader
				today={today}
				selectedYear={selectedYear}
				selectedMonth={selectedMonth}
				setSelectedYear={setSelectedYear}
				setSelectedMonth={setSelectedMonth}
				isLoading={isLoading}
			/>
			<div className={styles.content}>
				<CalendarGrid
					currentMonth={currentMonth}
					events={events}
					isLoading={isLoading}
				/>

				<CalendarSidebar
					isLoading={isLoading}
					currentMonth={currentMonth}
				/>
			</div>
			<EventModal />
		</div>
	)
}

export default Calendar
