import { formatPrice } from '@/lib/formatPrice'

export const productColumns = [
  {
    key: 'images',
    label: 'Images',
    render: (data: unknown) => {
      const image = (data as { imageUrls: string[] }).imageUrls[0]
      return (
        <div className='flex gap-2'>
          <img src={image} alt='product' className='h-[100px] w-[100px] rounded-md object-cover' />
        </div>
      )
    },
    columnWidth: '170'
  },
  {
    key: 'title',
    label: 'Title',
    sortable: true,
    columnWidth: '170'
  },
  {
    key: 'description',
    label: 'Description',
    columnWidth: '400',
    render: (data: unknown) => {
      return <div dangerouslySetInnerHTML={{ __html: (data as { description: string }).description }}></div>
    }
  },
  {
    key: 'price',
    label: 'Price',
    sortable: true,
    columnWidth: '100',
    render: (data: unknown) => {
      const priceData = data as { price: number | string }
      return <span>{formatPrice(priceData?.price)}</span>
    }
  },
  {
    key: 'productType',
    label: 'Product Type',
    sortable: true,
    columnWidth: '200'
  },
  {
    key: 'selectedTags',
    label: 'Tags',
    sortable: true,
    columnWidth: '100',
    render: (data: unknown) => {
      const tags = (data as { tags: string[] }).tags
      return <span>{tags.join(', ')}</span>
    }
  }
]
