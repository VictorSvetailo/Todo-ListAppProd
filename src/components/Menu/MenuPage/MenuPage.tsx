import React, {FC, useCallback, useEffect, useState} from 'react'
import {Navigate, NavLink, useNavigate, useParams, useSearchParams,} from 'react-router-dom'
import {useActions, useAppDispatch} from '../../../utils/redux-utils'
import {authActions} from '../../../features/Auth'
import ListItemIcon from '@mui/material/ListItemIcon'
import Logout from '@mui/icons-material/Logout'
import MenuItem from '@mui/material/MenuItem'

import styles from './Menu.module.scss'
import {currentWindowAC} from '../../../BLL/application-reducer';

type MenuPropsType = {
    location: string
}

export const MenuPage: FC<MenuPropsType> = ({location}) => {
    // console.log(location)
    // useEffect(()=> {
    //     dispatch(currentWindowAC(location))
    //     setIsActiveBTN('/')
    // }, [location])
    const dispatch = useAppDispatch()

    const [isActiveBTN, setIsActiveBTN] = useState(location)
    // console.log(location)
    const isActiveBTNCB = (value: string) => {
        dispatch(currentWindowAC(value))
        setIsActiveBTN(value)
    }

    // const navigateUp = useNavigate()
    // const navigateBack = useNavigate()

    const {logout} = useActions(authActions)
    const logoutH = useCallback(() => {
        logout()
    }, [])

    return (
        <div className={styles.menu}>
            {/*<button onClick={() => {*/}
            {/*    setSearchParams({...Object.fromEntries(searchParams), age: '2332322',})*/}
            {/*}}>add age*/}
            {/*</button>*/}
            {/*<div className={styles.arrows}>*/}
            {/*    <button*/}
            {/*        className={styles.menu__arrows}*/}
            {/*        onClick={() => {*/}
            {/*            navigateBack(-1)*/}
            {/*        }}>*/}
            {/*        {'<-'}*/}
            {/*    </button>*/}
            {/*    <button*/}
            {/*        className={styles.menu__arrows}*/}
            {/*        onClick={() => {*/}
            {/*            navigateUp(1)*/}
            {/*        }}>{'->'}*/}
            {/*    </button>*/}
            {/*</div>*/}
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
