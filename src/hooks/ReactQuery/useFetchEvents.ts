'use client'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { CalendarEventData } from '@/components/Calendar/types'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setCalendarEvents } from '@/redux/slices/calendarSlice'
import fetchEvents from '@/lib/fetch/fetchEvents'

type FetchEventsParams = {
	type: 'all' | 'upcoming' | 'past'
	startDate?: string
	endDate?: string
	sort?: 'asc' | 'desc'
	limit?: number
}

export default function useFetchEvents(
	params: FetchEventsParams,
	initialData?: CalendarEventData[]
): UseQueryResult<CalendarEventData[]> {
	const { limit, type, sort, startDate, endDate } = params
	const dispatch = useDispatch()

	const query = useQuery<CalendarEventData[]>({
		queryKey: ['events', limit, type, sort, startDate, endDate],
		queryFn: () => fetchEvents({ limit, type, sort, startDate, endDate }),
		initialData,
		retry: 1,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		if (query.isSuccess && query.data) {
			dispatch(setCalendarEvents(query.data))
		}
	}, [query.data, query.isSuccess, dispatch])

	return query
}
