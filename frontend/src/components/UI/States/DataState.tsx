import React from 'react'
import Image from 'next/image'
import emptyIllustration from '@/../public/no-data.svg'
import styles from './States.module.scss'
import { DataStateProps } from './types'

const DataState = ({ message }: DataStateProps) => {
	return (
		<div className={styles.container}>
			<p className={styles.message}>{message || 'Brak danych'}</p>
			<div className={styles.illustration}>
				<Image
					src={emptyIllustration}
					fill
					alt='Brak danych'
				/>
			</div>
		</div>
	)
}

export default DataState
