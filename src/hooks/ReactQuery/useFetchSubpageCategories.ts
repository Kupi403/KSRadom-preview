'use client'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { API_URL, URL } from '@/constant/url'
import { CategoriesType } from '@/components/News/types'

export type SubpageCategoriesType = {
	title: string
	categories: CategoriesType[]
	image: string
}

const fetchSubpageCategories = async (documentId: string | null | undefined): Promise<SubpageCategoriesType | null> => {
	if (!documentId) return null
	try {
		const response = await fetch(`${API_URL}/posts/${documentId}?populate=categories&populate=thumbnail`)

		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
		const data = await response.json()
		if (!data?.data) return null

		return {
			title: data.data.title,
			categories: data.data.categories || [],
			image: `${URL}${data.data.thumbnail.url}`,
		}
	} catch (error) {
		console.error('Error fetching post data:', error)
		return null
	}
}

const useFetchSubpageCategories = (documentId: string | null): UseQueryResult<SubpageCategoriesType, Error> => {
	return useQuery({
		queryKey: ['category', documentId],
		queryFn: () => fetchSubpageCategories(documentId!),
		staleTime: 1000 * 60 * 5,
		retry: 1,
		enabled: !!documentId,
		refetchOnWindowFocus: true,
		refetchOnReconnect: false,
	})
}

export default useFetchSubpageCategories
