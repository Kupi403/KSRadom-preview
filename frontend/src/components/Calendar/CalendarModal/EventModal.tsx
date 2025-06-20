'use client'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { RootState } from '@/redux/store'
import { closeEventModal } from '@/redux/slices/eventModalSlice'
import styles from './CalendarModal.module.scss'
import { FaAlignLeft, FaRegClock } from 'react-icons/fa'
import { IoCloseOutline } from 'react-icons/io5'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { NO_INFO } from '@/constant/fallback'
import EventSubtitle from './EventSubtitle'
import { MdPlace } from 'react-icons/md'
import { URL } from '@/constant/url'
import errorImage from '@/../public/empty.png'

const EventModal = () => {
	const dispatch = useDispatch()
	const { event, isOpen } = useSelector((state: RootState) => state.eventModal)
	useEffect(() => {
		isOpen ? (document.documentElement.style.overflow = 'hidden') : (document.documentElement.style.overflow = '')
	}, [isOpen])
	if (!isOpen || !event) return null

	const date = new Date(event.startDate).toLocaleDateString('pl', { day: '2-digit', month: '2-digit', year: 'numeric' })
	const dayName = new Date(event.startDate).toLocaleDateString('pl', { weekday: 'long' })

	const startTime = new Date(event.startDate).toLocaleTimeString('pl', { hour: '2-digit', minute: '2-digit' })
	const endTime = event.endDate
		? new Date(event.endDate).toLocaleTimeString('pl', { hour: '2-digit', minute: '2-digit' })
		: null

	const isSameDay = event.endDate && new Date(event.startDate).toDateString() === new Date(event.endDate).toDateString()

	const dateText = `${dayName}, ${date},  ${endTime && isSameDay ? `${startTime} - ${endTime}` : startTime}`

	return createPortal(
		<div
			className={styles.backdrop}
			onClick={() => dispatch(closeEventModal())}>
			<div
				className={styles.modal}
				onClick={e => e.stopPropagation()}>
				<div className={styles.image}>
					<Image
						src={event ? `${URL}${event.place.image.url}` : errorImage}
						alt={event ? event.place.name : NO_INFO}
						fill
						objectFit='cover'
					/>
				</div>

				<div className={styles['modal-content']}>
					<h2>{event ? event.name : NO_INFO}</h2>
					<div className={styles.subtitles}>
						<div className={styles.info}>
							<EventSubtitle
								icon={<FaRegClock />}
								subtitle={'data'}
								text={dateText}
							/>
							<EventSubtitle
								icon={<MdPlace />}
								subtitle={'miejsce'}
								place={event.place}
							/>
						</div>

						{event.description && (
							<div className={styles.description}>
								<EventSubtitle
									icon={<FaAlignLeft />}
									subtitle={'dodatkowe informacje'}
									description={event.description}
								/>
							</div>
						)}
					</div>
				</div>
				<button
					className={styles.close}
					onClick={() => dispatch(closeEventModal())}>
					<IoCloseOutline
						color='#fff'
						size={20}
					/>
				</button>
			</div>
		</div>,
		document.body
	)
}

export default EventModal
