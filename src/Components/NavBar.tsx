'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn)

  //write function for logout and check the user availability 
  const {data:sessionData,status}=useSession()
  const router = useRouter();
  const handleClick = () => {
    router.push('/login');
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">My Site</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300">Home</a>
          <a href="#" className="text-white hover:text-gray-300">About</a>
          <a href="#" className="text-white hover:text-gray-300">Services</a>
          <a href="#" className="text-white hover:text-gray-300">Contact</a>
        </div>
        
        {/* Login/Logout Button */}
       
        {
            sessionData?.user?.uid?(
                <button
                onClick={()=>signOut()}
                className="hidden md:block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            ): <button
            onClick={handleClick}
            className="hidden md:block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        }
        
        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <a href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-700">Home</a>
          <a href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-700">About</a>
          <a href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-700">Services</a>
          <a href="#" className="block py-2 px-4 text-sm text-white hover:bg-gray-700">Contact</a>
          <button
            onClick={toggleLogin}
            className="block w-full text-left py-2 px-4 text-sm text-white hover:bg-gray-700"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      )}
    </nav>
  )
}