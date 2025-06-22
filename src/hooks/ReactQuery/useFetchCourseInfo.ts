'use client'

import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { BlocksContent } from '@strapi/blocks-react-renderer'
import { SeasonsType } from './useFetchSeasons'
import { MediaType } from '@/components/News/types'
import fetchCourseInfo from '@/lib/fetch/fetchCourseInfo'

export type CourseInfoType = {
	description: BlocksContent
	dueDate: Date
	isOfficialDate: boolean
	image: MediaType
	video: MediaType
	season: SeasonsType
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
