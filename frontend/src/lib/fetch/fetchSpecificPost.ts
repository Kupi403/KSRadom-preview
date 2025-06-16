import createFetchFunction from './createFetchFunction'
import { NewsType } from '@/components/News/types'
import extractShortDescription from '../helpers/extractShortDescription'

export const fetchSpecificPost = (documentId: string) => {
	const fetchURL = `/posts/${documentId}?populate=*`
	return createFetchFunction(fetchURL, (data: { data: NewsType }) => {
		const item = data.data
		return {
			categories: item.categories,
			shortDescription: extractShortDescription(item.newDescription),
			newDescription: item.newDescription,
			slug: item.slug,
			thumbnail: item.thumbnail,
			documentId: item.documentId,
			title: item.title,
			createdAt: item.createdAt,
			id: item.id,
			files: item.files,
			media: item.media
		}
	})
}

export default fetchSpecificPost
