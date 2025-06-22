'use client'

import { useQuery, UseQueryResult } from '@tanstack/react-query'

import fetchDownloadItems from '@/lib/fetch/fetchDownloadItems'
import { DownloadItem } from '@/components/SubpageManager/DownloadItems/types'

const useFetchDownloadItems = (subpage?: string, season?: string): UseQueryResult<DownloadItem[]> => {
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
