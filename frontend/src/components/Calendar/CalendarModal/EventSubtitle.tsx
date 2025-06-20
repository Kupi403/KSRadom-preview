import React from 'react'
import styles from './CalendarModal.module.scss'
import { NO_INFO } from '@/constant/fallback'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { EventSubtitleProps } from './types'

const EventSubtitle = ({ icon, subtitle, place, text, description }: EventSubtitleProps) => {
	return (
		<div className={styles.subtitle}>
			<div className={styles.info}>
				{icon}
				<p>{subtitle || NO_INFO}</p>
			</div>
			{text && <p>{text}</p>}
			{description && <BlocksRenderer content={description} />}
			{place && (
				<>
					<p>{place.name}</p>
					<p>{`${place.city}, ul. ${place.street} ${place.buildingNumber ? place.buildingNumber : ''} `}</p>
				</>
			)}
		</div>
	)
}

export default EventSubtitle
