// import { News } from '../../../types/newsType'
import './NewsCard.scss'
import { FaUser } from 'react-icons/fa'
import { MdDateRange } from 'react-icons/md'

// type NewsCardProps = {
// 	news: News
// }

const NewsCard: React.FC<any> = ({ news }) => {
	console.log(news && news)
	return (
		<a
			className='news-card'
			href='#'>
			<div className='news-card__image'>
				<img
					src={`${import.meta.env.VITE_BACKEND}${news.media && news.media[0].formats.small.url}`}
					alt={news.media[0].alternativeText || news.title}
				/>
				<span className='news-card__image--tag'>{news.categories[0].category}</span>
			</div>
			<div className='news-card__content'>
				<div className='news-card__data'>
					<h3 className='news-card__data--title'>{news.title}</h3>
					<div className='news-card__data--info'>
						<p className='news-card__data--date'>
							<MdDateRange color='#797979' /> <span>10.10.2021, 13:20</span>
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
