'use client'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { API_URL } from '@/constant/url'
import { FileType } from '@/components/News/types'

export type NavType = {
	id: number
	name: string
	description: string | null
	documentId: string
	season: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	file: FileType
}

const fetchNavLinks = async (): Promise<NavType | null> => {
	try {
		let baseFetchURL = `${API_URL}/nav-items?populate[file]=true&populate[download_categories]=true&populate[season]=true`
		const fetchURL = baseFetchURL

		const response = await fetch(fetchURL)

		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
		const data = await response.json()
		if (!data?.data) return null
		return data.data
	} catch (error) {
		throw new Error('Failed to fetch download data')
	}
}

const useFetchNavLinks = (): UseQueryResult<NavType[] | null> => {
	return useQuery({
		queryKey: ['nav'],
		queryFn: fetchNavLinks,
		staleTime: 1000 * 60 * 5,
		retry: 1,
		refetchOnWindowFocus: true,
		refetchOnReconnect: false,
	})
}

export default useFetchNavLinks
