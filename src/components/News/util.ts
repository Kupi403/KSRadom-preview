type TextInlineNode = {
	type: 'text'
	text: string
	bold?: boolean
	italic?: boolean
	underline?: boolean
	code?: boolean
	strikethrough?: boolean
}

type LinkInlineNode = {
	type: 'link'
	url: string
	children: InlineNode[]
}

type InlineNode = TextInlineNode | LinkInlineNode

type BlockNode = {
	type: string
	children: InlineNode[]
}

export type BlocksContentFixed = BlockNode[]
export const extractTextFromBlocks = (blocks: BlocksContentFixed): string => {
	if (!Array.isArray(blocks)) return ''

	const description: string[] = []

	const extractText = (nodes: any[]) => {
		for (const node of nodes) {
			if (typeof node === 'object') {
				if ('text' in node && typeof node.text === 'string') {
					description.push(node.text)
				}
				if ('children' in node && Array.isArray(node.children)) {
					extractText(node.children)
				}
			}
		}
	}

	for (const block of blocks) {
		if (Array.isArray(block.children)) {
			extractText(block.children)
		}
	}

	return description.join(' ').trim()
}
