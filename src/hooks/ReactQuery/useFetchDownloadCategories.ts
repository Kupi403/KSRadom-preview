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
