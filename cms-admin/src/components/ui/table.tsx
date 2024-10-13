import Nodata from '@/assets/images/no-value.svg'
import SortAsc from '@/assets/images/sort_asc.svg'
import SortDefault from '@/assets/images/sort_both.svg'
import SortDesc from '@/assets/images/sort_desc.svg'
import withLoadingIndicator from '@/HOC/withLoading'
import { sortDateFn, sortNumberFn, sortTextFn } from '@/lib/sortFn'
import { ProductInterface } from '@/types/productInterface'
import { ColumnModel } from '@/types/table'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'

interface TableProps<T> {
  data: T[]
  columns: ColumnModel[]
}
const TableContainer: React.FC<TableProps<ProductInterface>> = ({ columns, data }) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const flatData = useMemo<ColumnDef<ProductInterface, unknown>[]>(() => {
    const dataColumns =
      columns?.map((columnModel: ColumnModel) => {
        const { key, label, sortable, render, columnWidth } = columnModel
        const sortType = columnModel.sortType ?? 'text'
        let sortingFn

        // Kiểm tra loại sắp xếp cho cột
        if (sortType === 'text') {
          sortingFn = sortTextFn
        } else if (sortType === 'number') {
          sortingFn = sortNumberFn
        } else if (sortType === 'date') {
          sortingFn = sortDateFn
        }
        return {
          accessorKey: key,
          header: () => (
            <div>
              <span>{label}</span>
            </div>
          ),
          cell: render
            ? (info: { row: { original: unknown } }) => render(info.row.original)
            : (info: { getValue: () => unknown }) => info.getValue(),
          sortingFn: sortable ? sortingFn : undefined,
          size: columnWidth ? parseInt(columnWidth, 10) : 150
        }
      }) || []

    return dataColumns
  }, [columns, data])

  const table = useReactTable({
    data,
    columns: flatData,
    state: {
      sorting
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onSortingChange: setSorting
  })

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-4'>
        <table className='min-h-[500px] w-full'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className='flex justify-between'>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...(header.column.getCanSort() && header.column.columnDef.sortingFn
                          ? {
                              className: 'cursor-pointer flex justify-between',
                              onClick: header.column.getToggleSortingHandler()
                            }
                          : {})}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && header.column.columnDef.sortingFn && (
                          <div className='flex-shrink-0'>
                            {header.column.getIsSorted() === 'asc' && <img src={SortAsc} alt='sort-asc' />}
                            {header.column.getIsSorted() === 'desc' && <img src={SortDesc} alt='sort-desc' />}
                            {header.column.getIsSorted() === false && <img src={SortDefault} alt='sort-default' />}
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize()
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel()?.rows?.length === 0 && (
              <div className='flex h-[500px] w-full flex-col items-center justify-center'>
                <img src={Nodata} alt='no-data' />
                <span className='text-[20px] font-bold'>No data</span>
              </div>
            )}
          </tbody>
        </table>
        <div className='flex items-center gap-4'>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className='rounded-lg border border-solid border-gray-200 p-1'
          >
            {[10, 20, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>Records Per Page</span>
        </div>
      </div>
    </div>
  )
}

export default withLoadingIndicator(TableContainer)
