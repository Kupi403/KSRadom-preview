import React from 'react'
import AdjacentCard from './AdjacentCard'
import styles from '../NewsDetails.module.scss'

export type AdjacentPostType = {
	id: number
	documentId: string
	slug: string
	title: string
	createdAt: string
	description: string
	thumbnail: {
		id: number
		documentId: string
		formats: {
			small: {
				url: string
			}
		}
	}
}

type AdjacentPostsProps = {
	adjacentPosts: AdjacentPostType[]
}

const AdjacentPosts = ({ adjacentPosts }: AdjacentPostsProps) => {
	console.log(adjacentPosts)
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
