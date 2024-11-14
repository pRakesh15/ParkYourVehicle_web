import { clsx, type ClassValue } from "clsx"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const toLocalISOString=(date:Date):string=>{
  const tzoffset=date.getTimezoneOffset()*60000

  const localISOTime=new Date(date.getTime()-tzoffset).toISOString()

  return localISOTime;
}


export type ViewState={
  latitude:number,
  longitude:number,
  zoom?:number
}

export type BaseComponent = {
  children?: ReactNode
  className?: string
}

