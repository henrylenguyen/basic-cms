import Header from '@/components/layouts/header'
import { Toaster } from 'react-hot-toast'

interface IBaseLayoutProps {
  children: React.ReactNode
}

const BaseLayout: React.FunctionComponent<IBaseLayoutProps> = ({ children }) => {
  return (
    <main className='font-proxima text-light flex h-auto w-full overflow-x-hidden p-4'>
      <Header />
      {children}
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              border: '0px solid #ffffff',
              color: '#ffffff',
              background: 'linear-gradient(270deg, #5495FC 0%, #31D366 100%)'
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#60EC8E'
            }
          }
        }}
      />
    </main>
  )
}

export default BaseLayout
