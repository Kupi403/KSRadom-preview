import { EventTimeType } from '@/components/Calendar/types'

export type OptionsButtonProps = {
	value: EventTimeType
	title: string
	isActive: boolean
	setActiveEvents: (type: EventTimeType) => void
	isShown?: boolean
	loading: boolean
}
