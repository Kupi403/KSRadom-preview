import styles from './CalendarCard.module.scss'
import { NO_INFO } from '@/constant/fallback'
import { CalendarSubtitleProps } from './types'

const CalendarSubtitle = ({ icon, subtitle, text, limitChar }: CalendarSubtitleProps) => {
	return (
		<div className={styles.subtitle}>
			<div className={`${styles.info} ${subtitle === 'miejsce' ? styles.place : ''}`}>
				{icon}
				<p>{subtitle || NO_INFO}</p>
			</div>
			<p className={`${limitChar ? styles.limited : ''} ${subtitle === 'miejsce' ? styles['right-text'] : ''}`}>
				{text || NO_INFO}
			</p>
		</div>
	)
}

export default CalendarSubtitle
