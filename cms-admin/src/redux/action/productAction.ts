import productAPI from '@/api/products'
import httpStatus from '@/constants/httpStatusCode'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getAllProductsAction = createAsyncThunk('product/getAllProductsAction', async () => {
  const response = await productAPI.getAllProuducts
  if (response.status === httpStatus.SUCCESS) {
    return response.data
  }
})

export const createNewProductAction = createAsyncThunk('product/createNewProductAction', async (data: FormData) => {
  const response = await productAPI.createNewProduct(data)
  if (response.status === httpStatus.CREATED) {
    return response.data.data
  }
})
