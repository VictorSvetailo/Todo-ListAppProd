import React, {FC, useCallback, useEffect, useState} from 'react'
import {Navigate, NavLink, useNavigate, useParams, useSearchParams,} from 'react-router-dom'
import {useActions, useAppDispatch} from '../../../utils/redux-utils'
import {authActions} from '../../../features/Auth'
import ListItemIcon from '@mui/material/ListItemIcon'
import Logout from '@mui/icons-material/Logout'
import MenuItem from '@mui/material/MenuItem'

import styles from './Menu.module.scss'
import {currentWindowAC, currentWindowTC} from '../../../BLL/application-reducer';
import {useAppSelector} from '../../../app/store';

type MenuPropsType = {
    // location: string
}

export const MenuPage: FC<MenuPropsType> = (props) => {
    const currentWindow = useAppSelector<string>(state => state.application.currentWindow)
    console.log(currentWindow)
    useEffect(()=> {
        dispatch(currentWindowTC())
        setIsActiveBTN(currentWindow)
    }, [currentWindow])

    const dispatch = useAppDispatch()
    const [isActiveBTN, setIsActiveBTN] = useState(currentWindow)
    // console.log(location)
    const isActiveBTNCB = (value: string) => {
        dispatch(currentWindowAC(value))
        // setIsActiveBTN(value)
    }

    // const navigateUp = useNavigate()
    // const navigateBack = useNavigate()

    const {logout} = useActions(authActions)
    const logoutH = useCallback(() => {
        logout()
    }, [])

    return (
        <div className={styles.menu}>

            <div className={styles.menu__body}>
                <NavLink to={'/'}>
                    <button onClick={() => isActiveBTNCB('/')}
                            className={isActiveBTN === '/' ? `${styles.menu__btn} ${styles.active}` : `${styles.menu__btn}`}>Home
                    </button>
                </NavLink>
                <NavLink to={'/settings'}>
                    <button onClick={() => isActiveBTNCB('/settings')}
                            className={isActiveBTN === '/settings' ? `${styles.menu__btn} ${styles.active}` : `${styles.menu__btn}`}>Settings
                    </button>
                </NavLink>
                <NavLink to={'/boards'}>
                    <button onClick={() => isActiveBTNCB('/boards')}
                            className={isActiveBTN === '/boards' ? `${styles.menu__btn} ${styles.active}` : `${styles.menu__btn}`}
                            disabled>Boards
                    </button>
                </NavLink>
                <NavLink to={'/templates'}>
                    <button onClick={() => isActiveBTNCB('/templates')}
                            className={isActiveBTN === '/templates' ? `${styles.menu__btn} ${styles.active}` : `${styles.menu__btn}`}>Templates
                    </button>
                </NavLink>
                <NavLink to={'/gallery'}>
                    <button onClick={() => isActiveBTNCB('/gallery')}
                            className={isActiveBTN === '/gallery' ? `${styles.menu__btn} ${styles.active}` : `${styles.menu__btn}`}>Gallery
                    </button>
                </NavLink>
                <NavLink to={'/highlights'}>
                    <button onClick={() => isActiveBTNCB('/highlights')}
                            className={isActiveBTN === '/highlights' ? `${styles.menu__btn} ${styles.active}` : `${styles.menu__btn}`}>Highlights
                    </button>
                </NavLink>
                <NavLink to={'/views'}>
                    <button onClick={() => isActiveBTNCB('/views')}
                            className={isActiveBTN === '/views' ? `${styles.menu__btn} ${styles.active}` : `${styles.menu__btn}`}>Views
                    </button>
                </NavLink>
                <hr/>
                <MenuItem style={{color: 'red', margin: '0'}} onClick={logoutH}>
                    <ListItemIcon>
                        <Logout style={{color: 'red', margin: '0'}} fontSize="small"/>
                    </ListItemIcon>
                    Sign out
                </MenuItem>
            </div>
        </div>
    )
}
