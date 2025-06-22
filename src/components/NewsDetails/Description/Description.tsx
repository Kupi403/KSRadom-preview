import React from 'react'
import styles from '../NewsDetails.module.scss'
import { type BlocksContent } from '@strapi/blocks-react-renderer'
import BlockDescription from '@/components/UI/BlockDescription/BlockDescription'

const Description = ({ content }: { content: BlocksContent }) => (
	<div className={styles.description}>
		<BlockDescription content={content} />
	</div>
)

export default Description
