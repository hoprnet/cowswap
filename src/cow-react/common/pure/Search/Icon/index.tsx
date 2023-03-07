import { Clock } from './Clock'
import { Keybind } from './Keybind'
import { MagnifyingGlass } from './MagnifyingGlass'
import { UpwardsTicker } from './UpwardsTicker'

export type IconName = 'magnifying-glass' | 'keybind-slash' | 'clock' | 'upwards-ticker'

interface IconProps {
  name: IconName
  color: string
  width: number
  height: number
  backgroundColor?: string
  className?: string
}

export type IconBaseProps = Omit<IconProps, 'name'>

export function Icon({ name, ...props }: IconProps) {
  switch (name) {
    case 'magnifying-glass':
      return <MagnifyingGlass {...props} />
    case 'keybind-slash':
      return <Keybind {...props}>/</Keybind>
    case 'clock':
      return <Clock {...props} />
    case 'upwards-ticker':
      return <UpwardsTicker {...props} />
    default:
      return <></>
  }
}
