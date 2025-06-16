'use client'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { API_URL } from '@/constant/url'

export type SeasonsType = {
	name: string
	startDate: Date
	endDate: Date
}

export type SeasonsResponseType = {
	data: SeasonsType[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

const fetchSeasons = async (): Promise<SeasonsType | null> => {
	try {
		const fetchURL = `${API_URL}/seasons?sort=startDate:desc`

		const response = await fetch(fetchURL)

		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

		const data = await response.json()

		if (!data?.data) return null

		const seasons = data.data.map((data: SeasonsType) => ({
			name: data.name,
			startDate: new Date(data.startDate),
			endDate: new Date(data.endDate),
		}))

		return seasons
	} catch (error) {
		throw new Error('Failed to fetch download data')
	}
}

const useFetchSeasons = (): UseQueryResult<SeasonsType[] | null> => {
	return useQuery({
		queryKey: ['seasons'],
		queryFn: fetchSeasons,
		staleTime: 1000 * 60 * 5,
		retry: 1,
		refetchOnReconnect: false,
	})
}

export default useFetchSeasons
