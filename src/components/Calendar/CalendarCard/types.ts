import { CalendarPlaceData } from '@/components/Calendar/types'

export type CalendarCardProps = {
	startDate: Date
	endDate?: Date | null
	place: CalendarPlaceData
	description: string
	layout?: 'auto' | 'mobile'
	onClick?: () => void
}
export type CalendarSubtitleProps = {
	icon: JSX.Element
	subtitle: string
	text: string | null | undefined
	limitChar?: boolean
}
