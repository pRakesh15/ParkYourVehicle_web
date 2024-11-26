'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MoreVertical } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
interface MobileMenuProps {
    data: any;
    handelLogout: (value: any) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ data, handelLogout }) => {
    const router = useRouter();

    console.log(data)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                    <MoreVertical className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[280px] bg-zinc-800 text-white">
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                    <div className="flex-grow">
                        <nav className="flex flex-col space-y-4 mt-4">
                            <Link href="/" className="text-2xl font-bold text-blue-400">
                                ParkingHub
                            </Link>

                            <Link href="/search" className="text-gray-300 hover:text-blue-400">
                                Search Garage
                            </Link>
                            <Link href="/about" className="text-gray-300 hover:text-blue-400">
                                About Us
                            </Link>
                            {data?.user?.uid && (
                                <Link href="/settings" className="text-gray-300 hover:text-blue-400">
                                    Settings
                                </Link>
                            )}
                        </nav>
                    </div>
                    <div className="mt-auto pb-4">
                        {data?.user?.uid ? (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Avatar>
                                        <AvatarImage src="/User.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span>{data?.user?.email}</span>
                                </div>
                                <Button
                                    onClick={handelLogout}
                                    variant="ghost"
                                    className="text-red-400 hover:text-red-300 hover:bg-red-900"
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => router.push('/login')}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Login / Register
                            </Button>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu
