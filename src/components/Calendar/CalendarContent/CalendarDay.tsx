'use client'
import styles from './CalendarContent.module.scss'
import { CalendarDayProps } from '../types'
import CalendarEvent from './CalendarEvent'
import { IoCloseOutline } from 'react-icons/io5'
import { useEffect, useRef, useState } from 'react'
import { openEventModal } from '@/redux/slices/eventModalSlice'
import { useDispatch } from 'react-redux'

const CalendarDay = ({ dayNumber, daySymbol, isCurrentMonth, isToday, events }: CalendarDayProps) => {
	const [visibleDropdown, setVisibleDropdown] = useState(false)
	const isWeekend = daySymbol === '1' || daySymbol === '7'
	const dropdownRef = useRef<HTMLDivElement | null>(null)

	const dayClass = isWeekend ? (daySymbol === '1' ? styles['left-side'] : styles['right-side']) : ''

	const handleClickOutside = (event: MouseEvent) => {
		if (!dropdownRef.current || !dropdownRef.current) return
		if (dropdownRef.current.contains(event.target as Node) || dropdownRef.current.contains(event.target as Node)) {
			return
		}
		setVisibleDropdown(false)
	}
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])
	const dispatch = useDispatch()
	return (
		<div className={styles.day}>
			<div className={`${styles.dayNumber} ${isCurrentMonth ? styles.active : ''}`}>
				{isToday && <span className={styles.dot}></span>}
				<span>{dayNumber}</span>
			</div>
			{events.length > 0 &&
				events.length <= 2 &&
				events.map(event => (
					<CalendarEvent
						key={event.id}
						startDate={event.startDate}
						endDate={event.endDate}
						name={event.name}
						isCurrentMonth={isCurrentMonth}
						onClick={() => dispatch(openEventModal(event))}
					/>
				))}
			{events.length > 2 && (
				<>
					{events.map(
						(event, idx) =>
							idx < 2 && (
								<CalendarEvent
									key={event.id}
									startDate={event.startDate}
									endDate={event.endDate}
									name={event.name}
									isCurrentMonth={isCurrentMonth}
									onClick={() => dispatch(openEventModal(event))}
								/>
							)
					)}
					<span
						className={`${styles.more} ${!isCurrentMonth ? styles.inactive : ''}`}
						onClick={() => setVisibleDropdown(true)}>
						+{events.length - 2}
					</span>
					{visibleDropdown && isCurrentMonth && (
						<div
							className={`${styles.dropdown} ${dayClass}`}
							ref={dropdownRef}>
							<button onClick={() => setVisibleDropdown(false)}>
								<IoCloseOutline size={30} />
							</button>
							{events.map(
								(event, idx) =>
									idx > 1 && (
										<CalendarEvent
											key={event.id}
											startDate={event.startDate}
											endDate={event.endDate}
											name={event.name}
											isCurrentMonth={isCurrentMonth}
											onClick={() => {
												setVisibleDropdown(false)
												dispatch(openEventModal(event))
											}}
										/>
									)
							)}
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default CalendarDay
