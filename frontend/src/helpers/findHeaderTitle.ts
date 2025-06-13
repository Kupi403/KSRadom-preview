import { ALL_LINKS } from '@/components/Navbar/const'

export const useFindHeaderTitle = (title: string) => {
	const foundLink = ALL_LINKS.find(link =>
		link.subcategories && !link.address.includes(title)
			? link.subcategories.some(sub => sub.address.includes(title))
			: link.address.includes(title)
	)
	// console.log('foundLink: ', foundLink)

	const image = foundLink?.image

	if (foundLink?.subcategories && !foundLink?.address.includes(title)) {
		return foundLink.subcategories.find(sub => sub.address.includes(title))
		// return {
		// 	title: foundLink.subcategories.find(sub => sub.address.includes(title))?.text || title,
		// 	address: foundLink.subcategories.find(sub => sub.address.includes(title))?.address || title,
		// 	image: foundLink.subcategories.find(sub => sub.address.includes(title))?.image || undefined,

		// }
	}

	// return { title: foundLink ? foundLink.text : title, address: foundLink ? foundLink.address : title, image: image }
	return foundLink
}

export default useFindHeaderTitle
