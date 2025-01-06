import React from 'react'
import './CalendarCard.scss'
import { FaRegClock } from 'react-icons/fa6'
import { MdPlace } from 'react-icons/md'
import { FiAlignLeft } from 'react-icons/fi'
import CalendarSubtitle from './CalendarSubtitle'

const CalendarCard: React.FC<{ cardDate?: string; place: string; description: string }> = ({
	cardDate,
	place,
	description,
}) => {
	const newDate = new Date(Date.now() + Math.floor(Math.random() * 10000000000))
	// const newDate = new Date(cardDate)
	const day = newDate.toLocaleDateString('pl', { day: '2-digit' })
	const month = newDate.toLocaleString('pl', { month: 'long' })
	const year = newDate.getFullYear()
	const dayName = newDate.toLocaleDateString('pl', { weekday: 'long' })

	const time = newDate.toLocaleTimeString('pl', {
		hour: '2-digit',
		minute: '2-digit',
	})
	const date = newDate.toLocaleDateString('pl', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	})
	return (
		<div className='calendar-card'>
			<div className='calendar-card__box calendar-card__date-box'>
				<div className='calendar-card__date-box--upper'>
					<p className='calendar-card__date-box--day'>{day}</p>
					<p className='calendar-card__date-box--month'>{month}</p>
					<p className='calendar-card__date-box--year'>{year}</p>
				</div>
				<div className='calendar-card__date-box--day-name'>{dayName}</div>
			</div>
			<div className='calendar-card__box calendar-card__info-box'>
				<p className='calendar-card__date-info--day-mobile'>{date || 'blad'}</p>
				<div className='calendar-card__box--content'>
					<div className='calendar-card__date-info'>
						<CalendarSubtitle
							icon={<FaRegClock />}
							subtitle='godzina'
							text={time || '18:00'}
						/>

						<CalendarSubtitle
							icon={<MdPlace />}
							subtitle='miejsce'
							text={place || 'Przysucha, Stadion Miejski'}
							
						/>
					</div>
					<div className='calendar-card__description'>
						<CalendarSubtitle
							icon={<FiAlignLeft />}
							subtitle='opis'
							text={description || 'Finał PP oraz szkolenie dla klas B, P, K oraz Programu Mentorskiego'}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CalendarCard
