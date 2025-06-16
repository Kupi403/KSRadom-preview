'use client'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { NewsResponse, NewsType } from '@/types/PostType'
import { API_URL } from '@/constant/url'

// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:1337/api'

// // console.log(import.meta.env.NEXT_PUBLIC_BACKEND)

// const URL = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:1337'
// const API_URL = `${URL}/api`
const fetchPosts = async () => {
	// QURY Z CREATEDBY
	// const query = `/posts?sort[0]=publishedAt:desc&fields[0]=title&fields[1]=description&fields[2]=createdAt&fields[3]=updatedAt&fields[4]=publishedAt&fields[5]=slug&populate[categories][fields][0]=name&populate[categories][fields][1]=path&populate[createdBy][fields][0]=firstname&populate[createdBy][fields][1]=lastname&populate[createdBy][fields][2]=username&populate[files][fields][0]=name&populate[media][fields][0]=url&populate[thumbnail][fields][0]=formats&pagination[pageSize]=5`

	const query = `/posts
	?sort[0]=publishedAt:desc
	&fields[0]=title
	&fields[1]=description
	&fields[2]=newDescription
	&fields[3]=createdAt
	&fields[4]=updatedAt
	&fields[5]=publishedAt
	&fields[6]=slug
	&populate[categories][fields][0]=name
	&populate[categories][fields][1]=path
	&populate[files][fields][0]=name
	&populate[media][fields][0]=url
	&populate[thumbnail][fields][0]=formats
	&pagination[pageSize]=5`
	const res = await fetch(`${API_URL}${query}`)

	if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
	const { data }: { data: NewsType[] } = await res.json()
	console.log(data)

	const postData = data.map(data => ({
		categories: data.categories,
		shortDescription: data.newDescription[0].children[0].text.substring(0, 150),
		slug: data.slug,
		thumbnail: data.thumbnail,
		documentId: data.documentId,
		title: data.title,
		createdAt: data.createdAt,
		id: data.id,
	}))

	return postData
}

export default function useFetchMainPageNews() {
	return useQuery<NewsType>({
		queryKey: ['posts'],
		queryFn: fetchPosts,
		retry: 1,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	})
}
