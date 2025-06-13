'use client'

import { NewsType } from '@/types/PostType'
import { useQuery } from '@tanstack/react-query'
import { API_URL } from '@/constant/url'

// const URL = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:1337'
// const API_URL = `${URL}/api` // Możesz wrzucić to do env

const fetchNews = async (page: number) => {
	const queryString = `?populate=*&sort[0]=publishedAt:desc&pagination[pageSize]=10&pagination[page]=${page}`
	const res = await fetch(`${API_URL}/posts${queryString}`)

	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`)
	}

	const responseData = await res.json()
	return responseData
}

export function useNews(page: number) {
	return useQuery({
		queryKey: ['news', page],
		queryFn: () => fetchNews(page),
		staleTime: 5 * 60 * 1000,
		// keepPreviousData: true,
	})
}
