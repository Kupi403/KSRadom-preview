// import { BlocksContent } from '@strapi/blocks-react-renderer'

import { BlocksContentFixed } from '@/components/News/util'

const extractShortDescription = (blocks: BlocksContentFixed): string => {
	const firstBlock = blocks?.[0]
	if (firstBlock && 'children' in firstBlock) {
		const firstChild = firstBlock.children?.[0]
		if (firstChild && 'text' in firstChild && typeof firstChild.text === 'string') {
			return firstChild.text.substring(0, 150)
		}
	}
	return 'Zobacz szczegóły'
}

export default extractShortDescription
