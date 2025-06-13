export type NavItemBase = {
	text: string
	address: string
	order?: number
	image?: string
	showSeason?: boolean
}

export type NavItemSubcategory = NavItemBase & {
	subcategories?: (NavItemBase & { isExternal?: boolean })[]
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
