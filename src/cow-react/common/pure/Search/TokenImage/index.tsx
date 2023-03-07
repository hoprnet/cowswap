import styled from 'styled-components/macro'

const Image = styled.img<Pick<TokenImageProps, 'size'>>`
  border-radius: 50%;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
`

interface TokenImageProps {
  src: string
  tokenName: string
  size?: number
}

export function TokenImage({ src, tokenName, size = 36 }: TokenImageProps) {
  return <Image src={src} alt={tokenName} size={size} />
}
