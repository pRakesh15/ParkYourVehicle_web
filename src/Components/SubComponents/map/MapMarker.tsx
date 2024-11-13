import React from 'react'

import {Marker as MarkerGl ,MarkerProps} from 'react-map-gl'

const MapMarker = (props: MarkerProps) => {
  return (
    <div><MarkerGl {...props}/></div>
  )
}