import { PulsingDot } from "./Dot"

export const FilterHeading = ({
  title,
  dirty = true,
}: {
  title: string
  dirty: boolean
}) => (
  <div className="relative inline-block ">
    {dirty && <PulsingDot />}
    {title}
  </div>
)
