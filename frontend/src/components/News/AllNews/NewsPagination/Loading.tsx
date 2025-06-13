import React from 'react'
import styles from '../AllNews.module.scss'

const Loading = () => {
	return (
		<div className={styles.loading}>
			<div className={styles.arrow}></div>
			<div className={styles.bar}></div>
			<div className={styles.arrow}></div>
		</div>
	)
}

export default Loading
