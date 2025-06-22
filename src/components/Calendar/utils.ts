import {
	format,
	getDay,
	isToday,
	isSameDay,
	isBefore,
	addDays,
	addYears,
	subDays,
	subYears,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
	startOfYear,
	eachDayOfInterval,
	isThisMonth,
	isSameMonth,
} from 'date-fns'
import { pl } from 'date-fns/locale'
import { CalendarEventData } from './types'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'
import { EventTimeType } from './types'

export enum DateFormat {
	HOUR_MINUTE = 'HH:mm',
	DAY_DIGIT = 'dd',
	FULL_WEEKDAY = 'EEEE',
	FULL_MONTH = 'LLLL',
	MONTH_DIGIT = 'MM',
	MONTH_AND_YEAR = 'LLLL yyyy',
	FULL_DATE = 'dd LLLL yyyy',
}

export const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

export const getLocaleDate = (date: Date, formatType: DateFormat): string => format(date, formatType, { locale: pl })

export const getFormattedEventDate = (date: Date) => {
	return {
		dayDigit: getLocaleDate(date, DateFormat.DAY_DIGIT),
		dayName: capitalize(getLocaleDate(date, DateFormat.FULL_WEEKDAY)),
		monthName: getLocaleDate(date, DateFormat.FULL_MONTH),
		monthDigit: getLocaleDate(date, DateFormat.MONTH_DIGIT),
		year: date.getFullYear(),
		time: getLocaleDate(date, DateFormat.HOUR_MINUTE),
		fullDate: getLocaleDate(date, DateFormat.FULL_DATE),
	}
}

export const generateCalendarDays = (date: Date = new Date(), events: CalendarEventData[]) => {
	const monthStart = startOfMonth(date)
	const monthEnd = endOfMonth(date)

	const startDayIndex = getDay(monthStart) === 0 ? 6 : getDay(monthStart) - 1
	const prevMonthDays =
		startDayIndex > 0
			? eachDayOfInterval({
					start: subDays(monthStart, startDayIndex),
					end: subDays(monthStart, 1),
			  })
			: []

	const endDayIndex = getDay(monthEnd) === 0 ? 0 : 7 - getDay(monthEnd)
	const nextMonthDays =
		endDayIndex > 0
			? eachDayOfInterval({
					start: addDays(monthEnd, 1),
					end: addDays(monthEnd, endDayIndex),
			  })
			: []

	const mapDay = (day: Date, isCurrentMonth: boolean) => {
		const dayEvents = events.filter(event => isSameDay(new Date(event.startDate), day))

		return {
			date: day,
			isCurrentMonth,
			isToday: isToday(day),
			dayNumber: format(day, 'd'),
			events: dayEvents,
		}
	}

	return [
		...prevMonthDays.map(day => mapDay(day, false)),
		...eachDayOfInterval({ start: monthStart, end: monthEnd }).map(day => mapDay(day, true)),
		...nextMonthDays.map(day => mapDay(day, false)),
	]
}

export const generateCalendarRange = (date: Date = new Date()) => {
	const calendarStartDate = startOfWeek(startOfMonth(date), { weekStartsOn: 1 }).toISOString()
	const calendarEndDate = endOfWeek(endOfMonth(date), { weekStartsOn: 1 }).toISOString()

	return { calendarStartDate, calendarEndDate }
}

export const generateCalendarSelectBoundaries = (today: Date) => {
	const oneYearBack = subYears(today, 1)
	const earliestAllowed = startOfYear(new Date(2025, 0, 1))

	const dateMinBoundary = isBefore(oneYearBack, earliestAllowed) ? earliestAllowed : oneYearBack

	const dateMaxBoundary = addYears(today, 1)

	return { dateMinBoundary, dateMaxBoundary }
}

export const useMonthComparison = () => {
	const isPastOrCurrentMonth = (date: Date): boolean => {
		const currentMonthStart = startOfMonth(new Date())
		const inputMonthStart = startOfMonth(date)
		return isBefore(inputMonthStart, currentMonthStart) || isThisMonth(date)
	}

	const isPastMonth = (date: Date): boolean => {
		const currentMonthStart = startOfMonth(new Date())
		const inputMonthStart = startOfMonth(date)
		return isBefore(inputMonthStart, currentMonthStart) && !isThisMonth(date)
	}

	return { isPastOrCurrentMonth, isPastMonth }
}

export const useEventFiltering = (currentMonth: Date) => {
	const calendarEvents = useSelector((state: RootState) =>
		state.calendar.events.filter(event => isSameMonth(new Date(event.startDate), currentMonth))
	)

	const now = Date.now()
	const pastEvents = calendarEvents.filter(event => new Date(event.startDate).getTime() < now)

	const upcomingEvents = calendarEvents.filter(event => new Date(event.startDate).getTime() >= now)

	return { pastEvents, upcomingEvents }
}

export const useEventTimeState = (currentMonth: Date) => {
	const { isPastMonth } = useMonthComparison()
	const [eventTime, setEventTime] = useState<EventTimeType>(() =>
		isPastMonth(currentMonth) ? EventTimeType.Past : EventTimeType.Upcoming
	)
	useEffect(() => {
		setEventTime(isPastMonth(currentMonth) ? EventTimeType.Past : EventTimeType.Upcoming)
	}, [currentMonth, isPastMonth])

	return { eventTime }
}
