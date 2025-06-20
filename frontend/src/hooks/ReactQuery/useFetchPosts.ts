'use client'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchNews } from '@/lib/fetch/fetchNews'
import { NewsType } from '@/components/News/types'

export interface NewsFetchOptions {
	order?: 'asc' | 'desc'
	currentPage?: number
	postsPerPage?: number
	category?: string | null
	filterFuture?: boolean
}

export const useFetchMainPageNews = ({
	order = 'desc',
	currentPage = 1,
	postsPerPage = 5,
	category = null,
}: NewsFetchOptions): UseQueryResult<NewsType[]> => {
	return useQuery({
		queryKey: ['main-page-news', order, currentPage, postsPerPage, category],
		queryFn: () =>
			fetchNews({
				order,
				currentPage,
				postsPerPage,
				category: category ?? undefined,
			}),
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: true,
		retry: 1,
	})
}

export const useFetchAllNews = ({
	order = 'desc',
	currentPage = 1,
	postsPerPage = 9,
	category = null,
	filterFuture = false,
}: NewsFetchOptions): UseQueryResult<NewsType[]> => {
	return useQuery({
		queryKey: ['all-news', order, currentPage, postsPerPage, category, filterFuture],
		queryFn: () =>
			fetchNews({
				order,
				currentPage,
				postsPerPage,
				category: category ?? undefined,
				filterFuture,
			}),
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: true,
		refetchOnReconnect: false,
	})
}
