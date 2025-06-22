import { FileType } from '@/components/News/types'
import { SeasonsType } from '@/hooks/ReactQuery/useFetchSeasons'

export type DownloadCategoryType = {
	description?: string
	documentId: string
	name: string
}

export type DownloadItem = {
	id: number
	name: string
	description: string | null
	documentId: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	file: FileType
	download_categories: DownloadCategoryType[]
	season: SeasonsType
}

export type DownloadItemsProps = { category: string | undefined; showSeason?: boolean }
