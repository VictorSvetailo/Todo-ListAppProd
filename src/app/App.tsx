import React, {useCallback, useEffect} from 'react';
import stales from './App.module.css';
import {TaskType} from '../api/todoLists-api';
import {TodoListsList} from '../features/TodoListsList';
import {CircularProgress, LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import {useAppDispatch} from './store';
import {Login} from '../features/Auth';
import {Route, Routes} from 'react-router-dom';
import {logoutTC} from '../features/Auth/auth-reducer';
import {authSelectors} from '../features/Auth';
import {selectIsInitialized, selectStatus} from './selectors';
import {asyncActions} from './app-reducer';



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

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!demo) {
            dispatch(asyncActions.isInitializeAppTC());
        }

    }, []);

    const logoutH = useCallback(() => {
        dispatch(logoutTC());
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
