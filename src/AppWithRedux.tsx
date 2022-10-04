import React, {useCallback} from 'react';
import stales from './App.module.css';
import {TaskType, ToDoList} from './component/ToDoList/ToDoList';
import AddItemForm from './component/AddItemForm/AddItemForm';
import {
    addTodolistsAC,
} from './component/state/todolists-reducer';
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

export const AppWithRedux = React.memo(() => {

    console.log("App is called")


    const dispatch = useDispatch()
    const toDoList = useSelector<AppRootStateType, Array<ToDoListType>>((state => state.todolists))

    // Component --------------------------------------------------
    const todoListComponents = toDoList.map(tl => {
        return <ToDoList
            key={tl.id}
            toDoListID={tl.id}
            title={tl.title}
            // tasks={tasksForTodolist}
            filter={tl.filter}
        />
    })
    const addTodoList = useCallback((title: string) => {
        const action = addTodolistsAC(title)
        dispatch(action)
    }, [dispatch])

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
})
