import { Express } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { bucket } from '../firebase'

export const uploadImages = async (files: Express.Multer.File[]): Promise<string[]> => {
  console.log('files:', files)
  const imageUrls: string[] = []

  for (const file of files) {
    const blob = bucket.file(`images/${uuidv4()}`)
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    })

    blobStream.end(file.buffer)

    await new Promise((resolve, reject) => {
      blobStream.on('finish', resolve)
      blobStream.on('error', reject)
    })

    // Lấy URL truy cập tệp
    const url = await blob.getSignedUrl({
      action: 'read', // Hoạt động là đọc
      expires: Date.now() + 24 * 60 * 60 * 1000 // Thời gian hết hạn 24 giờ
    })

    imageUrls.push(url[0])
  }

  return imageUrls
}
