import productAPI from '@/api/products'
import { Editor } from '@tinymce/tinymce-react'
import React from 'react'

interface IRichEditorProps {
  onChange: (value: string) => void
}

const RichEditor: React.FunctionComponent<IRichEditorProps> = ({ onChange }) => {
  // Hàm xử lý upload ảnh
  const handleImageUpload = async (blobInfo, success, failure) => {
    const formData = new FormData()
    formData.append('images', blobInfo.blob())

    try {
      const res = await productAPI.uploadImages(formData)

      if (res.status === 201) {
        const imageUrl = res.data.data[0]
        console.log('Image URL:', imageUrl)
        success(imageUrl)
      } else {
        failure('Upload failed with status: ' + res.status)
      }
    } catch (error) {
      console.error('Upload error:', error)
      failure(error.message) // TinyMCE sẽ hiển thị lỗi
    }
  }

  return (
    <Editor
      apiKey='z6h8g9ewc0zgc3wkw458u9szwmgkftn94n2pzgssovuc0xyv' // API key của TinyMCE
      init={{
        plugins: ['image', 'media', 'link', 'lists', 'table', 'visualblocks', 'wordcount'],
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        automatic_uploads: true,
        images_upload_handler: handleImageUpload,
        file_picker_types: 'image'
      }}
      onEditorChange={(content) => {
        onChange(content)
      }}
    />
  )
}

export default RichEditor
