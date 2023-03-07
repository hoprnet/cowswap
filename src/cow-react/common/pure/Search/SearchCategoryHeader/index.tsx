import styled from 'styled-components/macro'
import { Icon, IconName } from '../Icon'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.bg0};
  padding: 1rem 0.5rem;
`
const Title = styled.h5`
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 400;
  margin: 0;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.text2};
`
const HeaderIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.text2,
  width: 20,
  height: 20,
}))``

interface SearchCategoryHeaderProps {
  icon: IconName
  title: string
}

export function SearchCategoryHeader({ icon, title }: SearchCategoryHeaderProps) {
  return (
    <Container>
      <HeaderIcon name={icon} />
      <Title>{title}</Title>
    </Container>
  )
}
