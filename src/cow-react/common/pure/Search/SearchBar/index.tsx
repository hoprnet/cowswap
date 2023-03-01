import styled from 'styled-components/macro'
import { Icon } from '@cow/common/pure/Search/Icon'
import { createRef, useCallback } from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.bg0};
  background-color: ${({ theme }) => theme.bg3};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  &:hover,
  &:focus-within,
  &:active {
    border: 1px solid ${({ theme }) => theme.bg6};
  }
  backdrop-filter: blur(60px);
  cursor: text;
`
const Input = styled.input`
  all: unset;
  margin-left: 1rem;
  margin-right: 1rem;
  flex: 1;
  color: ${({ theme }) => theme.text4};
  font-weight: 500;
`

const MagnifyingGlass = styled(Icon).attrs(({ theme }) => ({
  name: 'magnifying-glass',
  width: 24,
  height: 24,
  color: theme.text4,
}))`
  opacity: 0.25;
  user-select: none;
`

const KeybindSlash = styled(Icon).attrs(({ theme }) => ({
  name: 'keybind-slash',
  width: 30,
  height: 30,
  color: theme.white,
  backgroundColor: theme.text4,
}))`
  opacity: 0.25;
  user-select: none;
`

interface SearchBarProps {
  placeholder: string
}

export function SearchBar({ placeholder }: SearchBarProps) {
  const inputRef = createRef<HTMLInputElement>()
  const handleClick = useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  return (
    <Container onClickCapture={handleClick}>
      <MagnifyingGlass />
      <Input ref={inputRef} placeholder={placeholder} />
      <KeybindSlash />
    </Container>
  )
}
