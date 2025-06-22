import { DownloadItem } from '@/components/SubpageManager/DownloadItems/types'
import createFetchFunction from './createFetchFunction'

const fetchDownloadCategoryItems = async (): Promise<DownloadItem[]> => {
	const params = new URLSearchParams()

	params.append('populate[downloads][populate]', 'season')
	params.append('populate[downloads][populate]', 'file')

	const query = `/download-categories?${params.toString()}`

	return createFetchFunction(query, (res: { data: DownloadItem[] }) => res.data ?? [])
}

export default fetchDownloadCategoryItems
