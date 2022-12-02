import React, {useCallback, useEffect} from 'react';
import stales from './App.module.css';
import {TodoListsList} from '../features/TodoListsList';
import {Box, CircularProgress, Grid, LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import {Login, authActions} from '../features/Auth';
import {Route, Routes} from 'react-router-dom';
import {authSelectors} from '../features/Auth';
import {selectIsInitialized, selectStatus} from '../features/Apllication/selectors';
import {appActions} from '../features/Apllication';
import {useActions} from '../utils/redux-utils';
import {TaskType} from '../api/types';
import {AppMenuBar} from '../components/Menu/MenuBar';


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
    // const {logout} = useActions(authActions)
    const {isInitializeApp} = useActions(appActions)

    useEffect(() => {
        if (!demo) {
            isInitializeApp()
        }
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
        <div>
            <div className={stales.app}>
                <div className={!isLoggedIn ? stales.back : ''}>
                    <ErrorSnackbar/>
                    <Box sx={{flexGrow: 1}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div style={{position: 'relative', width: '100%'}}>

                                    {isLoggedIn && <AppMenuBar/>}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-3px',
                                        left: '0',
                                        width: '100%',
                                        height: '5px',
                                    }}>
                                        {status === 'loading' && <LinearProgress color="primary"/>}
                                    </div>
                                </div>

                            </Grid>
                            <Grid item xs={12}>
                                <div style={{position: 'relative'}}>
                                    <div>
                                        <Routes>
                                            <Route path={'/'} element={<TodoListsList demo={demo}/>}/>
                                            <Route path={'/login'} element={<Login/>}/>
                                        </Routes>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>
        </div>
    );
});
