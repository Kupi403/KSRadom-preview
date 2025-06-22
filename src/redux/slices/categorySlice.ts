import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CategoryState {
	category: string | null
}

const initialState: CategoryState = {
	category: null,
}

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload
		},
	},
})

export const { setCategory } = categorySlice.actions

export default categorySlice.reducer
