/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortingFn } from '@tanstack/react-table'

// Hàm sắp xếp cho văn bản
const sortTextFn: SortingFn<any> = (rowA, rowB, columnId) => {
  const textA = rowA?.original[columnId]?.toString().toLowerCase() || ''
  const textB = rowB?.original[columnId]?.toString().toLowerCase() || ''
  return textA.localeCompare(textB) // A-Z sorting
}

// Hàm sắp xếp cho số
const sortNumberFn: SortingFn<any> = (rowA, rowB, columnId) => {
  const numA = rowA?.original[columnId]
  const numB = rowB?.original[columnId]
  return numA - numB // Small to large
}

// Hàm sắp xếp cho ngày tháng
const sortDateFn: SortingFn<any> = (rowA, rowB, columnId) => {
  const dateA = new Date(rowA?.original[columnId])
  const dateB = new Date(rowB?.original[columnId])
  return dateA.getTime() - dateB.getTime() // Old to new
}

export { sortDateFn, sortNumberFn, sortTextFn }
