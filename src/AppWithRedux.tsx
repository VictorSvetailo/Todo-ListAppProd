import React, {useReducer, useState} from 'react';
import stales from './App.module.css';
import {TaskType, ToDoList} from './component/ToDoList/ToDoList';
import {v1} from 'uuid';
import AddItemForm from './component/AddItemForm/AddItemForm';
import {
    addTodolistsAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    todolistsReducer
} from './component/state/todolists-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './component/state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './component/state/store';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type ToDoListType = {
    title: string
    filter: FilterValuesType
    id: string
}

export type TasksStateType = {
    [toDoList_ID: string]: Array<TaskType>
}

function AppWithRedux() {


    const dispatch = useDispatch()
    const toDoList = useSelector<AppRootStateType, Array<ToDoListType>>((state => state.todolists))
    const tasks = useSelector<AppRootStateType, TasksStateType>((state => state.tasks))


    const removeToDoList = (toDoListID: string) => {
        const action = removeTodoListAC(toDoListID)
        dispatch(action)
    }

    function changeToDoListFilter(toDoListID: string, filter: FilterValuesType) {
        dispatch(changeTodolistFilterAC(toDoListID, filter))
    }

    const changeToDoListTitle = (toDoListID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(toDoListID, newTitle))
    }

    // Add Tasks
    const addTask = (toDoListID: string, title: string) => {
        dispatch(addTaskAC(toDoListID, title))
    }
    // Remove--------------------------------------------------
    const removeTask = (toDoListID: string, taskID: string) => {
        const action = removeTaskAC(toDoListID, taskID)
        dispatch(action)
    }
    // Change status
    const changeTaskStatus = (toDoListID: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(toDoListID, taskId, isDone))
    }
    const changeTaskTitle = (toDoListID: string, idTask: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(toDoListID, idTask, newTitle))
    }

    // Component --------------------------------------------------
    const todoListComponents = toDoList.map(tl => {
        let tasksForTodolist;
        switch (tl.filter) {
            case 'completed':
                tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
                break
            case 'active':
                tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
                break
            default:
                tasksForTodolist = tasks[tl.id]
        }
        return <ToDoList
            toDoListID={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeToDoListFilter={changeToDoListFilter}
            addTask={addTask}
            changeStatus={changeTaskStatus}
            filter={tl.filter}
            removeToDoList={removeToDoList}
            changeTaskTitle={changeTaskTitle}
            changeToDoListTitle={changeToDoListTitle}
        />
    })
    const addTodoList = (title: string) => {
        const action = addTodolistsAC(title)
        dispatch(action)
    }

    return (
        <div className={stales.app}>
            <div className={stales.wrapper}>
                <h1 className={stales.appTitle}>To-Do List for Svetailo</h1>
                <button className={stales.button_addTasks}>Add new task</button>
                <div className={stales.wrap}>
                    <AddItemForm addItem={addTodoList}/>
                    {todoListComponents}
                </div>
            </div>

        </div>
    );
}

export default AppWithRedux;