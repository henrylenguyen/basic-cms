import { createNewProductAction, getAllProductsAction } from '@/redux/action/productAction'
import { handleError, handlePending } from '@/redux/handle'
import { getAllProductFulfilled } from '@/redux/handle/productHandle'
import { IProductState } from '@/redux/interface/productState'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IProductState = {
  data: [],
  isLoading: false,
  error: null
}

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.isLoading = false
      state.error = null
    },
    updateProductToStore: (state, action) => {
      state.data = [...state.data, action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAction.pending, handlePending)
      .addCase(getAllProductsAction.fulfilled, getAllProductFulfilled)
      .addCase(getAllProductsAction.rejected, handleError)
      .addCase(createNewProductAction.pending, handlePending)
      .addCase(createNewProductAction.rejected, handleError)
  }
})

export default ProductSlice.reducer
export const { resetProductState, updateProductToStore } = ProductSlice.actions
