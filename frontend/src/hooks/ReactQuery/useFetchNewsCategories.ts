// 'use client'
// import { useQuery, UseQueryResult } from '@tanstack/react-query'
// import { API_URL } from '@/constant/url'
// import { CategoriesResponseType, CategoriesType } from '@/components/News/types'

// const fetchNewsCategories = async (): Promise<CategoriesResponseType | null> => {
// 	try {
// 		const fetchURL = `${API_URL}/categories`

// 		const response = await fetch(fetchURL)

// 		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

// 		const data = await response.json()

// 		if (!data?.data) return null

// 		return data.data
// 	} catch (error) {
// 		throw new Error('Failed to fetch download data')
// 	}
// }

// const useFetchNewsCategories = (): UseQueryResult<CategoriesType[] | null> => {
// 	return useQuery({
// 		queryKey: ['news-categories'],
// 		queryFn: fetchNewsCategories,
// 		staleTime: 1000 * 60 * 5,
// 		retry: 1,
// 		refetchOnReconnect: false,
// 	})
// }

// export default useFetchNewsCategories
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
