import Link from 'next/dist/client/link'
import React from 'react'
import styles from '../NewsDetails.module.scss'
import { CategoriesType } from '@/components/News/types'

const NewsCategories = ({ categories }: { categories: CategoriesType[] }) => {
	return (
		<>
			<div className={styles.categories}>
				<p>Kategorie:</p>

				{categories.map(category => {
					return (
						<Link
							key={category.name}
							href={`/aktualnosci?page=1&sort=desc&category=${category.name}`}>
							{category.name}
						</Link>
					)
				})}
			</div>
		</>
	)
}

export default NewsCategories
