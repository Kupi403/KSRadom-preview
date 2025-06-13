'use client'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { API_URL } from '@/constant/url'
import { CalendarEventData, CalendarEventResponse } from '@/components/Calendar/types'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setCalendarEvents } from '@/redux/slices/calendarSlice'

type FetchEventsParams = {
	type: 'all' | 'upcoming' | 'past'
	startDate?: string
	endDate?: string
	sort?: 'asc' | 'desc'
	limit?: number
}
const fetchEvents = async ({
	limit,
	type,
	startDate,
	endDate,
	sort = 'asc',
}: FetchEventsParams): Promise<CalendarEventData[]> => {
	const today = new Date().toISOString()
	const limitQuery = limit ? `&pagination[limit]=${limit}` : ''
	const typeQuery = type === 'upcoming' ? `&filters[startDate][$gte]=${today}` : `&filters[startDate][$lte]=${today}`

	const dateRangeQuery =
		startDate && endDate ? `filters[startDate][$gte]=${startDate}&filters[startDate][$lte]=${endDate}` : ''

	const query = `/events?${dateRangeQuery}${
		type !== 'all' ? typeQuery : ''
	}&sort[0]=startDate:${sort}&populate[place][populate]=image${limitQuery}`

	const res = await fetch(`${API_URL}${query}`)

	if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
	const { data }: CalendarEventResponse = await res.json()
	return data
}

export default function useFetchEvents(params: FetchEventsParams): UseQueryResult<CalendarEventData[]> {
	const { limit, type, sort, startDate, endDate } = params
	const dispatch = useDispatch()

	const query = useQuery<CalendarEventData[]>({
		queryKey: ['events', limit, type, sort, startDate, endDate],
		queryFn: () => fetchEvents({ limit, type, sort, startDate, endDate }),
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
