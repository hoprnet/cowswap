import { Keybind } from './Keybind'
import { MagnifyingGlass } from './MagnifyingGlass'

type IconName = 'magnifying-glass' | 'keybind-slash'

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
    default:
      return <></>
  }
}
