import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CalendarEventData } from '@/components/Calendar/types'

type CalendarState = {
	events: CalendarEventData[]
}

const initialState: CalendarState = {
	events: [],
}

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setCalendarEvents: (state, action: PayloadAction<CalendarEventData[]>) => {
			state.events = action.payload
		},
	},
})

export const { setCalendarEvents } = calendarSlice.actions
export default calendarSlice.reducer
