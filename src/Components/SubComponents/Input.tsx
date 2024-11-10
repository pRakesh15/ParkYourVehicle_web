// components/Input.tsx
'use client'
import React, { forwardRef } from 'react'

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input
      ref={ref}
      {...props}
      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
    />
  )
)

Input.displayName = 'Input'

export default Input
