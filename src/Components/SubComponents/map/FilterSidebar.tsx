import { formDefaultValuesSearchGarages, FormTypeSearchGarage } from '@/libs/forms/searchGarages'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { IconFilter } from '@tabler/icons-react'
import { PulsingDot } from './Dot'
import { FilterHeading } from './FilterHeading'
import { ToggleButton, ToggleButtonGroup } from './ToggleButtonGroup'
import { IconTypes } from '@/components/molecules/IconTypes'
import { RangeSlider } from './RangeSlider'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'

export const FilterSidebar = () => {
    const [open, setOpen] = useState(false)

    const {
        control,
        reset,
        getValues,
        formState: { dirtyFields },
    } = useFormContext<FormTypeSearchGarage>()
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    onClick={() => setOpen(true)}
                    className=" bg-red-600 hover:bg-red-500 flex"
                >
                    <IconFilter className="stroke-1.5 text-black" /> <span className='text-black font-semibold mt-1'>Filter</span>
                    {Object.values(dirtyFields).length ? <PulsingDot /> : null}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-1 bg-zinc-800 text-white">
                <div className="flex flex-col items-start gap-3 m-3">
                    {/* controller filter for vehicle wise like car heavy etc */}

                    <Controller
                        name='type'
                        control={control}
                        render={({
                            field: { value = [], onChange },
                            fieldState: { isDirty },
                            formState: { defaultValues },
                        }) => {
                            return (
                                <div>
                                    <FilterHeading dirty={isDirty} title="Vehicle type" />
                                    <ToggleButtonGroup
                                        value={value}
                                        onChange={(_, value) => {
                                            onChange(value.sort());
                                        }}
                                        aria-label="Vehicle type"
                                    >
                                        {defaultValues?.type?.map((val) => {
                                            if (!val) return null;
                                            return (
                                                <ToggleButton
                                                    key={val}
                                                    value={val}
                                                    selected={value.includes(val)} 
                                                >
                                                    {IconTypes[val]} 
                                                </ToggleButton>
                                            );
                                        })}
                                    </ToggleButtonGroup>
                                </div>
                            )
                        }}
                    />
                    {/* controller filter for price per hour wise like car heavy etc */}
                    <Controller
                        name="pricePerHour"
                        control={control}
                        render={({
                            field: { value, onChange },
                            fieldState: { isDirty },
                            formState: { defaultValues },
                        }) => {
                            return (
                                <div className="w-full">
                                    <FilterHeading dirty={isDirty} title="Price per hour" />
                                    <RangeSlider
                                        min={defaultValues?.pricePerHour?.[0]}
                                        max={defaultValues?.pricePerHour?.[1]}
                                        // max={200}
                                        value={value}
                                        onChange={onChange}
                                        valueLabelFormat={(sliderValue) =>
                                            `$ ${sliderValue.toLocaleString()}`
                                        }
                                        step={5}
                                    />
                                </div>
                            )
                        }}
                    />
                    <Controller
                        name="width"
                        control={control}
                        render={({
                            field: { value, onChange },
                            fieldState: { isDirty },
                            formState: { defaultValues },
                        }) => {
                            return (
                                <div className="w-full">
                                    <FilterHeading dirty={isDirty} title="Width" />
                                    <RangeSlider
                                        min={defaultValues?.width?.[0]}
                                        max={defaultValues?.width?.[1]}
                                        value={value}
                                        onChange={onChange}
                                        valueLabelFormat={(sliderValue) =>
                                            `${sliderValue.toLocaleString()} ft`
                                        }
                                        step={2}
                                    />
                                </div>
                            )
                        }}
                    />
                    <Controller
                        name="height"
                        control={control}
                        render={({
                            field: { value, onChange },
                            fieldState: { isDirty },
                            formState: { defaultValues },
                        }) => {
                            return (
                                <div className="w-full">
                                    <FilterHeading dirty={isDirty} title="Height" />
                                    <RangeSlider
                                        min={defaultValues?.height?.[0]}
                                        max={defaultValues?.height?.[1]}
                                        value={value}
                                        onChange={onChange}
                                        valueLabelFormat={(sliderValue) =>
                                            `${sliderValue.toLocaleString()} ft`
                                        }
                                        step={2}
                                    />
                                </div>
                            )
                        }}
                    />
                    <Controller
                        name="length"
                        control={control}
                        render={({
                            field: { value, onChange },
                            fieldState: { isDirty },
                            formState: { defaultValues },
                        }) => {
                            return (
                                <div className="w-full">
                                    <FilterHeading dirty={isDirty} title="Length" />
                                    <RangeSlider
                                        min={defaultValues?.length?.[0]}
                                        max={defaultValues?.length?.[1]}
                                        value={value}
                                        onChange={onChange}
                                        valueLabelFormat={(sliderValue) =>
                                            `${sliderValue.toLocaleString()} ft`
                                        }
                                        step={5}
                                    />
                                </div>
                            )
                        }}
                    />
                    <Button
                    
                        onClick={() =>
                            reset({ ...getValues(), ...formDefaultValuesSearchGarages })
                        }
                        disabled={!Object.values(dirtyFields).length}
                    >
                        Reset
                    </Button>

                </div>
            </PopoverContent>
        </Popover>

    )
}




