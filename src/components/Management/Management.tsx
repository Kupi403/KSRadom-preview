import React from 'react'
import styles from './Management.module.scss'
import Member from './Member'

const Management = () => {
	return (
		<div className={styles.management}>
			<Member />
			<div className={styles.members}>
				<Member />
				<Member />
				<Member />
				<Member />
			</div>
		</div>
	)
}

export default Management
