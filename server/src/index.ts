// src/index.ts
import cors from 'cors' // Thêm import cho cors
import express from 'express'
import productRoutes from './routes/productRoutes'

const app = express()
const PORT = process.env.PORT || 1812

// Sử dụng cors cho tất cả các đường dẫn
app.use(cors())

app.use(express.json())
app.use('/api/v1/products', productRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
