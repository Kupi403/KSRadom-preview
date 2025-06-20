import { FaRegClock } from 'react-icons/fa6'
import { MdPlace } from 'react-icons/md'
import { FiAlignLeft } from 'react-icons/fi'
import CalendarSubtitle from './CalendarSubtitle'
import styles from './CalendarCard.module.scss'
import { NO_INFO } from '@/constant/fallback'
import { CalendarCardProps } from './types'
import { getFormattedEventDate } from '../utils'

const CalendarCard = ({ startDate, endDate, place, description, layout = 'auto', onClick }: CalendarCardProps) => {
	const { dayDigit, dayName, monthName, year, time: startTime, fullDate } = getFormattedEventDate(startDate)

	const { time: endTime } = endDate ? getFormattedEventDate(endDate) : { time: null }

	const cardTime = endTime ? `${startTime}-${endTime}` : startTime ?? NO_INFO

	return (
		<div
			className={`${styles['calendar-card']} ${layout === 'auto' && styles.auto}`}
			onClick={onClick}>
			<div className={`${styles.box} ${styles['date-box']}`}>
				<div className={styles.upper}>
					<p className={styles.day}>{dayDigit}</p>
					<p className={styles.month}>{monthName}</p>
					<p className={styles.year}>{year} </p>
				</div>
				<div className={styles['day-name']}>{dayName}</div>
			</div>
			<div className={`${styles.box} ${styles['info-box']}`}>
				<p className={styles['day-mobile']}>{fullDate}</p>
				<div className={styles.content}>
					<div className={styles['date-info']}>
						<CalendarSubtitle
							icon={<FaRegClock />}
							subtitle='godzina'
							text={cardTime}
						/>

						<CalendarSubtitle
							icon={<MdPlace />}
							subtitle='miejsce'
							text={place ? `${place?.city}, ${place?.name}` : NO_INFO}
						/>
					</div>
					<div className={styles.description}>
						<CalendarSubtitle
							icon={<FiAlignLeft />}
							subtitle='opis'
							text={description}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CalendarCard
