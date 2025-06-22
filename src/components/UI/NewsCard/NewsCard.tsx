import styles from './NewsCard.module.scss'
import Link from 'next/link'
import NewsDateAndCreatorInfo from './NewsDateAndCreator/NewsCreationInfo'
import Image from 'next/image'
import { URL } from '@/constant/url'
import { IMAGE_NOT_FOUND } from '@/constant/fallback'
import { NewsCardProps } from './types'

const NewsCard = ({ news, subpage }: NewsCardProps) => {
	const thumbnailImage = news.thumbnail.formats.small ? `${URL}${news.thumbnail.formats.small.url}` : IMAGE_NOT_FOUND

	const altText = `${news.thumbnail.alternativeText ? news.thumbnail.alternativeText : 'Zdjęcie miniaturka dla postu'}`

	const categoryName = news.categories[0] ? news.categories[0].name : 'Aktualności'

	const datePublished = news.startTime ?? news.publishedAt

	return (
		<Link
			className={`${styles['news-card']} ${subpage ? styles.subpage : styles.mainpage}`}
			href='/aktualnosci/[documentId]'
			as={`/aktualnosci/${news.slug}-${news.documentId}`}
			scroll>
			<div className={styles.image}>
				<Image
					src={thumbnailImage}
					fill
					sizes='(max-width: 768px) 100vw, 50vw'
					alt={altText}
				/>
				<span className={styles.tag}>{categoryName}</span>
			</div>
			<div className={styles.content}>
				<div
					className={styles.data}
					title={news.title.length > 80 ? news.title : undefined}>
					<h3 className={styles.title}>{news.title || 'Tytuł'}</h3>
					<NewsDateAndCreatorInfo
						createdBy={news.createdBy}
						publishedAt={datePublished}
					/>
				</div>
				<p className={`${styles.text} ${styles.sliced}`}>{news.shortDescription}</p>
				<p className={styles['show-more']}>Więcej {'>'}</p>
			</div>
		</Link>
	)
}

export default NewsCard
