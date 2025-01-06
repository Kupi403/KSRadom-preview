import React from 'react'

import { MdDateRange } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { NewsType } from '@/types/newsType'
import useSetDate from '@/helpers/useSetDate'

interface NewsDateAndCreatorInfoProps {
	publishedAt: string
	createdBy: {
		firstname: string
		lastname: string
	}
}

const NewsDateAndCreatorInfo: React.FC<NewsDateAndCreatorInfoProps> = ({ publishedAt, createdBy }) => {
	const formatedDate = useSetDate(publishedAt)

	return (
		<div className='news-card__data--info'>
			<p className='news-card__data--date'>
				<MdDateRange color='#797979' /> <span>{formatedDate}</span>
			</p>
			<p className='news-card__data--userdata'>
				<FaUser color='#797979' />

				<span>
					{createdBy ? createdBy.firstname : 'KS '}
					{createdBy ? createdBy.lastname[0] : 'Radom'}.
				</span>
			</p>
		</div>
	)
}

export default NewsDateAndCreatorInfo
