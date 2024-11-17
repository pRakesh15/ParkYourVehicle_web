import Slider, { SliderProps } from '@mui/material/Slider'

export const RangeSlider = (props: SliderProps) => (
  <div className="w-full pt-5 pl-2 pr-4">
    <Slider
      valueLabelDisplay="auto"
      classes={{
        root: `h-0.5 w-full border-0 `,
        thumb:
          'rounded-none border w-4 h-4 after:active:bg-black/10 after:w-8 after:h-8 after:rounded-none bg-white hover:shadow-none hover:border-black hover:bg-gray-50 focus:bg-gray-50',
        track: 'text-gray-800 ',
        rail: 'bg-gray-400',
        valueLabel: `
      text-black text-xs font-small bg-gray-200 
      rounded py-0.5 px-1 
      shadow-sm
    `,
      }}
      {...props}
    />
  </div>
)
