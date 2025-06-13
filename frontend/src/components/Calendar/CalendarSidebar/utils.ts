import { isBefore, isThisMonth, startOfMonth, isSameMonth } from 'date-fns'
import { EventTimeType } from '@/components/Calendar/types'
import { CalendarEventData } from '../types'

export const isPastOrCurrentMonth = (date: Date): boolean => {
	const currentMonthStart = startOfMonth(new Date())
	const inputMonthStart = startOfMonth(date)
	return isBefore(inputMonthStart, currentMonthStart) || isThisMonth(date)
}

export const isPastMonth = (date: Date): boolean => {
	const currentMonthStart = startOfMonth(new Date())
	const inputMonthStart = startOfMonth(date)
	return isBefore(inputMonthStart, currentMonthStart) && !isThisMonth(date)
}

export const getEventTimeType = (date: Date): EventTimeType =>
	isPastMonth(date) ? EventTimeType.Past : EventTimeType.Upcoming

export const filterPastEvents = (events: CalendarEventData[]) =>
	events.filter(event => new Date(event.startDate).getTime() < Date.now())

export const filterUpcomingEvents = (events: CalendarEventData[]) =>
	events.filter(event => new Date(event.startDate).getTime() >= Date.now())

export const filterEventsByMonth = (events: CalendarEventData[], month: Date) =>
	events.filter(event => isSameMonth(new Date(event.startDate), month))

export const getEventStateFlags = (
	eventTime: EventTimeType,
	isLoading: boolean,
	upcomingCount: number,
	pastCount: number
) => ({
	isUpcoming: eventTime === EventTimeType.Upcoming,
	isPast: eventTime === EventTimeType.Past,
	shouldShowUpcoming: !isLoading && eventTime === EventTimeType.Upcoming && upcomingCount > 0,
	shouldShowPast: !isLoading && eventTime === EventTimeType.Past && pastCount > 0,
	noUpcoming: !isLoading && eventTime === EventTimeType.Upcoming && upcomingCount === 0,
	noPast: !isLoading && eventTime === EventTimeType.Past && pastCount === 0,
})
