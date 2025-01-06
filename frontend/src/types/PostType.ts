export interface Post {
	id: number
	title: string
	description: string
	thumbnail: {
		url: string
		alternativeText: string
		formats: {
			small: {
				url: string
			}
			medium: {
				url: string
			}
		}
	}
	categories: [
		{
			name: string
		}
	]
	media?: { url: string }
	files: { name: string }
	createdAt: string
	updatedAt: string
	documentId: string
	slug: string
	publishedAt: string
	createdBy: {
		firstname: string
		lastname: string
		username: string | null
	}
}
