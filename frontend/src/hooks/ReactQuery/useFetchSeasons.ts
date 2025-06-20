'use client'

import fetchSeasons from '@/lib/fetch/fetchSeasons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export type SeasonsType = {
	name: string
	startDate: Date
	endDate: Date
}

const useFetchSeasons = (): UseQueryResult<SeasonsType[]> => {
	return useQuery({
		queryKey: ['seasons'],
		queryFn: fetchSeasons,
		staleTime: 1000 * 60 * 5,
		retry: 1,
		refetchOnReconnect: false,
	})
}

export default useFetchSeasons
