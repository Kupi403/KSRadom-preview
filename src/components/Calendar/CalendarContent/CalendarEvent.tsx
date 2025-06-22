import styles from './CalendarContent.module.scss'
import { FaRegClock } from 'react-icons/fa'
import { CalendarEventProps } from '../types'

const CalendarEvent = ({ onClick, name, startDate, endDate, isCurrentMonth }: CalendarEventProps) => {
	const startTime = new Date(startDate).toLocaleTimeString('pl', { hour: '2-digit', minute: '2-digit' })
	const endTime = endDate ? new Date(endDate).toLocaleTimeString('pl', { hour: '2-digit', minute: '2-digit' }) : null

	const isSameDay = endDate && new Date(startDate).toDateString() === new Date(endDate).toDateString()

	return (
		<div
			className={`${styles.event} ${!isCurrentMonth ? styles.inactive : ''}`}
			onClick={onClick}>
			<p className={styles.name}>{name}</p>
			<div className={styles.time}>
				<FaRegClock />
				<p>{endTime && isSameDay ? `${startTime} - ${endTime}` : startTime}</p>
			</div>
		</div>
	)
}

export default CalendarEvent
