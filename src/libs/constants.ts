import { ReactNode } from "react"

export const initialView = {
    latitude: 20.2961,
    longitude: 85.8245,
    zoom: 11,
}

export type LocationInfo = {
    placeName: string,
    latlng: [number, number]
}


export const VALET_CHARGE_PER_METER=0.023;


export const locationsAroundBhubaneswar: LocationInfo[] = [
    { placeName: "Cuttack", latlng: [20.4667, 85.9000] },
    { placeName: "Puri", latlng: [19.8000, 85.8167] },
    { placeName: "Konarak", latlng: [19.8833, 86.1333] },
    { placeName: "Dhenkanal", latlng: [20.6667, 85.6333] },
    { placeName: "Khurda", latlng: [20.1833, 85.6667] },
    { placeName: "Banki", latlng: [20.3500, 85.5500] },
    { placeName: "Chilka Lake", latlng: [19.8333, 85.5000] },
    { placeName: "Jajpur", latlng: [20.8500, 86.3333] },
    { placeName: "Jagatsinghpur", latlng: [20.2667, 86.1667] },
    { placeName: "Baleshwar", latlng: [21.5000, 86.9000] },
    { placeName: "Rayagada", latlng: [19.1500, 83.4500] },
    { placeName: "Berhampur", latlng: [19.3000, 84.7833] }
];