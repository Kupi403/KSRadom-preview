import React from 'react'
import { IconType } from 'react-icons'

const CalendarSubtitle: React.FC<{ icon: JSX.Element; subtitle: string; text: string; limitChar?: boolean }> = ({
	icon,
	subtitle,
	text,
	limitChar,
}) => {
	return (
		<div className='calendar-card__subtitle'>
			<div className='calendar-card__subtitle--info'>
				{icon}
				<p>{subtitle}</p>
			</div>
			<p className={`${limitChar ? 'limited' : ''} calendar-card__content`}>{text}</p>
		</div>
	)
}

export default CalendarSubtitle
