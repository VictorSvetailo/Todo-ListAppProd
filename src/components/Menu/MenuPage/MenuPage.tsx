import React, {useCallback, useEffect, useState} from 'react'
import {Navigate, NavLink, useNavigate, useParams, useSearchParams,} from 'react-router-dom'
import {useActions} from '../../../utils/redux-utils'
import {authActions} from '../../../features/Auth'
import ListItemIcon from '@mui/material/ListItemIcon'
import Logout from '@mui/icons-material/Logout'
import MenuItem from '@mui/material/MenuItem'

import styles from './Menu.module.scss'
import {useAppSelector} from '../../../app/store';

export const MenuPage = () => {
    const applicationChangingTheme = useAppSelector<boolean>(state => state.application.applicationChangingTheme)
    const [isActiveBTN, setIsActiveBTN] = useState('1')
    const isActiveBTNCB = (value: string) => {
        setIsActiveBTN(value)
    }

    // const isLoggedIn = useSelector(selectIsLoggedIn)

    // useEffect(() => {
    //     console.log(!isLoggedIn)
    //     if (!isLoggedIn) {
    //         return
    //     }
    // }, [])

    const navigateUp = useNavigate()
    const navigateBack = useNavigate()

    const {logout} = useActions(authActions)
    const logoutH = useCallback(() => {
        logout()
    }, [])


    // if (!isLoggedIn) {
    //     console.log(!isLoggedIn)
    //     return <Navigate to={'/login'}/>
    // }
    return (
        <div className={styles.menu}>
            {/*<button onClick={() => {*/}
            {/*    setSearchParams({...Object.fromEntries(searchParams), age: '2332322',})*/}
            {/*}}>add age*/}
            {/*</button>*/}

            <div className={styles.arrows}>
                <button
                    className={styles.menu__arrows}
                    onClick={() => {
                        navigateBack(-1)
                    }}>
                    {'<-'}
                </button>
                <button
                    className={styles.menu__arrows}
                    onClick={() => {
                        navigateUp(1)
                    }}>{'->'}
                </button>
            </div>
            <div className={styles.menu__body}>
                <NavLink to={'/'}>
                    <div>
                    </div>
                    <button onClick={() => isActiveBTNCB('1')}
                            className={isActiveBTN === '1' ? `${styles.menu__btn} ${styles.active}` : `${styles.menu__btn}`}>Home
                    </button>
                </NavLink>
                <NavLink to={'/settings'}>
                    <button onClick={() => isActiveBTNCB('2')}
                            className={isActiveBTN === '2' ? `${styles.menu__btn} ${styles.active}` : `${styles.menu__btn}`}>Settings
                    </button>
                </NavLink>
                <NavLink to={'/'}>
                    <button onClick={() => isActiveBTNCB('3')}
                            className={isActiveBTN === '3' ? `${styles.menu__btn} ${styles.active}` : `${styles.menu__btn}`}
                            disabled>Boards
                    </button>
                </NavLink>
                <NavLink to={'/templates'}>
                    <button onClick={() => isActiveBTNCB('4')}
                            className={isActiveBTN === '4' ? `${styles.menu__btn} ${styles.active}` : `${styles.menu__btn}`}>Templates
                    </button>
                </NavLink>
                <NavLink to={'/gallery'}>
                    <button onClick={() => isActiveBTNCB('5')}
                            className={isActiveBTN === '5' ? `${styles.menu__btn} ${styles.active}` : `${styles.menu__btn}`}>Gallery
                    </button>
                </NavLink>
                <NavLink to={'/templates'}>
                    <button onClick={() => isActiveBTNCB('6')}
                            className={isActiveBTN === '6' ? `${styles.menu__btn} ${styles.active}` : `${styles.menu__btn}`}>Highlights
                    </button>
                </NavLink>
                <NavLink to={'/templates'}>
                    <button onClick={() => isActiveBTNCB('7')}
                            className={isActiveBTN === '7' ? `${styles.menu__btn} ${styles.active}` : `${styles.menu__btn}`}>Views
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
