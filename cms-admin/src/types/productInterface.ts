export interface ProductInterface {
  title: string
  description: string
  images: File[] | Blob[]
  price: string
  productType?: string
  tags?: string[]
}
