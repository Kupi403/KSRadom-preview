import { AdjacentPostType } from '@/components/NewsDetails/types'
import createFetchFunction from './createFetchFunction'

export const fetchAdjacentPosts = (documentId: string) => {
	const fetchURL = `/posts/adjacent/${documentId}`
	return createFetchFunction<AdjacentPostType[]>(fetchURL, data => data.adjacentPosts)
}
