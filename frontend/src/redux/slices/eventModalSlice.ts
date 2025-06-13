import { createSlice } from '@reduxjs/toolkit'
import { BlocksContent } from '@strapi/blocks-react-renderer'
export type PlaceType = {
	name: string
	city: string
	street: string
	buildingNumber?: string
	image: {
		url: string
	}
}
export type EventType = {
	name: string
	description: BlocksContent
	startDate: string
	endDate: string | null
	place: PlaceType
}

const initialState: {
	event: EventType | null
	isOpen: boolean
} = {
	event: null,
	isOpen: false,
}

const eventModalSlice = createSlice({
	name: 'eventModal',
	initialState,
	reducers: {
		openEventModal: (state, action) => {
			state.event = action.payload
			state.isOpen = true
		},
		closeEventModal: state => {
			state.event = null
			state.isOpen = false
		},
	},
})

export const { openEventModal, closeEventModal } = eventModalSlice.actions
export default eventModalSlice.reducer
