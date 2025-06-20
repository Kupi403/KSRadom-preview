import React from 'react'
import AdjacentCard from './AdjacentCard'
import styles from '../NewsDetails.module.scss'
import { AdjacentPostsProps } from '../types'

const AdjacentPosts = ({ adjacentPosts }: AdjacentPostsProps) => {

	return (
		<div className={styles.navigation}>
			<p className={styles.subtitle}>Zobacz również:</p>
			<div className={styles['adjacent-box']}>
				{adjacentPosts[0] && <AdjacentCard data={adjacentPosts[1]} />}
				{adjacentPosts[1] && <AdjacentCard data={adjacentPosts[0]} />}
			</div>
		</div>
	)
}

export default AdjacentPosts
