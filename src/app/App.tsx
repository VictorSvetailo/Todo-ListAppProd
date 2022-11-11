import React from 'react';
import stales from './App.module.css';
import {TaskType} from '../api/todoLists-api';
import {TodoListsList} from '../features/TodoListsList/TodoListsList';
import {LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {RequestStatusType} from './app-reduser';
import {Login} from '../features/Login/Login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';


export type TasksStateType = {
    [toDoList_ID: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

export const App: React.FC<PropsType> = React.memo(({demo = false}) => {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)


    return <>
        <BrowserRouter>

            <div className={stales.app} style={{position: 'relative'}}>
                <ErrorSnackbar/>
                <div style={{position: 'relative', top: '0', left: '0', height: '5px'}}>
                    {status === 'loading' && <LinearProgress/>}
                </div>
                <Routes>
                    <Route path={'/'} element={<TodoListsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </div>

        </BrowserRouter>
    </>
})


