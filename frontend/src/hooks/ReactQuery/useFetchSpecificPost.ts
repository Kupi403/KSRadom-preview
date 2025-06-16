// import { NewsType } from '@/types/PostType'

// export async function getPostData(documentId: string): Promise<NewsType | null> {
//     try {
//         const response = await fetch(`http://localhost:1337/api/posts/${documentId}?populate=*`, {
//             next: { revalidate: 60 },
//         })
//         if (!response.ok) return null

//         const data = await response.json()
//         console.log(data.data)
//         return {
//             id: data.data.id,
//             documentId: data.data.documentId,
//             title: data.data.title,
//             description: data.data.description,
//             thumbnail: data.data.thumbnail,
//             categories: data.data.categories,
//             files: data.data.files,
//             media: data.data.media,
//             createdAt: data.data.createdAt,
//             updatedAt: data.data.updatedAt,
//             createdBy: data.data.createdBy,
//         }
//     } catch (error) {
//         console.error('Error fetching post data:', error)
//         return null
//     }
// }

'use client'

import { NewsType } from '@/types/PostType'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { API_URL } from '@/constant/url'
// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:1337/api'

// const URL = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:1337'
// const API_URL = `${URL}/api`

export const fetchPost = async (documentId: string): Promise<NewsType | null> => {
	try {
		const response = await fetch(`${API_URL}/posts/${documentId}?populate=*`)

		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
		const data = await response.json()
		if (!data?.data) return null

		return {
			id: data.data.id,
			documentId: data.data.documentId,
			title: data.data.title,
			description: data.data.description,
			newDescription: data.data.newDescription ? data.data.newDescription : undefined,
			thumbnail: data.data.thumbnail,
			categories: data.data.categories,
			files: data.data.files,
			media: data.data.media,
			createdAt: data.data.createdAt,
			updatedAt: data.data.updatedAt,
			createdBy: data.data.createdBy,
		}
	} catch (error) {
		throw new Error('Failed to fetch post data')
	}
}

const useFetchPost = (documentId: string): UseQueryResult<NewsType | null> => {
	return useQuery({
		queryKey: ['post', documentId],
		queryFn: () => fetchPost(documentId),
		staleTime: 1000 * 60 * 5,
		retry: 1,
		refetchOnWindowFocus: true,
		refetchOnReconnect: false,
	})
}

export default useFetchPost
