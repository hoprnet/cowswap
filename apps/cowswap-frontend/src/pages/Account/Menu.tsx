import { ACCOUNT_MENU_LINKS } from '@cowswap/common-const'

import { NavLink } from 'react-router-dom'

import { SideMenu } from 'legacy/components/SideMenu'

export function AccountMenu() {
  return (
    <SideMenu isAccountPage={true}>
      <ul>
        {ACCOUNT_MENU_LINKS.map(({ title, url }, i) => (
          <li key={i}>
            <NavLink end to={url} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </SideMenu>
  )
}
