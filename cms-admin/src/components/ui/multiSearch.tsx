import React, { useState } from 'react'

interface MultiSearchProps {
  placeholder?: string
  onSearchChange: (searchTags: string[]) => void
}

const MultiSearch: React.FC<MultiSearchProps> = ({ placeholder = 'Search...', onSearchChange }) => {
  const [searchTags, setSearchTags] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const updatedTags = [...searchTags, inputValue.trim()]
      setSearchTags(updatedTags)
      onSearchChange(updatedTags) // Pass the updated tags to the parent
      setInputValue('')
    }
  }

  const removeTag = (indexToRemove: number) => {
    const updatedTags = searchTags.filter((_, index) => index !== indexToRemove)
    setSearchTags(updatedTags)
    onSearchChange(updatedTags) // Pass the updated tags to the parent
  }

  return (
    <div className='flex max-w-xl flex-wrap items-center rounded-md border border-gray-300 p-2'>
      {searchTags.map((tag, index) => (
        <div key={index} className='m-1 flex items-center rounded-md bg-gray-200 px-2 py-1'>
          <span>{tag}</span>
          <button
            onClick={() => removeTag(index)}
            className='ml-2 cursor-pointer border-none bg-transparent text-gray-500 hover:text-gray-800 focus:outline-none'
          >
            X
          </button>
        </div>
      ))}
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className='flex-1 border-none px-2 py-1 outline-none'
      />
    </div>
  )
}

export default MultiSearch
