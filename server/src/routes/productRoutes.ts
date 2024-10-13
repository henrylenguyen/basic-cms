import { Router } from 'express'
import multer from 'multer'
import * as productController from '../controller/productController'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/create', upload.array('images'), productController.createProduct)
router.post('/upload-images', upload.array('images'), productController.uploadImage)
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getSingleProduct)
router.put('/:id', upload.array('images'), productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

export default router
