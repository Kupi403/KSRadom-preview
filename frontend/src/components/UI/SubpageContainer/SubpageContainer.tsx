import { PropsWithChildren } from 'react'
import styles from './SubpageContainer.module.scss'

type SubpageContainerType = {
	title: string
}
const SubpageContainer: React.FC<PropsWithChildren<SubpageContainerType>> = ({ title, children }) => {
	return (
		<section className={styles['section-container']}>
			<h2 className={styles.title}>{title}</h2>
			{children}
		</section>
	)
}

export default SubpageContainer
