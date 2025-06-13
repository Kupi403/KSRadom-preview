import styles from '../Options.module.scss'
import LoadingButton from '../LoadingButton'
import { useState } from 'react'
import { EventTimeType } from '@/components/Calendar/CalendarSidebar'

type OptionProps = {
	value: EventTimeType
	title: string
	isActive: boolean
	setActiveEvents: (type: EventTimeType) => void
	isShown?: boolean
	loading: boolean
}

const Button = ({ title, value, isActive, isShown, setActiveEvents, loading }: OptionProps) => {
	if (loading) return <LoadingButton />
	return (
		<button
			className={`${styles.button} ${isActive ? styles.clicked : ''} ${!isShown ? styles.hidden : ''}`}
			onClick={() => setActiveEvents(value)}>
			{title && <span className={styles.title}>{title}</span>}
		</button>
	)
}

export default Button
