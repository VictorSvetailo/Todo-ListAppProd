import React, {useCallback, useEffect} from 'react';
import stales from './App.module.css';
import {TodoListsList} from '../features/TodoListsList';
import {CircularProgress, LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import {Login, authActions} from '../features/Auth';
import {Route, Routes} from 'react-router-dom';
import {authSelectors} from '../features/Auth';
import {selectIsInitialized, selectStatus} from '../features/Apllication/selectors';
import {appActions} from '../features/Apllication';
import {useActions} from '../utils/redux-utils';
import {TaskType} from '../api/types';



export type TasksStateType = {
    [toDoList_ID: string]: Array<TaskType>;
};

type PropsType = {
    demo?: boolean;
};



export const App: React.FC<PropsType> = React.memo(({demo = false}) => {
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized);
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);
    const {logout} = useActions(authActions)
    const {isInitializeApp} = useActions(appActions)

    useEffect(() => {
        if (!demo) {
           isInitializeApp()
        }
    }, []);

    const logoutH = useCallback(() => {
        logout()
    }, []);

    if (!isInitialized) {
        return (
            <>
                <div
                    style={{
                        position: 'absolute',
                        top: '48%',
                        left: '48%',
                    }}
                >
                    <CircularProgress/>
                </div>
            </>
        );
    }

    return (
        <>
            <div
                className={stales.app}
                style={{
                    position: 'relative',
                }}
            >
                <ErrorSnackbar/>
                <div
                    style={{
                        position: 'relative',
                        top: '0',
                        left: '0',
                        height: '5px',
                    }}
                >
                    {status === 'loading' && <LinearProgress/>}
                </div>
                {isLoggedIn && <button onClick={logoutH}>logout</button>}
                <Routes>
                    <Route path={'/'} element={<TodoListsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </div>

        </>
    );
});
