import createFetchFunction from './createFetchFunction'
import { DownloadItem } from '@/components/SubpageManager/DownloadItems/types'

const fetchDownloadItems = async (subpage?: string, season?: string): Promise<DownloadItem[]> => {
	const params = new URLSearchParams()

	params.append('populate[file]', 'true')
	params.append('populate[download_categories]', 'true')
	params.append('populate[season]', 'true')

	if (season) {
		params.append('filters[$or][0][season][$null]', 'true')
		params.append('filters[$or][1][season][name][$eq]', season)
	}

	if (subpage) {
		params.append('filters[download_categories][name][$eq]', subpage)
	}

	const query = `/downloads?${params.toString()}`

	return createFetchFunction(query, (res: { data: DownloadItem[] }) => res.data ?? [])
}

export default fetchDownloadItems
