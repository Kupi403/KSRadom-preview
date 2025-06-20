import { CourseInfoType } from '@/hooks/ReactQuery/useFetchCourseInfo'
import createFetchFunction from './createFetchFunction'

const fetchCourseInfo = async (): Promise<CourseInfoType | null> => {
	const params = new URLSearchParams()

	params.append('populate[season]', 'true')
	params.append('populate[image]', 'true')
	params.append('populate[video]', 'true')
	params.append('sort[0]', 'id:desc')
	params.append('pagination[limit]', '1')

	const query = `/become-a-referees?${params.toString()}`

	return createFetchFunction(query, (res: { data: CourseInfoType[] }) => {
		if (!res?.data || res.data.length === 0) return null
		return res.data[0]
	})
}

export default fetchCourseInfo
