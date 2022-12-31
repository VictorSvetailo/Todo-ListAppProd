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
import {TaskType} from '../DAL/Todo-List-DAL/types'
import {AppMenuBar} from '../components/Menu/MenuBar'
import {MenuPage} from '../components/Menu/MenuPage/MenuPage'
import {Error} from '../components/Error/Error';
import {Settings} from '../features/Settings/Settings';
import {Background} from '../features/Settings/Background/Background';
import {Templates} from '../components/Menu/Templates/Templates';
import {Gallery} from '../features/Photo-gallery/Gallery';
import {useAppSelector} from './store';
import {SocialNetwork} from '../features/Social-Network/Social-Network';
import {About} from '../features/Social-Network/About/About';
import {Friends} from '../features/Social-Network/Friends/Friends';
import {Posts} from '../features/Social-Network/Posts/Posts';
import {Photos} from '../features/Social-Network/Photos/Photos';
import {Videos} from '../features/Social-Network/Videos/Videos';
import {Chat} from '../features/Social-Network/Chat/Chat';

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
    const applicationChangingTheme = useAppSelector<boolean>(state => state.application.applicationChangingTheme)
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
            <div className={applicationChangingTheme ? `${styles.app} ${styles.active}` : `${styles.app}`}>
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
                        {isLoggedIn &&
                            <div style={applicationChangingTheme ? {background: 'black'} : {background: 'white'}}
                                 className={isMenuOpen ? `${styles.sidebar} ${styles.active}` : `${styles.sidebar}`}>
                                <MenuPage/>
                            </div>
                        }
                        <div className={isMenuOpen ? `${styles.page__body} ${styles.active}` : `${styles.page__body}`}>
                            <Routes>
                                {/*<Route path={'/menupage/*'} element={<MenuPage/>}/>*/}
                                <Route path={'/*'} element={<Error/>}/>
                                <Route path={'/gallery'} element={<Gallery/>}/>
                                <Route path={'/social-network'} element={<div><SocialNetwork/><Outlet/></div>}>
                                    <Route path={'/social-network/posts'} element={<div><Posts/></div>}/>
                                    <Route path={'/social-network/about'} element={<div><About/></div>}/>
                                    <Route path={'/social-network/friends'} element={<div><Friends/></div>}/>
                                    <Route path={'/social-network/photos'} element={<div><Photos/></div>}/>
                                    <Route path={'/social-network/videos'} element={<div><Videos/></div>}/>
                                    <Route path={'/social-network/chat'} element={<div><Chat/></div>}/>
                                </Route>
                                <Route path={'/settings'} element={
                                    <div><Settings/><Outlet/></div>}>
                                    <Route path={'*'} element={<div><Error/></div>}/>
                                    <Route path={':id'} element={<div>iD</div>}/>
                                    <Route index element={<div>check iD</div>}/>
                                    <Route path={'/settings/background'} element={<div><Background/></div>}/>
                                </Route>
                                <Route path={'/templates'} element={<Templates/>}/>
                                <Route path={'/'}
                                       element={<TodoListsList applicationChangingTheme={applicationChangingTheme}
                                                               demo={false}/>}/>
                                <Route path={'/login'} element={<Login/>}/>

                            </Routes>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
})
