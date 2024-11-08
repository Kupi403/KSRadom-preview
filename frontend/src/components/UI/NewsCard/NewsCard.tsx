// import { News } from '../../../types/newsType'
import './NewsCard.scss'
import { FaUser } from 'react-icons/fa'
import { MdDateRange } from 'react-icons/md'

// type NewsCardProps = {
// 	news: News
// }

const NewsCard: React.FC<any> = ({ news }) => {
	console.log(news && news)
	const newsDate = new Date(news.publishedAt)
	const dateString = newsDate.toLocaleDateString('pl', {
		// weekday: 'long',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	})

	const timeString = newsDate.toLocaleTimeString('pl', {
		hour: '2-digit',
		minute: '2-digit',
	})

	// console.log(dateString + ', ' + timeString)

	return (
		<a
			className='news-card'
			href='#'>
			<div className='news-card__image'>
				<img
					src={`${import.meta.env.VITE_BACKEND}${news.media && news.media[0].formats.small.url}`}
					alt={news.media[0].alternativeText || 'Zdjecie'}
				/>
				<span className='news-card__image--tag'>
					{news.categories[0] ? news.categories[0].category : 'aktualnosc'}
				</span>
			</div>
			<div className='news-card__content'>
				<div className='news-card__data'>
					<h3 className='news-card__data--title'>{news.title || 'Tytuł'}</h3>
					<div className='news-card__data--info'>
						<p className='news-card__data--date'>
							<MdDateRange color='#797979' /> <span>{dateString + ', ' + timeString}</span>
						</p>
						<p className='news-card__data--userdata'>
							<FaUser color='#797979' />

							<span>M.K</span>
						</p>
					</div>
				</div>
				<p className='news-card__content--text'>{news.text.substring(0, 150)}</p>
				<p style={{ marginTop: '1em' }}>Więcej ▶</p>
			</div>
		</a>
	)
}

export default NewsCard
