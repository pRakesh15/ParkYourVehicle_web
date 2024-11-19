'use client'
import React, { useEffect, useState } from 'react'
import { SearchGaragesQuery } from '../../../../../libs/Network/src/gql/generated'
import { Controller, Form, useFormContext, useWatch } from 'react-hook-form'
import { FormTypeBookSlot } from '@/libs/forms/bookSlot'
import { ImagePlus } from 'lucide-react'
import { DateRangeBookingInfo } from './DateRangeBookingInfo'
import { Label } from '@/components/ui/label'
import { Radio, RadioGroup } from '@headlessui/react'
import { IconTypes } from '@/components/molecules/IconTypes'
import { FormError } from './FormError'
import { HtmlLabel } from './HtmlLabel'
import Input from '../Input'
import { Button } from '@/components/ui/button'
import { toLocalISOString } from '@/libs/utils'
import { useTotalPrice } from './hook/price'
import { CostTitleValue } from './CostTitleValue'
import { ManageValet } from './ManageValet'


export const BookSlotPopup = ({
    garage,
}: {
    garage: SearchGaragesQuery['searchGarages'][0]
}) => {
    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useFormContext<FormTypeBookSlot>()

    const { startTime, endTime, type, valet } = useWatch<FormTypeBookSlot>()
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % garage.image.length)
        }, 5000) // Change image every 5 seconds

        return () => clearInterval(timer)
    }, [garage.image.length])
    const pricePerHour = garage.availableSlots.find(
        (slot) => slot.type === type
    )?.pricePerHour

    const totalPriceObject = useTotalPrice({
        pricePerHour,
    })

    const totalPrice =
        totalPriceObject.parkingCharge +
        totalPriceObject.valetChargeDropoff +
        totalPriceObject.valetChargePickup


    const [booking, setBooking] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <>
            <div className="grid gap-4 py-1">
                <div className="text-sm text-gray-300">{garage.address?.address}</div>

                {/* div for auto slide the images */}
                <div className="relative h-28 overflow-hidden rounded-lg">
                    {garage?.image?.length > 0 ? (
                        garage.image.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Garage image ${index + 1}`}
                                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full text-white">
                            <ImagePlus className='pr-1' />No image available
                        </div>
                    )}
                </div>

                <DateRangeBookingInfo startTime={startTime} endTime={endTime} />
                <Form>
                    <div className="flex flex-wrap gap-2 ">
                        <HtmlLabel className='text-white -mt-4' title="Slot type" error={errors.type?.message}>
                            <Controller
                                name="type"
                                control={control}
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <RadioGroup
                                            value={value || ''}
                                            onChange={onChange}
                                            className="flex w-full gap-2 "
                                            defaultValue={''}
                                        >
                                            {garage.availableSlots.map((slot) => (
                                                <div
                                                    key={slot.type}
                                                    className="flex flex-wrap items-center gap-2 bg-white text-black"
                                                >
                                                    <Radio key={slot.type} value={slot.type}>
                                                        {({ checked }) => (
                                                            <div
                                                                className={`cursor-default border-2 p-1 ${checked
                                                                    ? 'border-green-600 shadow-md'
                                                                    : 'border-yellow-200'
                                                                    }`}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    {slot.type ? IconTypes[slot.type] : null}
                                                                    <div>
                                                                        <span className="text-sm font-semibold">
                                                                            ₹{slot.pricePerHour}
                                                                        </span>
                                                                        /hr
                                                                    </div>
                                                                </div>

                                                                <div className="text-gray-600 text-sm">
                                                                    {slot.count} open
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Radio>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    )
                                }}
                            />
                        </HtmlLabel>
                        {!type ? <FormError /> : null}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="startDateTime" className="text-white">Start Date & Time</Label>
                            <Input id="startDateTime"
                                type="datetime-local"
                                className="bg-gray-800 text-white border-gray-700"
                                min={toLocalISOString(new Date()).slice(0, 16)}
                                {...register('startTime')}
                            />
                        </div>
                        <div className="flex flex-col space-y-1 mt-1">
                            <Label htmlFor="endDateTime" className="text-white">End Date & Time</Label>
                            <Input id="endDateTime"
                                className="bg-gray-800 text-white border-gray-700"
                                type="datetime-local"
                                min={toLocalISOString(new Date()).slice(0, 16)}
                                {...register('endTime')} />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="flex flex-col space-y-1 mt-1">
                            <Label htmlFor="vehicleNo" className="text-white">Vehicle Number</Label>
                            <Input id="vehicleNo" placeholder="Enter vehicle number EX:OD02 A1515" className="bg-gray-800 text-white border-gray-700"  {...register('vehicleNumber')} />
                        </div>
                        <div className="flex flex-col space-y-1 mt-1">
                            <Label htmlFor="mobileNo" className="text-white">Mobile Number</Label>
                            <Input id="mobileNo" type="tel" placeholder="Enter mobile number" className="bg-gray-800 text-white border-gray-700" {...register('phoneNumber')} />
                        </div>
                    </div>
                    <ManageValet garage={garage} />
                    {totalPriceObject ? (
                        <div className="mt-3">
                            <CostTitleValue
                                title="Parking"
                                price={totalPriceObject.parkingCharge}
                            />
                            <CostTitleValue
                                title="Valet Pickup"
                                price={totalPriceObject.valetChargePickup}
                            />
                            <CostTitleValue
                                title="Valet Dropoff"
                                price={totalPriceObject.valetChargeDropoff}
                            />

                            <CostTitleValue title="Total" price={totalPrice} />
                        </div>
                    ) : null}
                    <Button type="submit" className="bg-green-600 hover:bg-green-700 w-full">Book Now</Button>
                </Form>
            </div >
        </>

    )
}

