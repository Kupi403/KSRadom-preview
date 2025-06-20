'use client'

import { NewsFetchOptions } from '@/components/News/types'
import fetchNews from '@/lib/fetch/fetchNews'
import { useQuery } from '@tanstack/react-query'

export default function useFetchNews(params: NewsFetchOptions) {
	return useQuery({
		queryKey: ['all-news', params],
		queryFn: () => fetchNews(params),
	})
}
