import { ViewState } from '@/libs/utils'
import { useMap } from 'react-map-gl'
import { useSearchLocation } from './hook/location'
import { Autocomplete } from '../AutoComplit'
import { LocationInfo, locationsAroundBhubaneswar } from '@/libs/constants'


export const SearchPlaceBox = ({
  onLocationChange,
}: {
  onLocationChange?: (location: ViewState) => void
}) => {
  const { current: map } = useMap()
  const { loading, locationInfo, searchText, setLoading, setSearchText } =
    useSearchLocation()

  return (
    <Autocomplete<LocationInfo>
      options={locationInfo?.length ? locationInfo : locationsAroundBhubaneswar}
      isOptionEqualToValue={(option, value) =>
        option.placeName === value.placeName
      }
      noOptionsText={searchText ? 'No options.' : 'Something...'}
      getOptionLabel={(x) => x.placeName}
      onInputChange={(_, v) => {
        setLoading(true)
        setSearchText(v)
      }}
      loading={loading}
      onChange={async (_, v) => {
        if (v) {
          const { latlng, placeName } = v
          await map?.flyTo({
            center: { lat: latlng[0], lng: latlng[1] },
            zoom: 13,
            // essential: true,
          })
          if (onLocationChange) {
            onLocationChange({ latitude: latlng[0], longitude: latlng[1] })
          }
        }
      }}
    />
  )
}
