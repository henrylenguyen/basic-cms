import BaseLayout from '@/components/layouts/baseLayout'
import CreateProductPage from '@/pages/createProduct'
import HomePage from '@/pages/homepage'
import ProductListPage from '@/pages/productList'
import { useRoutes } from 'react-router-dom'

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/create-product',
      element: <CreateProductPage />
    },
    {
      path: '/products',
      element: <ProductListPage />
    }
  ])

  return <BaseLayout>{routes}</BaseLayout>
}

export default App
