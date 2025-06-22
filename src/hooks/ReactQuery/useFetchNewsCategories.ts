'use client'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { CategoriesType } from '@/components/News/types'
import fetchNewsCategories from '@/lib/fetch/fetchNewsCategories'

const useFetchNewsCategories = (): UseQueryResult<CategoriesType[]> => {
	return useQuery({
		queryKey: ['news-categories'],
		queryFn: fetchNewsCategories,
		staleTime: 1000 * 60 * 5,
		retry: 1,
		refetchOnReconnect: false,
	})
}

export default useFetchNewsCategories
