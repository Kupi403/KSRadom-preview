import { AdjacentPostType } from '@/components/News/NewsDetails/AdjacentPosts/AdjacentPosts'
import { type BlocksContent } from '@strapi/blocks-react-renderer'

export interface CategoriesType {
	title: string
	categories: {
		name: string
	}[]
	image: string
}

export interface NewsThumbnail {
	id: number
	title: string
	description?: string
	shortDescription: string
	slug?: string
	createdAt: string
	thumbnail: {
		url: string
		alternativeText?: string
		formats: {
			small: { url: string }
			medium?: { url: string }
		}
	}
	categories: {
		name: string
	}[]
}

export interface NewsType extends NewsThumbnail {
	newDescription: BlocksContent
	media?: MediaType
	files?: FileType[]
	updatedAt: string
	documentId: string
	publishedAt?: string
	createdBy?:
		| {
				firstname: string
				lastname: string
				username: string | null
		  }
		| undefined
}

// export interface NewsType {
// 	id: number
// 	title: string
// 	description: string
// 	shortDescription: string
// 	newDescription: BlocksContent
// 	thumbnail: {
// 		url: string
// 		alternativeText: string
// 		formats: {
// 			small: {
// 				url: string
// 			}
// 			medium: {
// 				url: string
// 			}
// 		}
// 	}
// 	categories: {
// 		name: string
// 	}[]
// 	media?: MediaType
// 	files?: FileType[]
// 	createdAt: string
// 	updatedAt: string
// 	documentId: string
// 	slug?: string
// 	publishedAt?: string
// 	createdBy:
// 		| {
// 				firstname: string
// 				lastname: string
// 				username: string | null
// 		  }
// 		| undefined
// }

export type FileType = {
	id: number
	documentId: string
	name: string
	alternativeText: string | null
	caption: string | null
	width: number | null
	height: number | null
	formats: null
	hash: string
	ext: string
	mime: string
	size: number
	url: string
	previewUrl: string | null
	provider: string
	provider_metadata: null
	createdAt: string
	updatedAt: string
	publishedAt: string
}

export type MediaFormat = {
	name: string
	hash: string
	ext: string
	mime: string
	path: string | null
	width: number
	height: number
	size: number
	sizeInBytes: number
	url: string
}

export type MediaType = {
	id: number
	documentId: string
	name: string
	alternativeText: string | null
	caption: string | null
	width: number
	height: number
	formats: {
		thumbnail?: MediaFormat
		small?: MediaFormat
		medium?: MediaFormat
		large?: MediaFormat
	}
	hash: string
	ext: string
	mime: string
	size: number
	url: string
	previewUrl: string | null
	provider: string
	provider_metadata: any | null
	createdAt: string
	updatedAt: string
	publishedAt: string
}

export interface MetaType {
	meta?: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

export interface NewsResponse {
	data: NewsType[]
	meta?: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

export interface NewsThumbnailResponse {
	data: NewsThumbnail[]
	meta?: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

export interface AdjacentPostTypeResponse {
	data: AdjacentPostType[]
	meta?: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}
