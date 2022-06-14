import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// declaring the types for our state
export type NFTState = {
	isSellSuccess: boolean
}

const initialState: NFTState = {
	isSellSuccess: false,
}

export const NFTSlice = createSlice({
	name: 'NFT',
	initialState,
	reducers: {
		setSellSuccess: (state, action) => {
			state.isSellSuccess = action.payload as boolean
		},
	},
})

export const { setSellSuccess } = NFTSlice.actions

// export const selectCount = (state: RootState) => state.NFT.value

export default NFTSlice.reducer
