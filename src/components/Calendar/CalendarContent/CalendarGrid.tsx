import CalendarDay from './CalendarDay'
import styles from './CalendarContent.module.scss'
import { CalendarGridProps } from '../types'
import { format, eachDayOfInterval, startOfWeek, addDays } from 'date-fns'
import { pl } from 'date-fns/locale'
import { capitalize, generateCalendarDays } from '../utils'

const CalendarGrid = ({ currentMonth, events, isLoading }: CalendarGridProps) => {
	const start = startOfWeek(currentMonth, { locale: pl, weekStartsOn: 1 })
	const weekDays = eachDayOfInterval({
		start,
		end: addDays(start, 6),
	})
	const fullDayNames = weekDays.map(day => capitalize(format(day, 'EEEE', { locale: pl })))

	const shortDayNames = weekDays.map(day => capitalize(format(day, 'EEE', { locale: pl })))

	const calendarDays = generateCalendarDays(currentMonth, events)

	return (
		<div className={styles.grid}>
			<div className={styles['day-names']}>
				{weekDays.map((day, index) => (
					<div
						key={day.toISOString()}
						className={styles.dayName}>
						<span className={styles.short}>{shortDayNames[index]}</span>
						<span className={styles.full}>{fullDayNames[index]}</span>
					</div>
				))}
			</div>

			<div className={`${styles['calendar-days']} ${isLoading ? styles.loading : ''}`}>
				{calendarDays.map(day => {
					const daySymbol = format(day.date, 'e', { locale: pl })
					return (
						<CalendarDay
							key={day.date.toISOString()}
							dayNumber={day.dayNumber}
							daySymbol={daySymbol}
							isCurrentMonth={day.isCurrentMonth}
							isToday={day.isToday}
							events={isLoading ? [] : day.events}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default CalendarGrid
