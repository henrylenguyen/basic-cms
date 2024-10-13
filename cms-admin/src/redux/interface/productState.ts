import { ProductInterface } from '@/types/productInterface'

export interface IProductState {
  data: ProductInterface[]
  isLoading: boolean
  error: string | null
}
