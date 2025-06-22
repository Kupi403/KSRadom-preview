import { ALL_LINKS } from '@/components/Navbar/const'

export const findHeaderTitle = (title: string) => {
	const foundLink = ALL_LINKS.find(link =>
		link.subcategories && !link.address.includes(title)
			? link.subcategories.some(sub => sub.address.includes(title))
			: link.address.includes(title)
	)

	if (foundLink?.subcategories && !foundLink?.address.includes(title)) {
		return foundLink.subcategories.find(sub => sub.address.includes(title))
	}
	return foundLink
}
