import { CategoriesType } from '../types'

export const generateCategoryOptions = (categories: CategoriesType[] | null | undefined) => {
	if (!categories) return []
	return [
		{ value: '', caption: 'Wszystkie', default: true },
		...(categories
			? categories.map(category => ({
					value: category.name,
					caption: category.name.charAt(0).toUpperCase() + category.name.slice(1),
			  }))
			: []),
	]
}
