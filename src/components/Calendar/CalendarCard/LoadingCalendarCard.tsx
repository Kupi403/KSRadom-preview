import generateComponents from '@/lib/helpers/generateComponents'
import styles from './CalendarCard.module.scss'

const Skeleton = ({ className }: { className: string }) => <div className={`${styles.skeleton} ${className}`} />

const LoadingCalendarCard = ({ layout = 'auto' }: { layout?: string }) => {
	return (
		<div className={`${styles['calendar-card']} ${layout === 'auto' ? styles.auto : ''}`}>
			<div className={`${styles.box} ${styles['date-box']}`}>
				<div className={styles.upper}>
					<Skeleton className={styles.day} />
					<Skeleton className={styles.month} />
					<Skeleton className={styles.year} />
				</div>
				<Skeleton className={styles['day-name']} />
			</div>

			<div className={`${styles.box} ${styles['info-box']}`}>
				<Skeleton className={styles['day-mobile']} />
				<div
					className={`${styles.content}`}
					style={{ justifyContent: 'space-between' }}>
					<div className={styles['date-info']}>{generateComponents(Skeleton, 2, styles.description)}</div>
					<Skeleton className={`${styles.description}`} />
				</div>
			</div>
		</div>
	)
}

export default LoadingCalendarCard
