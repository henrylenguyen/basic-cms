import Loader from '@/components/ui/loading'
import React from 'react'

export interface WithLoadingProps {
  isLoading: boolean
}

const Spinner: React.FC = () => (
  <div className='spinner flex h-[500px] w-full items-center justify-center'>
    <Loader />
  </div>
)

function withLoadingIndicator<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithLoadingComponent(props: P & WithLoadingProps) {
    const { isLoading, ...restProps } = props
    if (isLoading) {
      return <Spinner />
    }
    return <WrappedComponent {...(restProps as P)} />
  }
}

export default withLoadingIndicator
