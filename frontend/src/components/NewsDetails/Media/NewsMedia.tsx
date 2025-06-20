'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'
import { URL } from '@/constant/url'
import styles from '../NewsDetails.module.scss'
import { MediaType } from '@/components/News/types'
import errorImage from '@/../public/empty.png'

const NewsMedia = ({ media }: { media: MediaType[] }) => {
	useEffect(() => {
		const lightbox = GLightbox({ loop: true, dragToleranceX: 300, zoomable: false })
		return () => lightbox.destroy()
	}, [media])

	if (!media || media.length === 0) return null
	return (
		<div className={styles.assets}>
			<p>Galeria:</p>
			<div className={styles.gallery}>
				{media.map((item, index) => {
					const mediaSrc = item.formats?.small?.url ? `${URL}${item.formats.small.url}` : errorImage.src

					return (
						<a
							key={index}
							href={`${URL}${item.url}`}
							data-gallery='gallery1'
							data-glightbox
							className={`${styles.item} glightbox`}>
							<Image
								src={mediaSrc}
								alt={item.alternativeText || 'Zdjęcie'}
								fill
							/>
						</a>
					)
				})}
			</div>
		</div>
	)
}

export default NewsMedia
