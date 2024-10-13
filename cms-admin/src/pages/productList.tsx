/* eslint-disable @typescript-eslint/no-empty-object-type */
import MultiSearch from '@/components/ui/multiSearch'
import TableContainer from '@/components/ui/table'
import { productColumns } from '@/constants/productModel'
import useProductApi from '@/hooks/useProductApi'
import { ProductInterface } from '@/types/productInterface'
import React, { useEffect, useState } from 'react'

interface IProductListPageProps {}

const ProductListPage: React.FunctionComponent<IProductListPageProps> = () => {
  const { isLoading, data }: { isLoading: boolean; data?: ProductInterface[] | undefined } = useProductApi() as {
    isLoading: boolean
    data?: ProductInterface[] | undefined
  }
  const [filteredData, setFilteredData] = useState(data)

  const handleSearchChange = (tags: string[]) => {
    if (tags.length === 0) {
      setFilteredData(data)
    } else {
      const filtered = (data ?? []).filter((item) => tags.every((tag) => (item.tags ?? []).includes(tag)))
      setFilteredData(filtered)
    }
  }
  useEffect(() => {
    if (data) {
      setFilteredData(data)
    }
  }, [data?.length])

  return (
    <div className='ml-[280px] flex h-full flex-1 flex-col gap-5 rounded-[15px] bg-white p-8'>
      <MultiSearch placeholder='search tags....' onSearchChange={handleSearchChange} />
      <TableContainer
        data={(filteredData as ProductInterface[]) ?? []}
        columns={productColumns}
        isLoading={isLoading}
      ></TableContainer>
    </div>
  )
}

export default ProductListPage
