import { IProductState } from '@/redux/interface/productState'
import { PayloadAction } from '@reduxjs/toolkit'

export const getAllProductFulfilled = (state: IProductState, action: PayloadAction<IProductState>) => {
  state.isLoading = false
  state.error = null
  state.data = action.payload.data
}
