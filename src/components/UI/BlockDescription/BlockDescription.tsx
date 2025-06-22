import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer'
import styles from './BlockDescription.module.scss'

const Description = ({ content }: { content: BlocksContent }) => {
	return (
		<div className={styles['block-description']}>
			<BlocksRenderer content={content} />
		</div>
	)
}

export default Description
