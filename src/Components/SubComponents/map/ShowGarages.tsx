
import { useLazyQuery } from "@apollo/client";
import { SearchGaragesDocument } from "../../../../../libs/Network/src/gql/generated";
import { GarageMarker } from "./GarageMarker";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormTypeSearchGarage } from "@/libs/forms/searchGarages";

export const ShowGarages=()=>
{
    const [searchGarages,{loading,data,error}]=useLazyQuery(
        SearchGaragesDocument
    )

    const {watch}=useFormContext<FormTypeSearchGarage>()
    const {endTime:end,startTime:start,locationFilter}=watch()


    useEffect(()=>{
        searchGarages({variables:{dateFilter:{end,start},locationFilter}})
    },[end,locationFilter,start,searchGarages])

    return(
        <>
        {
            data?.searchGarages.map((garage)=>(
                <GarageMarker key={garage.id} marker={garage}/>
            ))
        }
        </>
    )
}