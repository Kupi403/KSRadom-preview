'use client'
import { API_URL } from '@/constant/url'
import { NewsResponse } from '@/types/PostType'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

type SortOption = {
	order: 'desc' | 'asc' | string
	currentPage: number
	postsPerPage: number
	category?: string | null
}

const fetchNews = async ({ order = 'desc', currentPage, postsPerPage, category }: SortOption) => {
	//QUERY Z CREATEDBY
	// let query = `/posts?sort[0]=publishedAt:${order}
	// 	&fields[0]=title
	// 	&fields[1]=description
	// 	&fields[2]=createdAt
	// 	&fields[3]=updatedAt
	// 	&fields[4]=publishedAt
	// 	&fields[5]=slug
	// 	&populate[categories][fields][0]=name
	// 	&populate[categories][fields][1]=path
	// 	&populate[createdBy][fields][0]=firstname
	// 	&populate[createdBy][fields][1]=lastname
	// 	&populate[createdBy][fields][2]=username
	// 	&populate[files][fields][0]=name
	// 	&populate[media][fields][0]=url
	// 	&populate[thumbnail][fields][0]=formats
	// 	&pagination[page]=${currentPage}
	// 	&pagination[pageSize]=${postsPerPage}`
	let query = `/posts?sort[0]=publishedAt:${order}
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
		&pagination[page]=${currentPage}
		&pagination[pageSize]=${postsPerPage}`

	if (category) {
		query += `&filters[categories][name][$eq]=${category}`
	}

	const res = await fetch(`${API_URL}${query}`)

	if (!res.ok) {
		throw new Error('Błąd podczas pobierania aktualności')
	}
	const { data }: { data: NewsType[] } = await res.json()

	const postData = data.map(data => ({
		categories: data.categories,
		shortDescription: data.newDescription[0].children[0].text.substring(0, 150),
		newDescription: data.newDescription,
		slug: data.slug,
		thumbnail: data.thumbnail,
		documentId: data.documentId,
		title: data.title,
		createdAt: data.createdAt,
		id: data.id,
	}))
	console.log(postData)

	return postData
}

const useFetchAllNews = ({
	order = 'desc',
	currentPage,
	postsPerPage,
	category,
}: SortOption): UseQueryResult<NewsResponse> => {
	return useQuery({
		queryKey: ['all-news', currentPage, postsPerPage, order, category],
		queryFn: () => fetchNews({ order, currentPage, postsPerPage, category }),
		staleTime: 1000 * 60 * 5,
		retry: 1,
		refetchOnWindowFocus: true,
		refetchOnReconnect: false,
	})
}

export default useFetchAllNews
