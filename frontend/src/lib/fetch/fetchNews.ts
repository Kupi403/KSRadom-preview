import { NewsType } from '@/components/News/types'
import createFetchFunction from './createFetchFunction'
import { NewsSortOption } from '@/components/News/types'
import extractShortDescription from '../helpers/extractShortDescription'

export const fetchNews = ({ order, currentPage, postsPerPage, category }: NewsSortOption) => {
	const fetchURL = `/posts?sort[0]=publishedAt:${order}
    &fields[0]=title
    &fields[1]=description
    &fields[2]=createdAt
    &fields[3]=updatedAt
    &fields[4]=publishedAt
    &fields[5]=slug
    &populate[categories][fields][0]=name
    &populate[categories][fields][1]=path
    &populate[files][fields][0]=name
    &populate[media][fields][0]=url
    &populate[thumbnail][fields][0]=formats
    ${category ? `&filters[categories][name][$eq]=${category}` : ''}
    &pagination[page]=${currentPage}
    &pagination[pageSize]=${postsPerPage}`

	return createFetchFunction(fetchURL, (data: { data: NewsType[] }) => {
		return data.data.map(item => {
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
			}
		})
	})
}
