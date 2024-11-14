import { FormTypeSearchGarage } from "@/libs/forms/searchGarages";
import { useEffect, useState } from "react";
import { SearchGaragesQueryVariables } from "../../../../../../libs/Network/src/gql/generated";
import { FieldNamesMarkedBoolean, useFormContext, useWatch } from "react-hook-form";
import { useDebounce } from "../async";
import { intFilter } from "./healper";

type FormData = Partial<
    Pick<
        FormTypeSearchGarage,
        | 'endTime'
        | 'startTime'
        | 'height'
        | 'length'
        | 'width'
        | 'pricePerHour'
        | 'type'
        | 'locationFilter'
        | 'skip'
        | 'take'
    >>

export const useConvertSearchFormToVariables = () => {
    const [variables, setVariables] = useState<SearchGaragesQueryVariables | null>(null)

    const {
        formState: { dirtyFields, errors },
    } = useFormContext<FormTypeSearchGarage>()

    const formData = useWatch<FormTypeSearchGarage>()

    const [debouncedFormData, { debouncing }] = useDebounce(formData, 300)

    const hasErrors = Object.keys(errors).length !== 0


    useEffect(() => {
        const {
            endTime = '',
            startTime = '',
            locationFilter,
            length,
            width,
            height,
            pricePerHour,
            type,
            skip,
            take,
        } = debouncedFormData

        if (!startTime || !endTime || !locationFilter) {
            return
        }

        const dateFilter: SearchGaragesQueryVariables['dateFilter'] = {
            start: startTime,
            end: endTime,
        }

        const { ne_lat = 0, ne_lng = 0, sw_lat = 0, sw_lng = 0 } = locationFilter

        const slotsFilter = createSlotsFilter(dirtyFields, {
            length,
            width,
            height,
            pricePerHour,
            type,
        })

        const garagesFilter = createGaragesFilter(dirtyFields, { skip, take })

        setVariables({
            dateFilter,
            locationFilter: { ne_lat, ne_lng, sw_lat, sw_lng },
            ...(Object.keys(slotsFilter).length && { slotsFilter }),
            ...(Object.keys(garagesFilter).length && { garagesFilter }),
        })
    }, [debouncedFormData])

    return { variables: hasErrors ? null : variables, debouncing }
}

export const createSlotsFilter = (
    dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>,
    formData: FormData,
) => {
    const length = dirtyFields.length && intFilter(formData.length)
    const width = dirtyFields.width && intFilter(formData.width)
    const height = dirtyFields.height && intFilter(formData.height)
    const pricePerHour =
        dirtyFields.pricePerHour && intFilter(formData.pricePerHour)
    const type = dirtyFields.type && { in: formData.type }

    return {
        ...(length && { length }),
        ...(width && { width }),
        ...(height && { height }),
        ...(pricePerHour && { pricePerHour }),
        ...(type && { type }),
    }
}

export const createGaragesFilter = (
    dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>,
    formData: FormData,
) => {
    const skip = (dirtyFields.skip && formData.skip) || 0
    const take = (dirtyFields.take && formData.take) || 10

    return {
        ...(skip && { skip }),
        ...(take && { take }),
    }
}


