import { SeasonsType } from '@/hooks/ReactQuery/useFetchSeasons'
import createFetchFunction from './createFetchFunction'

const fetchSeasons = async (): Promise<SeasonsType[]> => {
	const url = '/seasons?sort=startDate:desc'

	return createFetchFunction(url, (res: { data: any[] }) => {
		if (!res?.data) return []

		return res.data.map(item => ({
			name: item.name,
			startDate: new Date(item.startDate),
			endDate: new Date(item.endDate),
		}))
	})
}

export default fetchSeasons
