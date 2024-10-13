import { Request, Response } from 'express'
import { db } from '../firebase'
import { Product } from '../models/productModel'
import { uploadImages } from '../services/uploadService'
import createResponse from '../utils/dataResponse'

export const uploadImage = async (req: Request, res: Response): Promise<Response> => {
  console.log('req:', req.files)
  try {
    const files = req.files as Express.Multer.File[]
    console.log('files:', files)

    if (!files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json(createResponse(400, null, 'No files uploaded'))
    }

    const imageUrls = await uploadImages(files)
    console.log('imageUrls:', imageUrls)
    return res.status(201).json(createResponse(201, imageUrls, 'Images uploaded successfully'))
  } catch (error) {
    return res.status(500).json(createResponse(500, null, error.message))
  }
}

export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  console.log('req body:', req.body)
  console.log('req files:', req.files)
  try {
    const { title, price, productType, tags, description } = req.body
    console.log('description:', description)
    const files = req.files as Express.Multer.File[]

    if (!files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json(createResponse(400, null, 'No images uploaded'))
    }

    const imageUrls = await uploadImages(files)

    const product: Product = {
      imageUrls,
      title,
      price: Number(price),
      productType: productType || '',
      tags: tags ? JSON.parse(tags) : [],
      description
    }

    const docRef = await db.collection('products').add(product)

    return res.status(201).json(createResponse(201, { id: docRef.id, ...product }, 'Product created successfully'))
  } catch (error) {
    return res.status(500).json(createResponse(500, null, error.message))
  }
}
export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const snapshot = await db.collection('products').get()
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return res.status(200).json(createResponse(200, products, 'Products retrieved successfully'))
  } catch (error) {
    return res.status(500).json(createResponse(500, null, error.message))
  }
}

export const getSingleProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const doc = await db.collection('products').doc(req.params.id).get()
    if (!doc.exists) {
      return res.status(404).json(createResponse(404, null, 'Product not found'))
    }
    return res.status(200).json(createResponse(200, { id: doc.id, ...doc.data() }, 'Product retrieved successfully'))
  } catch (error) {
    return res.status(500).json(createResponse(500, null, error.message))
  }
}

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, price, productType, tags, description } = req.body
    const files = req.files as Express.Multer.File[]

    const imageUrls: string[] = files.length > 0 ? await uploadImages(files) : []

    const updatedProduct: Partial<Product> = {
      ...(title && { title }),
      ...(price && { price: Number(price) }),
      ...(productType && { productType }),
      ...(tags && { tags: JSON.parse(tags) }),
      ...(description && { description }),
      ...(imageUrls.length > 0 && { imageUrls })
    }

    await db.collection('products').doc(req.params.id).update(updatedProduct)
    return res
      .status(200)
      .json(createResponse(200, { id: req.params.id, ...updatedProduct }, 'Product updated successfully'))
  } catch (error) {
    return res.status(500).json(createResponse(500, null, error.message))
  }
}

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    await db.collection('products').doc(req.params.id).delete()
    return res.status(200).json(createResponse(200, null, 'Product deleted successfully'))
  } catch (error) {
    return res.status(500).json(createResponse(500, null, error.message))
  }
}
