import { APP_TITLE } from '@cowswap/common-const'

import { Helmet } from 'react-helmet'

type PageTitleProps = {
  title?: string
}

export function PageTitle({ title }: PageTitleProps) {
  return (
    <Helmet>
      <title>
        {title ? `${title} - ` : ''}
        {APP_TITLE}
      </title>
    </Helmet>
  )
}
