import { News } from '../../../types/newsType'
import './NewsCard.scss'

type NewsCardProps = {
	news: News
}

const NewsCard: React.FC<any> = ({ news }) => {
	return (
		<a
			className='news-card'
			href='#'>
			<div className='news-card__image'>
				<img
					src={`http://localhost:1337${news.media && news.media[0].formats.small.url}`}
					alt=''
				/>
				<span className='news-card__image--tag'>{news.text.substring(0, 6).toUpperCase()}</span>
			</div>
			<div className='news-card__content'>
				<div className='news-card__data'>
					<h3 className='news-card__data--title'>{news.title}</h3>
					<div className='news-card__data--info'>
						<p className='news-card__data--date'>
							<span>⏲ </span>
							<span>10.10.2021, 13:20</span>
						</p>
						<p className='news-card__data--userdata'>
							<span>👤 </span>
							<span>M.K</span>
						</p>
					</div>
				</div>
				<p className='news-card__content--text'>{news.text.substring(0, 150)}</p>
			</div>
		</a>
	)
}

export default NewsCard
