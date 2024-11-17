import ToggleButtonMui, { ToggleButtonProps } from '@mui/material/ToggleButton'
import ToggleButtonGroupMui, {
  ToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup'
import { forwardRef } from 'react'

export const ToggleButtonGroup = forwardRef<
  JSX.Element,
  ToggleButtonGroupProps
>((props, ref) => (
  <ToggleButtonGroupMui classes={{ root: 'block mt-2 bg-gray-200 text-black rounded-md' }} ref={ref} {...props} />
))

ToggleButtonGroup.displayName = 'ToggleButtonGroup'

export const ToggleButton = (props: ToggleButtonProps) => (
  <ToggleButtonMui

    classes={{
      root: 'rounded-none border border-green-500', // Base styles
    }}
    disableRipple
    disableTouchRipple
    disableFocusRipple
    {...props}
  />
)
