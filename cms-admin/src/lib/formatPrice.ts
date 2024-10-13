export const formatPrice = (price: number | string): string => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })

  return formatter.format(Number(price))
}
