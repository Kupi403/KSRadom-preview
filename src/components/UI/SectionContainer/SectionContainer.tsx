import styles from './SectionContainer.module.scss'
import { SectionContainerProps } from './types'

const SectionContainer = ({ priority, isMainPage, title, children, subpage }: SectionContainerProps) => {
	const containerClass = `${styles['section-container']} ${priority && styles[priority]} ${subpage && styles.subpage} ${
		isMainPage && styles.background
	}`
	return (
		<section className={containerClass}>
			{title && <h2 className={`${isMainPage ? styles.title : ''}`}>{title}</h2>}
			<div className={styles.body}>{children}</div>
		</section>
	)
}

export default SectionContainer
