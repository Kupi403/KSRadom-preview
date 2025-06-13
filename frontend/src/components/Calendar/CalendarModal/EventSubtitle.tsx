import React from 'react'
import styles from './CalendarModal.module.scss'
import { NO_INFO } from '@/constant/error'
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer'
type BaseProps = {
	icon: JSX.Element
	subtitle: string
}

type EventSubtitleProps =
	| (BaseProps & { text: string; place?: never; description?: never })
	| (BaseProps & { description: BlocksContent; text?: never; place?: never })
	| (BaseProps & {
			place: {
				name: string
				city: string
				street: string
				buildingNumber?: string
			}
			text?: never
			description?: never
	  })
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
