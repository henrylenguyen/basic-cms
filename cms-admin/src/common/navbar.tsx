import { HomeIcon, List, PlusIcon } from 'lucide-react'

export const navLinks = [
  { to: '/', label: 'Home', icon: <HomeIcon className='h-4 w-4' /> },
  { to: '/create-product', label: 'Create Product', icon: <PlusIcon className='h-4 w-4' /> },
  { to: '/products', label: 'Product Lists', icon: <List className='h-4 w-4' /> }
]
