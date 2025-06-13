'use client'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { API_URL } from '@/constant/url'
import { NewsResponse, NewsThumbnail, NewsThumbnailResponse } from '@/types/PostType'
import { extractTextFromBlocks } from '@/components/News/util'

type FetchOptionsType = {
	order?: 'desc' | 'asc'
	currentPage?: number
	postsPerPage?: number
	category?: string | null
}

const fetchPosts = async ({
	order = 'desc',
	currentPage = 1,
	postsPerPage = 5,
	category,
}: FetchOptionsType): Promise<NewsThumbnailResponse> => {
	let query = `/posts?sort[0]=publishedAt:${order}
    &fields[0]=title
    &fields[1]=description
    &fields[2]=newDescription
    &fields[3]=createdAt
    &fields[4]=updatedAt
    &fields[5]=publishedAt
    &fields[6]=slug
    &populate[categories][fields][0]=name
    &populate[categories][fields][1]=path
    &populate[thumbnail][fields][0]=formats
    &pagination[page]=${currentPage}
    &pagination[pageSize]=${postsPerPage}`

	if (category) {
		query += `&filters[categories][name][$eq]=${category}`
	}

	const res = await fetch(`${API_URL}${query}`)

	if (!res.ok) {
		throw new Error(`Błąd podczas pobierania newsów: ${res.status}`)
	}

	const { data, meta }: NewsResponse = await res.json()

	const postData: NewsThumbnail[] = data.map(news => {


		const shortDescription = extractTextFromBlocks(news.newDescription).substring(0, 150) || news.title

		return {
			categories: news.categories,
			shortDescription,
			slug: news.slug,
			thumbnail: news.thumbnail,
			documentId: news.documentId,
			title: news.title,
			createdAt: news.createdAt,
			id: news.id,
		}
	})

	return {
		data: postData,
		meta: meta,
	}
}

export const useFetchMainPageNews = ({
	order = 'desc',
	currentPage = 1,
	postsPerPage = 5,
	category = null,
}: FetchOptionsType): UseQueryResult<NewsResponse> => {
	return useQuery({
		queryKey: ['posts'],
		queryFn: () => fetchPosts({ order, currentPage, postsPerPage, category }),
		retry: 1,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	})
}

export const useFetchAllNews = ({
	order = 'desc',
	currentPage = 1,
	postsPerPage = 9,
	category = null,
}: FetchOptionsType): UseQueryResult<NewsResponse> => {
	return useQuery({
		queryKey: ['all-news', currentPage, postsPerPage, order, category],
		queryFn: () => fetchPosts({ order, currentPage, postsPerPage, category }),
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: true,
		refetchOnReconnect: false,
	})
}
