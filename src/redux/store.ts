import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './slices/categorySlice'
import calendarReducer from './slices/calendarSlice'
import eventModalReducer from './slices/eventModalSlice'

export const store = configureStore({
	reducer: {
		category: categoryReducer,
		calendar: calendarReducer,
		eventModal: eventModalReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
