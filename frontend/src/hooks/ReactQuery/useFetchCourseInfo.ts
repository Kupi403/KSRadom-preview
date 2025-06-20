'use client'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { API_URL } from '@/constant/url'
import { BlocksContent } from '@strapi/blocks-react-renderer'

import { SeasonsType } from './useFetchSeasons'
import { MediaType } from '@/components/News/types'

export type CourseInfoType = {
	description: BlocksContent
	dueDate: Date
	image: MediaType
	video: MediaType
	season: SeasonsType
}

export type CourseInfoResponseType = {
	data: CourseInfoType[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

const fetchCourseInfo = async (): Promise<CourseInfoType[]> => {
	try {
		const fetchURL = `${API_URL}/become-a-referees?populate[season]=true&populate[image]=true&populate[video]=true&sort[0]=id:desc&pagination[limit]=1`

		const response = await fetch(fetchURL)

		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

		const data = await response.json()

		if (!data?.data) return []

		const latest = data.data[0]
		return latest
	} catch (error) {
		throw new Error('Failed to fetch download data')
	}
}

const useFetchCourseInfo = (): UseQueryResult<CourseInfoType | null> => {
	return useQuery({
		queryKey: ['course'],
		queryFn: fetchCourseInfo,
		staleTime: 1000 * 60 * 5,
		retry: 1,
		refetchOnReconnect: false,
	})
}

export default useFetchCourseInfo
