import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { AdjacentPostType } from './AdjacentPosts'
import useSetDate from '@/helpers/useSetDate'
import { MdDateRange } from 'react-icons/md'
import styles from '../NewsDetails.module.scss'
import { URL } from '@/constant/url'

const AdjacentCard = ({ data }: { data: AdjacentPostType }) => {
	const date = useSetDate(data.createdAt)

	if (data)
		return (
			<Link
				href={`/aktualnosci/${data.slug}-${data.documentId}`}
				className={styles['adjacent-card']}>
				<div className={styles['image-wrapper']}>
					<Image
						src={`${URL}${data.thumbnail.formats.small.url}`}
						alt={data.title}
						fill
					/>
					<div className={styles.overlay}>
						<h3 className={styles.title}>{data.title}</h3>
						<p className={styles.date}>
							<MdDateRange color='#eee' />
							{date}
						</p>
						<p className={styles['adjacent-description']}>{data.description.slice(0, 150)}</p>
					</div>
				</div>
			</Link>
		)
}

export default AdjacentCard
