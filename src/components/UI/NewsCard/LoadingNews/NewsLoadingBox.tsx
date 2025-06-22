import styles from './NewsLoadingBox.module.scss'
import { NewsLoadingBoxProps } from './types'

const NewsLoadingBox = ({ subpage }: NewsLoadingBoxProps) => {
	return (
		<div className={`${styles['news-loading-box']} ${subpage ? styles.subpage : styles.main}`}>
			<div className={styles.image}></div>
			<div className={styles.content}>
				<div>
					<div className={styles.title}></div>
					<div className={styles.creator}></div>
				</div>
				<div className={styles.text}></div>
				<div className={styles.more}></div>
			</div>
		</div>
	)
}

export default NewsLoadingBox
