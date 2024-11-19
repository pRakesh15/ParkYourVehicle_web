'use client'
import { ReactNode } from "react";
import { Switch as HUISwitch } from '@headlessui/react'


export interface Switch2Props {
    label: ReactNode
    children?: ReactNode
    checked: boolean
    onChange: (checked: boolean) => void
    className?: string
}

export const Switch = ({
    label,
    children,
    checked,
    onChange,
    className,
}: Switch2Props) => {
    return (
        <div className="flex">
            <div>{label}</div>
            <HUISwitch
                checked={checked}
                onChange={onChange}
                className={`group relative flex h-6 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none 
    ${checked ? "bg-green-50 " : ""}`}
            >
                <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block size-4 translate-x-0 rounded-full shadow-lg ring-0 transition duration-200 ease-in-out 
      ${checked ? "translate-x-7 bg-green-700" : "bg-white"}`}
                />
            </HUISwitch>

        </div>)
}