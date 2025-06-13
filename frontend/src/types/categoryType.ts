export interface Category {
	id: number
	documentId: string
	name: string
    path: string
}

export interface CategoryResponse {
	data: Category[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}