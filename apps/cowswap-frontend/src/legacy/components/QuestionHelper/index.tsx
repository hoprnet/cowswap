import { ReactNode } from 'react'

import QuestionImage from '@cowswap/assets/svg/question.svg'
import { renderTooltip } from '@cowswap/ui'

import SVG from 'react-inlinesvg'
import styled from 'styled-components/macro'

import QuestionHelperMod, { QuestionHelperProps } from './QuestionHelperMod'

const QuestionMark = () => <SVG src={QuestionImage} />

export const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 16px;
  height: 16px;
  border: none;
  outline: none;
  cursor: default;
  border-radius: 16px;
  background-color: transparent;

  > svg > path {
    stroke: ${({ theme }) => theme.text1};
  }
`

interface EnhancedQuestionHelperProps extends Omit<QuestionHelperProps, 'QuestionMark'> {
  text: ReactNode
}

export default function QuestionHelper({ text, ...props }: EnhancedQuestionHelperProps) {
  const tooltip = renderTooltip(text, props)

  return <QuestionHelperMod {...props} text={tooltip} QuestionMark={QuestionMark} />
}
