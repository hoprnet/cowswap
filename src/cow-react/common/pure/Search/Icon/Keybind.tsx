import styled from 'styled-components/macro'
import { IconBaseProps } from '.'

const Container = styled.div<Omit<KeybindProps, 'children'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor || 'darkgrey'};
  color: ${({ color }) => color};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 800;
  line-height: 1rem;
  opacity: 0.6;
  backdrop-filter: blur(60px);
`

interface KeybindProps extends IconBaseProps {
  children: string
}

export function Keybind({ children, ...props }: KeybindProps) {
  return <Container {...props}>{children}</Container>
}
