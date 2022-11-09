import React from 'react';
import stales from './App.module.css';
import {TaskType} from '../api/todoLists-api';
import {TodoListsList} from '../features/TodoListsList/TodoListsList';
import {LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {RequestStatusType} from './app-reduser';


export type TasksStateType = {
    [toDoList_ID: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

export const App: React.FC<PropsType> = React.memo(({demo = false}) => {

   const status = useSelector<AppRootStateType, RequestStatusType>(state=> state.app.status)


    return (
        <div className={stales.app}>
            <ErrorSnackbar/>
            {status === 'loading' && <LinearProgress/>}
            <TodoListsList demo={demo}/>
        </div>
    );
})


