import { cn } from '@/lib/utils'
import _ from 'lodash'
import { SearchIcon } from 'lucide-react'
import * as React from 'react'

interface ISearchProps {
  placeHolder?: string
  onSearch?: (value: string) => void
  className?: string
  onEnter?: (value: string) => void
  defaultValue?: string
}

const Search: React.FunctionComponent<ISearchProps> = ({
  placeHolder = 'Search ID...',
  onSearch,
  className,
  defaultValue,
  onEnter
}) => {
  const handleOnSearch = _.debounce((value: string) => {
    if (onSearch) {
      onSearch(value)
    }
  }, 400)
  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    if (e.key === 'Enter') {
      if (onEnter) {
        onEnter(value)
      }
    }
  }

  // Handle blur event
  const handleBlur = (value: string) => {
    if (onEnter) {
      onEnter(value)
    }
  }
  return (
    <div className={cn('relative h-full w-full', className)}>
      <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center gap-2 ps-3'>
        <SearchIcon className='size-4' />
        <div className='h-1/2 w-[1px] bg-gray-200' />
      </div>
      <input
        type='search'
        id='default-search'
        className={cn('shadow-1xl block w-full rounded-lg border border-gray-300 px-3 py-2.5 ps-12 text-sm')}
        placeholder={placeHolder}
        required
        onChange={(e) => handleOnSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={(e) => handleBlur(e.target.value)}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default Search
