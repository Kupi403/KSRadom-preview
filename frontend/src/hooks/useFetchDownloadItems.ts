'use client'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { API_URL } from '@/constant/url'
import { DownloadItem } from '@/types/downloadTypes'

const fetchDownloadItems = async (subpage: string | undefined, season?: string): Promise<DownloadItem | null> => {
	try {
		let baseFetchURL = `${API_URL}/downloads?populate[file]=true&populate[download_categories]=true&populate[season]=true${
			season
				? `&filters[$or][0][season][$null]=true&filters[$or][1][season][name][$eq]=${encodeURIComponent(season)}`
				: ''
		}`

		const fetchURL = subpage
			? `${baseFetchURL}&filters[download_categories][name][$eq]=${encodeURIComponent(subpage)}`
			: baseFetchURL

		console.log(fetchURL)

		const response = await fetch(fetchURL)

		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
		const data = await response.json()
		if (!data?.data) return null
		return data.data
	} catch (error) {
		throw new Error('Failed to fetch download data')
	}
}

const useFetchDownloadItems = (subpage: string | undefined, season?: string): UseQueryResult<DownloadItem[] | null> => {
	return useQuery({
		queryKey: ['download-items', subpage, season],
		queryFn: () => fetchDownloadItems(subpage, season),
		staleTime: 1000 * 60 * 5,
		retry: 1,
		refetchOnWindowFocus: true,
		refetchOnReconnect: false,
	})
}

export default useFetchDownloadItems
