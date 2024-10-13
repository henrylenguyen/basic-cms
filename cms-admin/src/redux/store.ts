import { configureStore } from '@reduxjs/toolkit'
import ProductSlice from './slice/productSlice'

export const store = configureStore({
  reducer: {
    products: ProductSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
