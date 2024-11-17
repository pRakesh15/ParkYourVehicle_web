// components/Input.tsx
'use client'
import React, { forwardRef } from 'react'

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input
      ref={ref}
      {...props}
      className="w-full px-3 py-[6px] text-white font-semibold border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 bg-black placeholder-gray-400"
    />
  )
)

Input.displayName = 'Input'

export default Input
