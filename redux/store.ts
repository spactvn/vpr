import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import NFTReducer from './slices/nftSlice'

export const store = configureStore({
	reducer: {
		nft: NFTReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
