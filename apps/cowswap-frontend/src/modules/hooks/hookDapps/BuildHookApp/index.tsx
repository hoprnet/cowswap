import { useCallback, useContext, useState } from 'react'

import { CowHook, HookDappInternal, HookDappType } from '@cowprotocol/types'
import { ButtonPrimary } from '@cowprotocol/ui'
import { BigNumber } from '@ethersproject/bignumber'

import styled from 'styled-components/macro'

import { HookDappApiContext } from 'modules/hooks/context'

import buildImg from '../../images/build.png'

const TITLE = 'Build your own Pre-hook'
const DESCRIPTION = 'Add an arbitrary calldata to be executed before your hook'

export const PRE_BUILD: HookDappInternal = {
  name: TITLE,
  description: DESCRIPTION,
  type: HookDappType.INTERNAL,
  path: '/hooks-dapps/pre/build',
  image: buildImg,
  component: <ClaimGnoHookApp />,
  version: 'v0.1.0',
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;

  flex-grow: 1;
`

const Link = styled.button`
  border: none;
  padding: 0;
  text-decoration: underline;
  display: text;
  cursor: pointer;
  background: none;
  color: white;
  margin: 10px 0;
`

const Header = styled.div`
  display: flex;
  padding: 1.5em;

  p {
    padding: 0 1em;
  }
`

// const Label = styled.span`
//   color: var(${UI.COLOR_TEXT2});
// `

const ContentWrapper = styled.div`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1em;
  text-align: center;
`

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 10px;
  width: 100%;

  label {
    margin: 10px;
    flex-grow: 0;
    width: 5em;
  }

  input,
  textarea {
    flex-grow: 1;
  }
`

// const Amount = styled.div`
//   font-weight: 600;
//   margin-top: 0.3em;
// `

// const ErrorLabel = styled.div`
//   color: var(${UI.COLOR_RED});
// `

// const LoadingLabel = styled.div`
//   color: var(${UI.COLOR_TEXT2});
// `

export function ClaimGnoHookApp() {
  const hookDappApiContext = useContext(HookDappApiContext)
  const [hook, setHook] = useState<CowHook>({
    target: '',
    callData: '',
    gasLimit: '',
  })

  const clickOnAddHook = useCallback(() => {
    const { callData, gasLimit, target } = hook
    if (!hookDappApiContext || !callData || !gasLimit || !target) {
      return
    }

    hookDappApiContext.addHook(
      {
        hook: hook,
        dapp: PRE_BUILD,
        output: {
          // TODO: Model the potential output tokens. Ideally, this should be inferred by the calldata using a simulator such us Tenderly
          amount: BigNumber.from('10000000'),
        },
      },
      true
    )
  }, [hook, hookDappApiContext])

  if (!hookDappApiContext) {
    return 'Loading...'
  }

  return (
    <Wrapper>
      <Header>
        <img src={buildImg} alt={TITLE} width="60" />
        <p>{DESCRIPTION}</p>
      </Header>
      <ContentWrapper>
        <Row>
          <label>Target</label>
          <input
            name="target"
            value={hook.target}
            onChange={(e) => setHook((hook) => ({ ...hook, target: e.target.value }))}
          />
        </Row>
        <Row>
          <label>Gas Limit</label>
          <input
            name="gasLimit"
            value={hook.gasLimit}
            onChange={(e) => setHook((hook) => ({ ...hook, gasLimit: e.target.value }))}
          />
        </Row>

        <Row>
          <label>Calldata</label>
          <textarea
            name="callData"
            value={hook.callData}
            onChange={(e) => setHook((hook) => ({ ...hook, callData: e.target.value }))}
          />
        </Row>
      </ContentWrapper>
      <ButtonPrimary onClick={clickOnAddHook}>+Add Pre-hook</ButtonPrimary>
      <Link
        onClick={(e) => {
          e.preventDefault()
          hookDappApiContext.closeHookDaap()
        }}
      >
        Close
      </Link>
    </Wrapper>
  )
}
