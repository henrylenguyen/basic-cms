import formSchema from '@/common/formSchema'
import { mockProductType } from '@/common/mockProductType'
import { mockTag } from '@/common/mockTag'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import RichEditor from '@/components/ui/richEditor'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import TagInput from '@/components/ui/tagInput'
import ImageUploader from '@/components/ui/uploadImage'
import withLoadingIndicator from '@/HOC/withLoading'
import useProductApi from '@/hooks/useProductApi'
import { ProductInterface } from '@/types/productInterface'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFormLayoutProps {}

const FormLayout: React.FunctionComponent<IFormLayoutProps> = () => {
  const { handleSubmit, isLoading } = useProductApi()
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  const onSubmit = (data: ProductInterface) => {
    console.log('data:', data)
    const formData = new FormData()

    if (data.productType) {
      formData.append('productType', data.productType)
    }
    if (data.tags?.length ?? 0 > 0) {
      formData.append('tags', JSON.stringify(data.tags))
    }
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('price', data.price)

    if (data.images && Array.isArray(data.images)) {
      data.images.forEach((file) => {
        formData.append('images', file)
      })
    }

    handleSubmit(formData)
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='flex h-full w-full flex-col gap-5'>
        <div className='flex gap-5'>
          <div className='left-form flex w-[70%] flex-col gap-5'>
            <FormField
              control={methods.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder='Tile of product' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <RichEditor onChange={(value: string) => field.onChange(value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Media *</FormLabel>
                  <FormControl>
                    <ImageUploader
                      onCompleteUpload={(url, blob) => {
                        console.log('url:', url)
                        field.onChange(blob)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='right-form flex w-[30%] flex-col gap-5'>
            <FormField
              control={methods.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price *</FormLabel>
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name='productType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product type </FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className='w-full border border-solid border-gray-200'>
                        <SelectValue placeholder='Select Product Type' />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProductType?.map((item) => (
                          <SelectItem key={item.id} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-col gap-2'>
              <span className='block text-sm font-medium text-gray-700'>Tags</span>
              <TagInput name='tags' availableTags={mockTag} />
            </div>
          </div>
        </div>
        <Button type='submit' disabled={isLoading}>
          {isLoading ? (
            <div role='status'>
              <svg
                aria-hidden='true'
                className='h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default withLoadingIndicator(FormLayout)
