'use client'
import { useFormContext, useWatch } from "react-hook-form";
import { SearchGaragesQuery } from "../../../../../libs/Network/src/gql/generated";
import { useState } from "react";
import { FormTypeBookSlot } from "@/libs/forms/bookSlot";
import { Switch } from "./Switch";
import { Map } from "./Map";
import { MapMarker } from "./MapMarker";
import { CircleParking } from "lucide-react";
import { IconUser } from "@tabler/icons-react";
import { Directions } from "./Directions";
import { Panel } from "./Panel";
import { DefaultZoomControls } from "./ZoomControls";


export const ManageValet = ({
    garage,
}: {
    garage: SearchGaragesQuery['searchGarages'][number]
}) => {
    const [showValet, setShowValet] = useState(false)
    const { setValue } = useFormContext<FormTypeBookSlot>()

    const { valet } = useWatch<FormTypeBookSlot>()
    const lat = garage.address?.lat
    const lng = garage.address?.lng

    if (!lat || !lng) {
        alert('garage location note set')
        return (<> Something went wrong</>)
    }

    return (
        <div className="p-2 space-y-2 ">
            <div className="text-xl font-semibold">Valet</div>
            <p className="text-sm text-gray-400">
                Our valets will whisk your car away its reserved spot and bring it back when you&apos;re ready. it &apos;s like magic,but with cars!
            </p>

            <Switch
                checked={showValet}
                onChange={(e) => {
                    setShowValet(e)

                    if (!e) {
                        setValue('valet', undefined, {
                            shouldValidate: true,
                        })
                        setValue('valet.differentLocations', false)
                    } else {
                        setValue('valet.pickupInfo', {
                            lat, lng
                        })
                        setValue('valet.dropoffInfo', {
                            lat, lng
                        })
                    }
                }}
                label={'Need Valet?'}
            />
            {showValet ? (
                <div>
                    <div className="mb-6 space-y-3">
                        <p className="text-sm text-gray-400">
                            Want your car delivered somewhere else? No problem! Choose a
                            different drop-off point and we&apos;ll make sure your ride is
                            there waiting for you.
                        </p>
                        <Switch
                            checked={valet?.differentLocations || false}
                            onChange={(e) => {
                                setValue('valet.differentLocations', e)
                                if (!e) {
                                    setValue('valet.dropoffInfo', {
                                        lat: valet?.pickupInfo?.lat || lat,
                                        lng: valet?.pickupInfo?.lng || lat,
                                    })
                                } else {
                                    setValue('valet.dropoffInfo', {
                                        lat,
                                        lng,
                                    })
                                }
                            }}
                            label={'Add a different drop off location?'}
                        />
                    </div>
                    {/* if setValet is true then i have to show the map also.. */}
                    <Map
                        initialViewState={{
                            latitude: lat,
                            longitude: lng,
                            zoom: 13,
                        }}
                        height="50vh"
                    >
                        <Panel position='right-center'>
                            <DefaultZoomControls />
                        </Panel>
                        <MapMarker
                            latitude={lat} longitude={lng}
                        >
                            <CircleParking className="bg-red-600 h-4 w-4 rounded-2xl" />

                        </MapMarker>
                        {
                            valet?.pickupInfo?.lng && valet?.pickupInfo.lat ? <>
                                <MapMarker
                                    pitchAlignment="auto"
                                    longitude={valet?.pickupInfo?.lng}
                                    latitude={valet?.pickupInfo?.lat}
                                    draggable
                                    onDragEnd={({ lngLat }) => {
                                        const { lat, lng } = lngLat
                                        setValue('valet.pickupInfo.lat', lat || 0)
                                        setValue('valet.pickupInfo.lng', lng || 0)
                                        if (!valet.differentLocations) {
                                            setValue('valet.dropoffInfo.lat', lat || 0)
                                            setValue('valet.dropoffInfo.lng', lng || 0)
                                        }
                                    }}
                                >
                                    <div className="flex flex-col items-center text-[#00FFFF]">
                                        <IconUser className="fill-[#00FFFF]" />
                                        <span className="text-[#00FFFF]">
                                            Pickup {!valet.differentLocations ? '& drop off' : null}
                                        </span>
                                    </div>
                                </MapMarker>
                                <Directions
                                    sourceId="PickupRouts"
                                    origin={{ lat, lng }}
                                    destination={{
                                        lat: valet.pickupInfo.lat,
                                        lng: valet.pickupInfo.lng
                                    }}
                                    setDistance={(distance) => {
                                        setValue('valet.pickupInfo.distance', distance)
                                    }}
                                />
                            </> : null
                        }
                        {
                            valet?.differentLocations &&
                                valet?.dropoffInfo?.lng &&
                                valet?.dropoffInfo.lat ? <>
                                <MapMarker
                                    pitchAlignment="auto"
                                    longitude={valet?.dropoffInfo?.lng}
                                    latitude={valet?.dropoffInfo?.lat}
                                    draggable
                                    onDragEnd={({ lngLat }) => {
                                        const { lat, lng } = lngLat
                                        setValue('valet.dropoffInfo.lat', lat || 0)
                                        setValue('valet.dropoffInfo.lng', lng || 0)
                                    }}
                                >
                                    <div className="flex flex-col items-center text-[#FFD700]">
                                        <IconUser className="fill-[#FFD700]"  />
                                        <span className="text-[#FFD700]">
                                            Drop off
                                        </span>
                                    </div>
                                </MapMarker>
                                <Directions
                                    sourceId="dropoffRout"
                                    origin={{ lat, lng }}
                                    destination={{
                                        lat: valet.dropoffInfo.lat,
                                        lng: valet.dropoffInfo.lng
                                    }}
                                    setDistance={(distance) => {
                                        setValue('valet.dropoffInfo.distance', distance)
                                    }}
                                />
                            </> : null
                        }
                    </Map>
                </div>
            ) : null

            }
        </div>
    )
}