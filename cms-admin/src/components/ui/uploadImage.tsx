import { CropIcon, SwapIcon } from '@/assets/icons'
import ImageCropper from '@/components/ui/cropImage'
import { statusUploadCode } from '@/constants'
import { PlusIcon, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
// eslint-disable-next-line import/named
import { FileRejection, useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

interface ImageUploaderProps {
  maxImages?: number
  onCompleteUpload: (links: string[], blobs: Blob[]) => void
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ maxImages = 8, onCompleteUpload }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [imageBlobs, setImageBlobs] = useState<Blob[]>([])
  const [swapIndex, setSwapIndex] = useState<number>(0)
  const hiddenFileInput = useRef<HTMLInputElement | null>(null)

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'image/gif': [],
      'image/svg+xml': []
    },
    onDrop: handleDrop,
    maxFiles: maxImages - imageUrls.length,
    disabled: imageUrls.length >= maxImages // Disable drop if max is reached
  })

  const isMaxImages = imageUrls.length >= maxImages

  function handleDrop(acceptedFiles: File[], rejectedFiles: FileRejection[]) {
    if (acceptedFiles.length > 0 && imageUrls.length < maxImages) {
      const validImages = acceptedFiles.filter((file) => file.type.startsWith('image/'))
      const newBlobs = validImages.map((file) => file)
      const newUrls = validImages.map((file) => URL.createObjectURL(file))

      if (validImages.length > 0) {
        setImageBlobs((prev) => {
          const updatedBlobs = [...prev, ...newBlobs].slice(0, maxImages)
          onCompleteUpload(imageUrls, updatedBlobs)
          return updatedBlobs
        })

        setImageUrls((prev) => {
          const updatedUrls = [...prev, ...newUrls].slice(0, maxImages)
          onCompleteUpload(updatedUrls, imageBlobs)
          return updatedUrls
        })
      }

      if (validImages.length < acceptedFiles.length) {
        const invalidFiles = acceptedFiles.filter((file) => !file.type.startsWith('image/'))
        invalidFiles.forEach((file) => toast.error(`${file.name} is not an image and was not uploaded.`))
      }
    }

    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ file, errors }) => {
        if (errors[0].message === statusUploadCode.FILE_TOO_LANRGE) {
          toast.error(`Failed to upload ${file.name}: File limit is less than 5MB`)
        } else if (errors[0].message === statusUploadCode.TOO_MANY_FILES) {
          toast.error(`Failed to upload ${file.name}: Maximum number of files is ${maxImages}`)
        } else {
          toast.error(`Failed to upload ${file.name}: ${errors.map((e) => e.message).join(', ')}`)
        }
      })
    }
  }

  const removeImage = (index: number) => {
    const newUrls = [...imageUrls]
    const newBlobs = [...imageBlobs]
    newUrls.splice(index, 1)
    newBlobs.splice(index, 1)
    setImageUrls(newUrls)
    setImageBlobs(newBlobs)
    onCompleteUpload(newUrls, newBlobs)
  }

  const handleCropComplete = (index: number, croppedBlob: Blob | null, croppedFileUrl: string) => {
    const newUrls = [...imageUrls]
    const newBlobs = [...imageBlobs]

    newUrls[index] = croppedFileUrl
    newBlobs[index] = croppedBlob as Blob

    setImageUrls(newUrls)
    setImageBlobs(newBlobs)

    onCompleteUpload(newUrls, newBlobs)
  }

  const handleSwapClick = (index: number) => {
    setSwapIndex(index)
    hiddenFileInput.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const newBlob = file
      const newUrl = URL.createObjectURL(file)

      const newUrls = [...imageUrls]
      const newBlobs = [...imageBlobs]
      newUrls[swapIndex] = newUrl
      newBlobs[swapIndex] = newBlob

      setImageUrls(newUrls)
      setImageBlobs(newBlobs)
      onCompleteUpload(newUrls, newBlobs)
    }
  }

  return (
    <div className='border-gray-dark text-gray-darker flex flex-col gap-2 overflow-hidden rounded-xl border border-solid p-2'>
      <div className={'grid grid-cols-3 items-center gap-2 overflow-hidden px-2 pt-5 sm:grid-cols-4 lg:gap-4'}>
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className='image-preview relative flex h-24 items-center justify-center rounded-xl border-2 border-solid border-gray-200 lg:h-36'
          >
            <img
              src={url}
              alt={`Uploaded ${index + 1}`}
              className='h-full w-full rounded-xl object-cover brightness-90'
            />
            <button
              onClick={() => removeImage(index)}
              className='absolute right-[-10px] top-[-10px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-black p-1 text-lg'
            >
              <X className='h-[20px] w-[20px] text-white' />
            </button>
            <div className='absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-5'>
              <ImageCropper
                src={url}
                onCropComplete={(blob, fileUrl) => handleCropComplete(index, blob, fileUrl)}
                trigger={
                  <button className='bg-gray-darker flex h-6 w-6 items-center justify-center rounded'>
                    <CropIcon className='h-4 w-4' />
                  </button>
                }
              />
              <button
                onClick={() => handleSwapClick(index)}
                className='bg-gray-darker flex h-6 w-6 items-center justify-center rounded'
              >
                <SwapIcon className='h-4 w-4' />
              </button>
              <input
                type='file'
                ref={hiddenFileInput}
                onChange={handleFileChange}
                className='hidden'
                accept='image/*'
              />
            </div>
          </div>
        ))}
        {!isMaxImages && (
          <div
            {...getRootProps()}
            className='flex h-24 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 lg:h-36'
          >
            <input {...getInputProps()} />
            <div className='text-center'>
              <PlusIcon className='h-4 w-4' />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUploader
