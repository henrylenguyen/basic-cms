import { z } from 'zod'

const formSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required'
    })
    .min(2, {
      message: 'Title must be at least 2 characters.'
    }),
  description: z
    .string({
      required_error: 'Description is required'
    })
    .min(10, 'Description must be at least 10 characters'),
  images: z
    .array(z.instanceof(Blob, { message: 'Each image must be a file' }))
    .min(1, 'At least one image is required'),
  price: z.string({
    required_error: 'Price is required'
  }),
  productType: z.string().optional(),
  tags: z.array(z.string()).optional()
})

export default formSchema
