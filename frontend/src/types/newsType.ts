import { CategoriesType } from '@/components/News/types'

export type NewsType = {
	title: string
	// text: { type: string; children: { text: string }[] }[]
	text: string
	documentId: string
	createdAt: string
	updatedAt: string
	dateToPublish: string | null
	id: number
	category: CategoriesType
	createdBy: {
		firstname: string
		lastname: string
		username: string | null
	}
}
export type fetchedNews = {
	loading: boolean
	error: string
	data: NewsType[]
}
