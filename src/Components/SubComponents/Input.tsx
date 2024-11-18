// components/Input.tsx
'use client'
import React, { forwardRef } from 'react'

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input
  ref={ref}
  {...props}
  className="w-full px-4 py-1.5 text-gray-900 font-medium border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-blue-400 bg-white placeholder-gray-500"
/>
  )
)

Input.displayName = 'Input'

export default Input
