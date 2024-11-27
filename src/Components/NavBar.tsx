'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MobileMenu from './atoms/MobileMenu'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would normally come from your auth state

  const router = useRouter();

  //functions for signout and side bar...

  const handleLogout = () => {
    // Implement logout logic here
    signOut();

  }

  const { data: sessionData, status } = useSession()

  // console.log(sessionData)


  return (
    <nav className="flex items-center justify-between p-3 bg-transparent shadow-md sticky top-0 z-50 ">
      {/* Left section - Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ParkingHub
        </Link>
      </div>

      {/* Middle section - Search and About Us */}
      <div className="hidden md:flex items-center space-x-4">

        <Link href="/search" className="text-white-600 hover:text-blue-600">
          Search Garage
        </Link>

        {sessionData?.user?.uid ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer h-8 w-8">
                <AvatarImage src="/User.png" alt="@PH" className='bg-white' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-zinc-900 text-white'>
              <DropdownMenuItem>
                <span>{sessionData?.user?.email}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button className='rounded-3xl bg-zinc-800 border border-white ' onClick={() => router.push('/login')}>Login </Button>
        )}
      </div>

      {/* Right section - Login/Register or Avatar */}
      <div className="md:hidden">
        <MobileMenu data={sessionData} handelLogout={handleLogout} />
      </div>
    </nav>
  )
}

export default Navbar

