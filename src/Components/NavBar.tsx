'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { MoreVertical, X, Home, Settings, HelpCircle, LogOut, User, ChevronDown, Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link'

export default function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)

  const menuItems = [
    { name: 'Home', icon: Home, link: '/' },
    { name: 'Settings', icon: Settings, link: '/' },
    { name: 'Help', icon: HelpCircle, link: '/' },
  ]

  //functions for signout and side bar...

  const handleLogout = () => {
    // Implement logout logic here
    signOut();
    setIsProfileOpen(false)
    setIsSidebarOpen(false)
  }

  const { data: sessionData, status } = useSession()

  return (
    <div>
      <nav className="bg-zinc-900 text-white p-2 sticky top-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">My Dark App</h1>

          {/* Desktop Menu */}
          {
            sessionData?.user?.uid ?
              (
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                >
                  {/* if the user is present then this button is visible  */}
                  <Menu className="h-6 w-6" />
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 text-red-600 hover:text-white rounded-md transition-colors">
                    <Link href={'/login'}>
                      Login
                    </Link>
                  </button>
                </div>
              )
          }
        </div>
      </nav>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-64 bg-zinc-800 text-white shadow-lg z-50"
          >
            <div className="p-4">
              <button
                onClick={toggleSidebar}
                className="absolute top-4 right-4 p-2 rounded-md hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-xl font-bold mb-6">Menu</h2>
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                      onClick={toggleSidebar}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {
              sessionData?.user?.uid ? (<div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-700">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden">
                    {sessionData?.user?.image ? (
                      <img
                        src={sessionData.user.image}
                        alt="User profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{sessionData?.user?.name}</p>
                    <p className="text-sm text-zinc-400">{sessionData?.user?.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 p-2 rounded-md hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>) : ('')
            }

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}