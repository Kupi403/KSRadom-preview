export const extractTextFromBlocks = (blocks: any[]): string => {
	if (!blocks || !Array.isArray(blocks)) return ''

	const texts: string[] = []

	for (const block of blocks) {
		if (Array.isArray(block.children)) {
			for (const child of block.children) {
				if (typeof child === 'object' && typeof child.text === 'string') {
					texts.push(child.text)
				}
			}
		}
	}

	return texts.join(' ')
}