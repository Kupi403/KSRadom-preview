import { CategoriesType } from '@/components/News/types'
import createFetchFunction from './createFetchFunction'

const fetchNewsCategories = async (): Promise<CategoriesType[]> => {
	const url = '/categories'

	return createFetchFunction(url, (res: { data: CategoriesType[] }) => {
		return res?.data ?? []
	})
}

export default fetchNewsCategories
