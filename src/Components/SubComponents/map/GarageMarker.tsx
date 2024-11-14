import { useState } from "react"
import { SearchGaragesQuery } from "../../../../../libs/Network/src/gql/generated"
import { useWatch } from "react-hook-form"
import { FormTypeSearchGarage } from "@/libs/forms/searchGarages"

import { MapMarker } from "./MapMarker"
import { CircleParking } from "lucide-react"
import { Dialog } from "./Dialog"

export const GarageMarker = ({
  marker,
}: {
  marker: SearchGaragesQuery['searchGarages'][number]
}) => {
  const [showPopup, setShowPopup] = useState(false)
//   useKeypress(['Escape'], () => setShowPopup(false))

  const { endTime, startTime } = useWatch<FormTypeSearchGarage>()

  if (!marker.address?.lat || !marker.address.lng) {
    return null
  }
//   console.log(marker)

  return (
    <>
       <Dialog
        title="Booking"
        widthClassName="max-w-3xl"
        open={showPopup}
        setOpen={setShowPopup}
      >
        <div className="text-black">
        {marker.id}
        </div>
       
      </Dialog>

      <MapMarker
        latitude={marker.address.lat}
        longitude={marker.address.lng}
        onClick={(e) => {
          e.originalEvent.stopPropagation()
          setShowPopup((state) => !state)
        }}
      >
        
        <CircleParking className="bg-red-600 h-6 w-6 rounded-2xl" />
        
      </MapMarker>
    </>
  )
}
