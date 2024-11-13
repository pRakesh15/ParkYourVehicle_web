'use client'
import React, { useCallback } from 'react'
import { Map } from './map/Map'
import { Panel } from './map/Panel'
import { DefaultZoomControls } from './map/ZoomControls'
import { ViewStateChangeEvent } from 'react-map-gl'
import { initialView } from '@/libs/constants'
import { Autocomplete } from './AutoComplit'
import { SearchPlaceBox } from './map/SearchPlaceBox'

type Props = {}

export const SearchPage = (props: Props) => {
    const handelMapChange = useCallback(
        (target: ViewStateChangeEvent['target']) => {
            const bound=target.getBounds()
          const  locationFilter={
            ne_lat:bound?.getNorthEast().lat ||0,
            ne_lng:bound?.getNorthEast().lng ||0,
            sw_lat:bound?.getSouthWest().lat ||0,
            sw_lng:bound?.getSouthWest().lng ||0,
          }
          console.log('locationFilter',locationFilter)
        },
        [],
    )
    return (
        <Map
            onLoad={(e) => handelMapChange(e.target)}
            onDragEnd={(e) => handelMapChange(e.target)}
            onZoom={(e) => handelMapChange(e.target)}
            initialViewState={initialView}
        >
            <Panel position='left-top'>
                <SearchPlaceBox/>
            </Panel>
            <Panel position='right-center'>
                <DefaultZoomControls />
            </Panel>
        </Map>
    )
}