import { CategoriesType, MetaType } from '../News/types'

export type CategoriesResponseType = {
	data: CategoriesType[]
	meta: MetaType
}

export type AdjacentPostType = {
	id: number
	documentId: string
	slug: string
	title: string
	createdAt: string
	description: string
	thumbnail: {
		id: number
		documentId: string
		formats: {
			small: {
				url: string
			}
		}
	}
}

export type AdjacentPostsProps = {
	adjacentPosts: AdjacentPostType[]
}
