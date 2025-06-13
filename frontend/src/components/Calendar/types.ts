export type CalendarHeaderProps = {
	today: Date
	selectedYear: number
	selectedMonth: number
	setSelectedYear: React.Dispatch<React.SetStateAction<number>>
	setSelectedMonth: React.Dispatch<React.SetStateAction<number>>
	isLoading: boolean
}

export type CalendarGridProps = {
	currentMonth: Date
	events: CalendarEventData[]
	isLoading: boolean
}

export type CalendarDayProps = {
	dayNumber: string
	daySymbol: string
	isCurrentMonth: boolean
	isToday: boolean
	events: CalendarEventData[]
}

export type CalendarEventProps = {
	name: string
	startDate: string
	endDate: string | null
	isCurrentMonth: boolean
	onClick: () => void
}

export type CalendarEventData = {
	createdAt: string
	description: string | null
	documentId: string
	endTime: string | null
	id: number
	name: string
	publishedAt: string
	startDate: string
	endDate: string | null
	updatedAt: string
	place: CalendarPlaceData
}

export type CalendarEventResponse = {
	data: CalendarEventData[]
	meta?: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

export type CalendarPlaceData = {
	createdAt: string
	documentId: string
	id: number
	name: string
	publishedAt: string
	street: string
	buildingNumber: string
	city: string
	updatedAt: string
}

export enum EventTimeType {
	Upcoming = 'Nadchodzące',
	Past = 'Przeszłe',
}
