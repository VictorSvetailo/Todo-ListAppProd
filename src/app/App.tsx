import React from 'react';
import stales from './App.module.css';
import {TaskType} from '../api/todoLists-api';
import {TodoListsList} from '../features/TodoListsList/TodoListsList';

export type TasksStateType = {
    [toDoList_ID: string]: Array<TaskType>
}

export const App = React.memo(() => {
    return (
        <div className={stales.app}>
            <TodoListsList/>
        </div>
    );
})


