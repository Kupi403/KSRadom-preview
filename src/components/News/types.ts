import { BlocksContentFixed } from './util'
export type CategoriesType = {
	name: string
	path: string
}

export type CategoriesResponseType = {
	data: CategoriesType[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

export type SortType = 'desc' | 'asc'

export type NewsPaginationProps = {
	totalPosts: number
	postsPerPage: number
	currentPage: number
	setCurrentPage: (page: number) => void
	loading: boolean
}

export type NewsListProps = {
	news: NewsType[]
	isFetching: boolean
	isError: boolean
	error: any
	refetchFn: () => void
	showMoreLink?: string
	subpage?: boolean
}

export type NewsType = {
	newDescription: BlocksContentFixed
	id?: number
	title: string
	description?: string
	shortDescription?: string
	slug?: string
	createdAt: string
	startTime?: string
	endTime?: string
	publishedAt: string
	updatedAt?: string
	documentId?: string
	thumbnail: {
		url: string
		alternativeText?: string
		formats: FormatTypes
	}
	categories: CategoriesType[]
	media?: MediaType[]
	files?: FileType[]
	createdBy?: {
		firstname: string
		lastname: string
		username: string | null
	}
}

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

export type FormatTypes = {
	thumbnail?: MediaFormat
	small?: MediaFormat
	medium?: MediaFormat
	large?: MediaFormat
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

export type MetaType = {
	pagination: {
		page: number
		pageSize: number
		pageCount: number
		total: number
	}
}

export type NewsResponse = {
	data: NewsType[]
	meta?: MetaType
}

export type NewsFetchOptions = {
	order: 'desc' | 'asc' | string
	currentPage: number
	postsPerPage: number
	pagination?: boolean
	category?: string | null
	filterFuture?: boolean
}
