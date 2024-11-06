export type NavItemSubcategory = {
	text: string
	subcategories?: string[]
}

export type NavItemsContainerProps = {
	type: string
	items: NavItemSubcategory[]
}
export type NavItemProps = {
	text: string
	index: number
	address?: string
	subcategories?: string[]
}
