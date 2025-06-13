import { NewsType } from '@/types/PostType'
import { API_URL } from '@/constant/url'
async function useFetchPost(documentId: string): Promise<NewsType | null> {
	// const URL = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:1337'
	// const API_URL = `${URL}/api`
	try {
		const response = await fetch(
			`${API_URL}posts/${documentId}?populate=*`,
			{ next: { revalidate: 60 } } // Opcjonalne cachowanie w Next.js
		)
		if (!response.ok) return null

		const data = await response.json()
		return {
			id: data.data.id,
			documentId: data.data.documentId,
			title: data.data.title,
			description: data.data.description,
			thumbnail: data.data.thumbnail,
			categories: data.data.categories,
			files: data.data.files,
			media: data.data.media,
			createdAt: data.data.createdAt,
			updatedAt: data.data.updatedAt,
			createdBy: data.data.createdBy,
		}
	} catch (error) {
		console.error('Error fetching post data:', error)
		return null
	}
}

export default useFetchPost
