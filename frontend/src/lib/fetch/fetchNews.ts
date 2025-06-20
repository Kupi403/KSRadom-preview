import { MetaType, NewsFetchOptions, NewsType } from '@/components/News/types'
import createFetchFunction from './createFetchFunction'
import extractShortDescription from '../helpers/extractShortDescription'
export const fetchNews = async ({
	order = 'desc',
	currentPage = 1,
	postsPerPage = 9,
	category,
	pagination,
	filterFuture = true,
}: NewsFetchOptions) => {
	const now = new Date().toISOString()

	const params = new URLSearchParams()

	params.append('sort[0]', `publishedAt:${order}`)
	params.append('pagination[page]', currentPage.toString())
	params.append('pagination[pageSize]', postsPerPage.toString())

	const fields = [
		'title',
		'description',
		'createdAt',
		'updatedAt',
		'publishedAt',
		'slug',
		'startTime',
		'endTime',
		'newDescription',
	]
	fields.forEach((field, index) => params.append(`fields[${index}]`, field))

	params.append('populate[categories][fields][0]', 'name')
	params.append('populate[categories][fields][1]', 'path')
	params.append('populate[files][fields][0]', 'name')
	params.append('populate[media][fields][0]', 'url')
	params.append('populate[thumbnail][fields][0]', 'formats')

	if (category) {
		params.append('filters[categories][name][$eq]', category)
	}

	if (filterFuture) {
		params.append('filters[$or][0][startTime][$null]', 'true')
		params.append('filters[$or][1][startTime][$lte]', now)
	}
	const query = `/posts?${params.toString()}`

	return createFetchFunction(query, (res: { data: NewsType[]; meta?: MetaType }) => {
		const filtered = filterFuture
			? res.data.filter(news => {
					const startDate = news.startTime ?? news.publishedAt
					return new Date(startDate) <= new Date(now)
			  })
			: res.data

		const mapped = filtered.map(item => ({
			id: item.id,
			title: item.title,
			slug: item.slug,
			categories: item.categories,
			shortDescription: extractShortDescription(item.newDescription),
			newDescription: item.newDescription,
			thumbnail: item.thumbnail,
			documentId: item.documentId,
			createdAt: item.createdAt,
			startTime: item.startTime,
			publishedAt: item.publishedAt,
			endTime: item.endTime,
		}))

		return {
			data: mapped,
			meta: pagination && res.meta?.pagination ? { pagination: res.meta.pagination } : undefined,
		}
	})
}

export default fetchNews
