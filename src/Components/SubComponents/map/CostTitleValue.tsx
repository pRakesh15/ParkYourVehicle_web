import { ReactNode } from 'react'

export const CostTitleValue = ({
  title,
  price,
}: {
  title: string
  price: ReactNode
}) => {
  if (!price) return null
  return (
    <div className="flex justify-between text-sm font-semibold">
      <div>{title}</div>
      <div className='text-green-700'>₹{price}</div>
    </div>
  )
}
