'use client'
import { useLazyQuery } from "@apollo/client";
import { SearchGaragesDocument } from "../../../../../libs/Network/src/gql/generated";
import { GarageMarker } from "./GarageMarker";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormTypeSearchGarage } from "@/libs/forms/searchGarages";
import { useConvertSearchFormToVariables } from "./adapter/searchFormAdapter";

export const ShowGarages=()=>
{
    const [searchGarages,{loading,data,error}]=useLazyQuery(
        SearchGaragesDocument
    )

   const {variables}=useConvertSearchFormToVariables()


    useEffect(()=>{
        if(variables)
        {
            searchGarages({variables})

        }
    },[variables,searchGarages])

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