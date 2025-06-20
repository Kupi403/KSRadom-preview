import { BlocksContent } from '@strapi/blocks-react-renderer'
import { CategoriesType, MetaType } from '../News/types'
import { BlocksContentFixed } from '../News/util'

export type CategoriesResponseType = {
	data: CategoriesType[]
	meta: MetaType
}

export type AdjacentPostType = {
	id: number
	documentId: string
	newDescription: BlocksContentFixed
	slug: string
	title: string
	createdAt: string
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
