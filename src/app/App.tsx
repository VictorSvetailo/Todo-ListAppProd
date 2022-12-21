import React, {FC, useEffect, useState} from 'react'
import styles from './app.module.scss'
import {TodoListsList} from '../features/TodoListsList'
import {CircularProgress, LinearProgress} from '@mui/material'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useSelector} from 'react-redux'
import {authSelectors, Login} from '../features/Auth'
import {Outlet, Route, Routes} from 'react-router-dom'
import {selectIsInitialized, selectStatus} from '../features/Apllication/selectors'
import {appActions} from '../features/Apllication'
import {useActions} from '../utils/redux-utils'
import {TaskType} from '../api/types'
import {AppMenuBar} from '../components/Menu/MenuBar'
import {MenuPage} from '../components/Menu/MenuPage/MenuPage'
import {Error} from '../components/Error/Error';
import {Settings} from '../features/Settings/Settings';
import {Background} from '../features/Settings/Background/Background';
import {Templates} from '../components/Menu/Templates/Templates';
import {Gallery} from '../features/Photo-gallery/Gallery';

export type TasksStateType = {
    [toDoList_ID: string]: Array<TaskType>
}

type PropsType = {
    // demo?: boolean
}


export const App: React.FC<PropsType> = React.memo(props => {
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const {isInitializeApp} = useActions(appActions)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const menuSwitchCB = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        if (!isInitialized) {
            isInitializeApp()
        }
    }, [])

    if (!isInitialized) {
        return (
            <>
                <div
                    style={{
                        position: 'absolute',
                        top: '48%',
                        left: '48%',
                    }}>
                    <CircularProgress/>
                </div>
            </>
        )
    }

    return (
        <div>
            <div className={styles.app}>
                <div className={!isLoggedIn ? styles.back : ''}>
                    <ErrorSnackbar/>
                    <div style={{
                        position: 'fixed',
                        width: '100%',
                        top: '0px',
                        zIndex: '3'
                    }}>
                        <div>
                            {isLoggedIn && <AppMenuBar menuSwitchCB={menuSwitchCB}/>}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '-3px',
                                    left: '0',
                                    width: '100%',
                                    height: '5px',
                                    zIndex: '2'
                                }}>
                                {status === 'loading' && <LinearProgress color="secondary"/>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.main__window_wrap}>
                        <div className={isMenuOpen ? `${styles.sidebar} ${styles.active}` : `${styles.sidebar}`}>
                                {isLoggedIn && <MenuPage/>}
                        </div>
                        <div className={isMenuOpen ? `${styles.page__body} ${styles.active}` : `${styles.page__body}`}>
                            <Routes>
                                <Route path={'/menupage/*'} element={<MenuPage/>}/>
                                <Route path={'/*'} element={<Error/>}/>
                                <Route path={'/settings'} element={
                                    <div><Settings/><Outlet/></div>}>
                                    <Route path={'*'} element={<div><Error/></div>}/>
                                    <Route path={':id'} element={<div>iD</div>}/>
                                    <Route index element={<div>check iD</div>}/>
                                    <Route path={'/settings/background'}
                                           element={<div><Background/></div>}/>
                                </Route>
                                <Route path={'/templates'} element={<Templates/>}/>
                                <Route path={'/gallery'} element={<Gallery/>}/>
                                <Route path={'/'} element={<TodoListsList demo={false}/>}/>
                                <Route path={'/login'} element={<Login/>}/>
                            </Routes>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
})


// type MenuType = {
//     menuSwitchCB?: () => void
// }
//
// const Menu: FC<MenuType> = ({menuSwitchCB}) => {
//
//
//     return (
//         <div>
//
//             <div>
//                 <div>
//                     <div>
//                         <div>
//                         </div>
//
//                     </div>
//                 </div>
//             </div>
//
//         </div>
//     )
// }
