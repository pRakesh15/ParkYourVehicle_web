'use client'
import React, { useCallback } from 'react'
import { Map } from './map/Map'
import { Panel } from './map/Panel'
import { DefaultZoomControls } from './map/ZoomControls'
import { ViewStateChangeEvent } from 'react-map-gl'
import { initialView } from '@/libs/constants'
import { SearchPlaceBox } from './map/SearchPlaceBox'
import { useFormContext } from 'react-hook-form'
import { FormTypeSearchGarage } from '@/libs/forms/searchGarages'
import {  IconArrowRight } from '@tabler/icons-react'
import { IconType } from '../molecules/IconTypes'
import Input from './Input'
import { toLocalISOString } from '@/libs/utils'
import { ShowGarages } from './map/ShowGarages'
import { FilterSidebar } from './map/FilterSidebar'

type Props = {}

export const SearchPage = (props: Props) => {

  const { register, setValue, watch } = useFormContext<FormTypeSearchGarage>()

  const formData = watch()

  // console.log(formData)

  const handelMapChange = useCallback(
    (target: ViewStateChangeEvent['target']) => {
      const bound = target.getBounds()
      const locationFilter = {
        ne_lat: bound?.getNorthEast().lat || 0,
        ne_lng: bound?.getNorthEast().lng || 0,
        sw_lat: bound?.getSouthWest().lat || 0,
        sw_lng: bound?.getSouthWest().lng || 0,
      }
      //   console.log('locationFilter',locationFilter)
      setValue('locationFilter', locationFilter)
    },
    [setValue],
  )
  return (
    <Map
      onLoad={(e) => handelMapChange(e.target)}
      onDragEnd={(e) => handelMapChange(e.target)}
      onZoom={(e) => handelMapChange(e.target)}
      initialViewState={initialView}
    >
      <ShowGarages />
      <Panel position="left-top">
        <div className="flex flex-row items-stretch">
          <SearchPlaceBox />
          <div className="flex relative pl-1 flex-row  bg-transparent items-center gap-1 backdrop-blur-sm">
            <div className="flex gap-1 items-center">
              <Input
                type="datetime-local"
                className="w-full p-1 text-lg font-light border-0 "
                min={toLocalISOString(new Date()).slice(0, 16)}
                {...register('startTime')}
              />
              <IconType time={formData.startTime} />
            </div>
            <div >
              <IconArrowRight className="p-1 text-red-600" />
            </div>
            <div className="flex gap-1 items-center">
              <IconType time={formData.endTime} />
              <Input
                min={toLocalISOString(new Date()).slice(0, 16)}
                type="datetime-local"
                className="w-full p-2 text-lg font-light border-0"
                {...register('endTime')}
              />
            </div>
          </div>
        </div>
      </Panel>
      <Panel position='right-center'>
        <DefaultZoomControls />
      </Panel>
      <Panel position="right-top">
        <FilterSidebar/>
      </Panel>
    </Map>
  )
}