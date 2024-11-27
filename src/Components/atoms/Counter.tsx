'use client'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

type Props = {}

const Counter = (props: Props) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
      })
    return (
        <div ref={ref}  className='w-full p-10 flex justify-center'>
            <div className=' h-44 bg-gray-900 w-full  rounded-lg  flex justify-between'>
                <div className='w-1/2 flex justify-center items-center ml-10 '>
                    <p className='text-3xl font-bold'>
                        Welcome to our state-of-the-art parking facility. We offer secure, convenient, and
                         <span className="text-gray-500"> accessible parking solutions for all your needs.</span>
                    </p>

                </div>
                <div className='w-1/2 flex justify-center items-center'>
                    <div className="text-center flex-1">
                        <div className="text-4xl font-bold text-blue-600">
                            {inView && (
                                <CountUp
                                    end={5}
                                    duration={2.5}
                                    separator=","
                                />
                            )}
                        </div>
                        <p className="mt-2 text-gray-600">Number of Garages</p>
                    </div>
                    {/* Vertical divider */}
                    <div className="w-px bg-red-700 mx-4 h-24"></div>
                    <div className="text-center flex-1">
                        <div className="text-4xl font-bold text-green-600">
                            {inView && (
                                <CountUp
                                    end={237}
                                    duration={2.5}
                                    separator=","
                                />
                            )}
                        </div>
                        <p className="mt-2 text-gray-600">Vehicles Currently Parked</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Counter