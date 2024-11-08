export type NavItemSubcategory = {
	text: string
	subcategories?: string[]
}



export type NavMobileItemProps = {
	items: NavItemSubcategory[]
	isMobileMenuOpen: boolean
	setIsMobileMenuOpen: (value: boolean) => void
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
