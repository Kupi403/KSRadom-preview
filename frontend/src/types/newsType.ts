export type News = {
	title: string
	// text: { type: string; children: { text: string }[] }[]
	text: string
	documentId: string
	createdAt: string
	updatedAt: string
	dateToPublish: string | null
	id: number
}
export type fetchedNews  = {
	loading:boolean
	error:string
	data: News[]
}