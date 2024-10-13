/* eslint-disable @typescript-eslint/no-empty-object-type */
import FormLayout from '@/components/layouts/formLayout'
import { useEffect, useState } from 'react'

interface ICreateProductPageProps {}

const CreateProductPage: React.FunctionComponent<ICreateProductPageProps> = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className='ml-[280px] flex h-full flex-1 rounded-[15px] bg-white p-8'>
      <FormLayout isLoading={loading} />
    </div>
  )
}

export default CreateProductPage
