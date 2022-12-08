import React, { useCallback, useEffect } from 'react'
import {
  Navigate,
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { useActions } from '../../../utils/redux-utils'
import { authActions } from '../../../features/Auth'
import ListItemIcon from '@mui/material/ListItemIcon'
import Logout from '@mui/icons-material/Logout'
import MenuItem from '@mui/material/MenuItem'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../../features/Auth/selectors'
import style from './Menu.module.scss'

export const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams.get('name'))
  console.log(Object.fromEntries(searchParams))

  useEffect(() => {
    console.log('research...')
  }, [searchParams])

  const navigateUp = useNavigate()
  const navigateBack = useNavigate()

  const params = useParams<'*'>()
  const some = params['*']
  console.log(some)

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { logout } = useActions(authActions)
  const logoutH = useCallback(() => {
    logout()
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div>
      <div className={style.menu}>
        <button
          onClick={() => {
            setSearchParams({
              ...Object.fromEntries(searchParams),
              age: '2332322',
            })
          }}
        >
          add age
        </button>
        <button
          onClick={() => {
            navigateBack(-1)
          }}
        >
          {'<-'}
        </button>
        <button
          onClick={() => {
            navigateUp(1)
          }}
        >
          {'->'}
        </button>
        <h2>Menu Page</h2>
        <div className={style.menu__body}>
          <NavLink to={'/'}>
            <button>Home</button>
          </NavLink>
          <NavLink to={'/settings'}>
            <button>Settings</button>
          </NavLink>
          <NavLink to={'/'}>
            <button disabled>Boards</button>
          </NavLink>
          <NavLink to={'/templates'}>
            <button>Templates</button>
          </NavLink>
          <hr />
          <h3>Workspace</h3>
          <div>Highlights</div>
          <div>Views</div>
          <MenuItem style={{ color: 'red' }} onClick={logoutH}>
            <ListItemIcon>
              <Logout style={{ color: 'red' }} fontSize="small" />
            </ListItemIcon>
            Sign out
          </MenuItem>
        </div>
      </div>
    </div>
  )
}
