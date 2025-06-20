import { NewsType } from '@/components/News/types'
import createFetchFunction from './createFetchFunction'

export const fetchNewsDetails = async (documentId: string) => {
	const query = `/posts/${documentId}?populate=*`

	return createFetchFunction(query, (res: { data: NewsType }) => {
		const data = res.data
		return {
			id: data.id,
			documentId: data.documentId,
			title: data.title,
			description: data.description,
			newDescription: data.newDescription ?? data.description,
			slug: data.slug,
			publishedAt: data.publishedAt,
			createdAt: data.createdAt,
			startTime: data.startTime,
			endTime: data.endTime,
			updatedAt: data.updatedAt,
			thumbnail: data.thumbnail,
			categories: data.categories,
			files: data.files,
			media: data.media,
			createdBy: data.createdBy,
		}
	})
}

export default fetchNewsDetails
