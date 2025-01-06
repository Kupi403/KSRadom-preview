import styles from './News.module.scss'
import { useFetch } from '@/helpers/useFetch'
import { NewsType } from '@/types/newsType'
import NewsCard from '@/components/UI/NewsCard/NewsCard'
import NewsLoadingBox from '../UI/NewsCard/NewsLoadingBox'
import Link from 'next/link'

const News = () => {
	const { loading, error, data = [] as NewsType[] } = useFetch('posts', 'posts')

	return (
		<div className={styles.news}>
			{loading && (
				<>
					<p>Ładowanie postów...</p>
					<NewsLoadingBox />
					<NewsLoadingBox />
					<NewsLoadingBox />
				</>
			)}
			{data.length > 0 && (
				<>
					{data.map(news => (
						<NewsCard
							key={news.documentId}
							news={news}
						/>
					))}
					<Link
						className={styles['show-more']}
						href='/aktualnosci'>
						Zobacz więcej aktualności
					</Link>
				</>
			)}
			{data.length == 0 && !error && !loading && (
				<>
					<p>Brak aktualności</p>
					<button>Spróbuj ponownie</button>
				</>
			)}

			{error && <p>Wystąpił błąd podczas ładowania postów.</p>}
		</div>
	)
}

export default News
