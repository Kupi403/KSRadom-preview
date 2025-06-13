'use client'
import { useQuery } from '@tanstack/react-query'
import { AdjacentPostTypeResponse, NewsResponse, NewsType } from '@/types/PostType'
import { AdjacentPostType } from '@/components/News/NewsDetails/AdjacentPosts/AdjacentPosts'
import { API_URL } from '@/constant/url'

// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:1337/api'

// const URL = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:1337'
// 	const API_URL = `${URL}/api`

const fetchAdjacentPosts = async (
	documentId: string
): Promise<AdjacentPostType[]> => {
	const res = await fetch(`${API_URL}/posts/adjacent/${documentId}`)

	if (!res.ok) {
		throw new Error('Failed to fetch adjacent posts')
	}

	const data: StrapiResponse = await res.json()

	return data.adjacentPosts
}

export default function useFetchAdjacentPosts(documentId: string) {
	return useQuery({
		queryKey: ['adjacentPosts', documentId],
		queryFn: () => fetchAdjacentPosts(documentId),
		enabled: !!documentId,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	})
}

// const fetchAdjacentPosts = async (
// 	publishedAt: string
// ): Promise<{ prevPost: AdjacentPostType | null; nextPost: AdjacentPostType | null }> => {
// 	const prevQuery = `/posts?filters[publishedAt][$lt]=${publishedAt}&sort=publishedAt:asc&fields=title,slug,description,publishedAt&populate[thumbnail][fields]=formats&pagination[limit]=1`
// 	const nextQuery = `/posts?filters[publishedAt][$gt]=${publishedAt}&sort=publishedAt:asc&fields=title,slug,description,publishedAt&populate[thumbnail][fields]=formats&pagination[limit]=1`

// 	const [prevRes, nextRes] = await Promise.all([fetch(`${API_URL}${prevQuery}`), fetch(`${API_URL}${nextQuery}`)])

// 	if (!prevRes.ok || !nextRes.ok) throw new Error('Failed to fetch adjacent posts')

// 	const prevData: AdjacentPostTypeResponse = await prevRes.json()
// 	const nextData: AdjacentPostTypeResponse = await nextRes.json()

// 	return {
// 		prevPost: prevData.data?.[0] || null,
// 		nextPost: nextData.data?.[0] || null,
// 	}
// }

// export default function useFetchAdjacentPosts(publishedAt: string) {
// 	return useQuery({
// 		queryKey: ['adjacentPosts', publishedAt],
// 		queryFn: () => fetchAdjacentPosts(publishedAt),
// 		staleTime: 1000 * 60 * 5,
// 		refetchOnWindowFocus: false,
// 	})
// }
