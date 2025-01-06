export type NavItemSubcategory = {
	text: string
	address: string
	subcategories?: { text: string; address: string, isExternal?: boolean }[]
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
	index: number
	linkItem: NavItemSubcategory
}
