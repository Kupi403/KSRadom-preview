import styles from './NewsCard.module.scss'
import Link from 'next/link'
import NewsDateAndCreatorInfo from './NewsDateAndCreator/NewsCreationInfo'
import { NewsType } from '@/types/PostType'
import Image from 'next/image'
import { URL } from '@/constant/url'
type NewsCardProps = {
	news: NewsType
	subpage?: boolean
}

const NewsCard = ({ news, subpage }: NewsCardProps) => {
	return (
		<Link
			className={`${styles['news-card']} ${subpage ? styles.subpage : styles.mainpage}`}
			href='/aktualnosci/[documentId]'
			as={`/aktualnosci/${news.slug}-${news.documentId}`}
			scroll>
			<div className={styles.image}>
				<Image
					src={`${URL}${news.thumbnail && news.thumbnail.formats.small.url}`}
					fill
					sizes='(max-width: 768px) 100vw, 50vw'
					alt={`${news.thumbnail.alternativeText ? news.thumbnail.alternativeText : 'Zdjecie'}`}
				/>
				<span className={styles.tag}>{news.categories[0] ? news.categories[0].name : 'Aktualności'}</span>
			</div>
			<div className={styles.content}>
				<div
					className={styles.data}
					title={news.title.length > 80 ? news.title : undefined}>
					<h3 className={styles.title}>{news.title || 'Tytuł'}</h3>
					<NewsDateAndCreatorInfo
						createdBy={news.createdBy}
						publishedAt={news.publishedAt || '2022-12-12T12:12:12.000Z'}
					/>
				</div>
				<p className={`${styles.text} ${styles.sliced}`}>{news.shortDescription}</p>
				<p className={styles['show-more']}>Więcej {'>'}</p>
			</div>
		</Link>
	)
}

export default NewsCard
