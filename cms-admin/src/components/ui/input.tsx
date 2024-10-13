/* eslint-disable @typescript-eslint/no-empty-object-type */
import { cn } from '@/lib/utils'
import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === 'number') {
      if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== '.') {
        e.preventDefault()
      }
    }
  }

  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      onKeyDown={handleKeyPress}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export { Input }
