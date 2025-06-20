// 'use client'

// import { useQuery, UseQueryResult } from '@tanstack/react-query'
// import { API_URL } from '@/constant/url'
// import { DownloadItem } from '@/types/downloadTypes'

// const fetchDownloadCategoryItems = async (): Promise<DownloadItem | null> => {
// 	try {
// 		const fetchURL = `${API_URL}/download-categories?populate[downloads][populate]=season&populate[downloads][populate]=file`

// 		const response = await fetch(fetchURL)

// 		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
// 		const data = await response.json()
// 		if (!data?.data) return null
// 		return data.data
// 	} catch (error) {
// 		throw new Error('Failed to fetch download data')
// 	}
// }

// const useFetchDownloadCategoryItems = (): UseQueryResult<DownloadItem[] | null> => {
// 	return useQuery({
// 		queryKey: ['download-items'],
// 		queryFn: fetchDownloadCategoryItems,
// 		staleTime: 1000 * 60 * 5,
// 		retry: 1,
// 		refetchOnWindowFocus: true,
// 		refetchOnReconnect: false,
// 	})
// }

// export default useFetchDownloadCategoryItems
'use client'

import { useQuery, UseQueryResult } from '@tanstack/react-query'

import fetchDownloadCategoryItems from '@/lib/fetch/fetchDownloadCategoryItems'
import { DownloadItem } from '@/components/SubpageManager/DownloadItems/types'

const useFetchDownloadCategoryItems = (): UseQueryResult<DownloadItem[]> => {
	return useQuery({
		queryKey: ['download-category-items'],
		queryFn: fetchDownloadCategoryItems,
		staleTime: 1000 * 60 * 5,
		retry: 1,
		refetchOnWindowFocus: true,
		refetchOnReconnect: false,
	})
}

export default useFetchDownloadCategoryItems
