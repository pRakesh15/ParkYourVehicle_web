'use client'
import { z } from 'zod'
import { SlotType } from '../../../../libs/Network/src/gql/generated'
import { toLocalISOString } from '../utils';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

const minMaxTuple = z.tuple([z.number(), z.number()]);

export const formSchemaSearchGarage = z.object({
    //validate time filter
    startTime: z.string(),
    endTime: z.string(),
    //validate location filter..
    locationFilter: z.object({
        ne_lat: z.number(),
        ne_lng: z.number(),
        sw_lat: z.number(),
        sw_lng: z.number(),
    }),

    //validate slotType...
    type: z.nativeEnum(SlotType).array(),

    pricePerHour: minMaxTuple.optional(),
    height: minMaxTuple.optional(),
    width: minMaxTuple.optional(),
    length: minMaxTuple.optional(),

    //pagination validation...
    skip: z.number().optional(),
    take: z.number().optional(),

})

export type FormTypeSearchGarage = z.infer<typeof formSchemaSearchGarage>

const isStartTimeValid = (data: FormTypeSearchGarage) => {
    const startDate = new Date(data.startTime)
    const currentDate = new Date()

    return startDate > currentDate
}

const isEndTimeValid=(data:FormTypeSearchGarage)=>{
    const startDate=new Date(data.startTime)
    const endDate=new Date(data.endTime)

    return endDate>startDate
}

formSchemaSearchGarage.refine(isStartTimeValid,{
    message:'start time should be grater than current time',
    path:['startTime']
})
.refine(isEndTimeValid,{
    message:'End time should be grater than start time',
    path:['endTime']
})


export const getCurrentTimeAndOneHourLater=()=>{
    const startTime=new Date()

    startTime.setMinutes(startTime.getMinutes()+5)

    const endTime=new Date(startTime)
    endTime.setHours(endTime.getHours()+1)

    return{
        startTime:toLocalISOString(startTime).slice(0,16),
        endTime:toLocalISOString(endTime).slice(0,16),
    }
}

export const AllSlotTypes = [
    SlotType.Bicycle,
    SlotType.Bike,
    SlotType.Car,
    SlotType.Heavy,
  ]


  export const formDefaultValuesSearchGarages: DefaultValues<FormTypeSearchGarage> =
  {
    pricePerHour: [0, 200],
    width: [0, 20],
    height: [0, 100],
    length: [0, 100],
    type: AllSlotTypes.sort(),
  }

export const FormProviderSearchGarage = ({
  children,
}: {
  children: ReactNode
}) => {
  const { startTime, endTime } = getCurrentTimeAndOneHourLater()
  const methods = useForm<FormTypeSearchGarage>({
    resolver: zodResolver(formSchemaSearchGarage),
    defaultValues: {
      ...formDefaultValuesSearchGarages,
      startTime,
      endTime,
    },
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

