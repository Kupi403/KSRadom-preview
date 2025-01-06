// import { News } from '../../../types/newsType'
import { useEffect, useState } from 'react'
import './NewsCard.scss'
import { FaUser } from 'react-icons/fa'
import { MdDateRange } from 'react-icons/md'
import useSetDate from '@/helpers/useSetDate'
import Link from 'next/link'
import NewsDateAndCreatorInfo from '../NewsDateAndCreatorInfo'
import { Post } from '@/types/PostType'
type NewsCardProps = {
	news: Post
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
	const urlsString = 'localhost:1337'

	return (
		<Link
			className='news-card'
			// href={`/aktualnosci/${news.documentId}`}
			href='/aktualnosci/[documentId]'
			as={`/aktualnosci/${news.slug}-${news.documentId}`}
			scroll>
			<div className='news-card__image'>
				<img
					src={`http://${urlsString}${news.thumbnail && news.thumbnail.formats.small.url}`}
					alt={`${news.thumbnail.alternativeText ? news.thumbnail.alternativeText : 'Zdjecie'}`}
				/>
				<span className='news-card__image--tag'>{news.categories[0] ? news.categories[0].name : 'aktualnosc'}</span>
			</div>
			<div className='news-card__content'>
				<div className='news-card__data'>
					<h3 className='news-card__data--title'>{news.title || 'Tytuł'}</h3>
					<NewsDateAndCreatorInfo
						createdBy={news.createdBy}
						publishedAt={news.publishedAt}
					/>
				</div>
				<p className='news-card__content--text'>{news.description.substring(0, 150)}</p>
				<p style={{ marginTop: '1em' }}>Więcej ▶</p>
			</div>
		</Link>
	)
}

export default NewsCard
