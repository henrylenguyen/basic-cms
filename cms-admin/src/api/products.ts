import http from '@/api/http'

const productAPI = {
  getAllProuducts: http.get('/products'),
  createNewProduct: (data: FormData) => http.post('/products/create', data),
  uploadImages: (data: FormData) => http.post('/products/upload-images', data)
}
export default productAPI
