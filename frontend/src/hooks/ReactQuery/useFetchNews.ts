'use client'

import { NewsFetchOptions, NewsResponse, NewsType } from '@/components/News/types'
import fetchNews from '@/lib/fetch/fetchNews'
import { useQuery } from '@tanstack/react-query'

export default function useFetchNews(params: NewsFetchOptions, initialData?: NewsResponse) {
	return useQuery<NewsResponse>({
		queryKey: ['all-news', params],
		queryFn: () => fetchNews(params),
		initialData,
	})
}
