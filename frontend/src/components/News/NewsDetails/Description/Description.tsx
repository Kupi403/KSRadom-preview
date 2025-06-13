import React from 'react'
import styles from '../NewsDetails.module.scss'

import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer'

const Description = ({ content }: { content: BlocksContent }) => {
	return (
		<div className={styles.description}>
			<BlocksRenderer content={content} />
		</div>
	)
}

export default Description
