import { CalendarEventData, CalendarEventResponse } from '@/components/Calendar/types'
import createFetchFunction from './createFetchFunction'

export type EventFetchOptions = {
	limit?: number
	type: 'all' | 'upcoming' | 'past'
	startDate?: string
	endDate?: string
	sort?: 'asc' | 'desc'
}

export const fetchEvents = async ({ limit, type, startDate, endDate, sort = 'asc' }: EventFetchOptions) => {
	const now = new Date().toISOString()
	const params = new URLSearchParams()

	params.append('sort[0]', `startDate:${sort}`)

	if (type === 'upcoming') {
		params.append('filters[startDate][$gte]', now)
	} else if (type === 'past') {
		params.append('filters[startDate][$lte]', now)
	}

	if (startDate) {
		params.append('filters[startDate][$gte]', startDate)
	}

	if (endDate) {
		params.append('filters[startDate][$lte]', endDate)
	}

	if (limit) {
		params.append('pagination[limit]', limit.toString())
	}

	params.append('populate[place][populate]', 'image')

	const query = `/events?${params.toString()}`

	return createFetchFunction<CalendarEventData[]>(query, (res: CalendarEventResponse) => res.data)
}

export default fetchEvents
