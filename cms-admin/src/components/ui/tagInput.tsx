import { X } from 'lucide-react'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface TagInputProps {
  availableTags: string[]
  name: string // Form name to bind the tags field
}

const TagInput: React.FC<TagInputProps> = ({ availableTags, name }) => {
  const { control, setValue, watch } = useFormContext()
  const selectedTags = watch(name) || [] // Watch form values to keep track of selected tags
  const [searchValue, setSearchValue] = useState('') // To track the search input value
  const [available, setAvailable] = useState(availableTags) // Available tags state
  const [isDropdownOpen, setDropdownOpen] = useState(false) // Toggle dropdown visibility

  // Handle selecting a tag
  const handleSelectTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setValue(name, [...selectedTags, tag]) // Add tag to form field
      setAvailable(available.filter((t) => t !== tag)) // Remove from available list
      setSearchValue('') // Clear the search input after selection
      setDropdownOpen(false) // Close dropdown after selection
    }
  }

  // Handle adding a new tag
  const handleAddNewTag = () => {
    if (searchValue && !selectedTags.includes(searchValue)) {
      setValue(name, [...selectedTags, searchValue]) // Add new tag
      setAvailable(available.filter((t) => t !== searchValue)) // Remove from available list
      setSearchValue('') // Clear the search input
      setDropdownOpen(true) // Keep dropdown open to allow further searches
    }
  }

  // Remove a tag
  const handleRemoveTag = (tag: string) => {
    setValue(
      name,
      selectedTags.filter((t: string) => t !== tag)
    ) // Remove tag from selected
    setAvailable([...available, tag]) // Add back to available list
  }

  // Filter tags based on search
  const filteredTags = available.filter((tag) => tag.toLowerCase().includes(searchValue.toLowerCase()))

  // Open dropdown when input is focused
  const handleInputFocus = () => {
    setDropdownOpen(true) // Open dropdown when input is focused
  }

  // Close dropdown after clicking outside or losing focus
  const handleInputBlur = () => {
    setTimeout(() => setDropdownOpen(false), 150) // Delay to allow click on dropdown items
  }

  // Handle key press for adding new tag
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault() // Prevent the default form submission
      handleAddNewTag() // Call add new tag function
    }
  }

  return (
    <div>
      <div className='relative'>
        <input
          type='text'
          placeholder='Enter or search tags'
          className='w-full rounded border px-3 py-2'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />

        {isDropdownOpen && (
          <div className='absolute z-10 mt-1 max-h-[200px] w-full overflow-y-auto rounded border border-gray-200 bg-white shadow-lg'>
            {filteredTags?.length > 0 ? (
              filteredTags.map((tag) => (
                <div
                  key={tag}
                  className='cursor-pointer p-4 hover:bg-gray-100'
                  onMouseDown={() => handleSelectTag(tag)} // Use mouse down to avoid dropdown closing before selection
                >
                  {tag}
                </div>
              ))
            ) : (
              <div className='px-4 py-2 text-gray-500'>No tags found. Press "Enter" to add "{searchValue}".</div>
            )}
          </div>
        )}
      </div>

      {/* Display selected tags */}
      <div className='mt-2 flex flex-wrap gap-2'>
        <Controller
          name={name}
          control={control}
          render={({ field: { value } }) => (
            <>
              {value?.map((tag: string) => (
                <div key={tag} className='flex items-center justify-between rounded bg-gray-200 py-2 pl-4 pr-2'>
                  <span>{tag}</span>
                  <button className='ml-2 text-red-500' onClick={() => handleRemoveTag(tag)}>
                    <X className='h-[12px] w-[12px]' />
                  </button>
                </div>
              ))}
            </>
          )}
        />
      </div>
    </div>
  )
}

export default TagInput
