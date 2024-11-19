import { useState } from "react"
import { SearchGaragesQuery } from "../../../../../libs/Network/src/gql/generated"
import { useWatch } from "react-hook-form"
import { FormTypeSearchGarage } from "@/libs/forms/searchGarages"

import { MapMarker } from "./MapMarker"
import { CircleParking } from "lucide-react"
import { FormProviderBookSlot } from "@/libs/forms/bookSlot"
import { BookSlotPopup } from "./BookSlotPopup"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

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

      <Dialog>
        <DialogTrigger asChild>
          <MapMarker
            latitude={marker.address.lat}
            longitude={marker.address.lng}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setShowPopup((state) => !state);
            }}
          >
            <CircleParking className="bg-red-600 h-4 w-4 rounded-2xl" />
          </MapMarker>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[660px] max-h-[115vh] bg-zinc-900 text-white overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between mr-7 -mt-3">
              <span className="text-white">{marker?.displayName}</span>
              <Badge
                variant={marker?.verification?.verified ? "default" : "destructive"}
                className={marker?.verification?.verified ? "bg-green-600" : "bg-red-600"}
              >
                {marker?.verification?.verified ? "Verified" : "Not Verified"}
              </Badge>
            </DialogTitle>
          </DialogHeader>

         
          <div className="overflow-y-auto max-h-[90vh] scrollbar-hide">
            <FormProviderBookSlot defaultValues={{ endTime, startTime }}>
              <BookSlotPopup garage={marker} />
            </FormProviderBookSlot>
          </div>
        </DialogContent>
      </Dialog>


    </>
  )
}
