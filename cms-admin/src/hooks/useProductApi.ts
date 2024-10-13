import { createNewProductAction, getAllProductsAction } from '@/redux/action/productAction'
import { resetProductState, updateProductToStore } from '@/redux/slice/productSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const useProductApi = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data, isLoading, error } = useSelector((state: RootState) => state.products)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllProductsAction())
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff'
        }
      })
    }
    return () => {
      toast.dismiss()
    }
  }, [error])

  const handleSubmit = (data: FormData) => {
    dispatch(createNewProductAction(data))
      .then((data) => {
        if (data) {
          toast.success('Product created successfully', {
            style: {
              borderRadius: '10px',
              background: 'green',
              color: '#fff'
            }
          })
          setTimeout(() => {
            dispatch(updateProductToStore(data.payload))
            dispatch(resetProductState())
            navigate('/products')
          }, 1000)
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          style: {
            borderRadius: '10px',
            background: 'red',
            color: '#fff'
          }
        })
      })
  }

  return { isLoading, data, handleSubmit }
}

export default useProductApi
