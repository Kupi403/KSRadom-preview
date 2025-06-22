'use client'
import Options from '../../UI/Buttons/Options/Options'
import styles from './CalendarHeader.module.scss'
import { CalendarHeaderProps } from '../types'
import { format, isAfter, isBefore } from 'date-fns'
import { pl } from 'date-fns/locale'
import Chevron from '../../UI/Buttons/Chevron/Chevron'
import { generateCalendarSelectBoundaries } from '../utils'
import { generateCalendarOptions, handleSetNextMonth, handleSetPrevMonth } from './utils'

const CalendarHeader = ({
	today,
	selectedYear,
	selectedMonth,
	setSelectedYear,
	setSelectedMonth,
	isLoading,
}: CalendarHeaderProps) => {
	const { dateMinBoundary, dateMaxBoundary } = generateCalendarSelectBoundaries(today)
	const selectedDate = new Date(selectedYear, selectedMonth)

	const dateOptions = generateCalendarOptions(dateMinBoundary, dateMaxBoundary)

	const title = format(selectedDate, 'LLLL yyyy', { locale: pl })

	return (
		<header className={styles.header}>
			<div className={`${styles.heading} ${isLoading ? styles.loading : ''}`}>
				<button
					disabled={isLoading || isBefore(new Date(selectedYear, selectedMonth - 1), dateMinBoundary)}
					onClick={() =>
						handleSetPrevMonth(selectedYear, selectedMonth, setSelectedYear, setSelectedMonth, dateMinBoundary)
					}>
					<Chevron orientation='left' />
				</button>
				<h2>{title}</h2>
				<button
					disabled={isLoading || isAfter(new Date(selectedYear, selectedMonth + 1), dateMaxBoundary)}
					onClick={() =>
						handleSetNextMonth(selectedYear, selectedMonth, setSelectedYear, setSelectedMonth, dateMaxBoundary)
					}>
					<Chevron orientation='right' />
				</button>
			</div>

			<div className={styles.options}>
				<Options
					loading={isLoading}
					options={dateOptions}
					title={'Data'}
					value={`${selectedYear}-${selectedMonth}`}
					setValue={value => {
						const [year, month] = value.split('-').map(Number)
						setSelectedYear(year)
						setSelectedMonth(month)
					}}
				/>
			</div>
		</header>
	)
}

export default CalendarHeader
