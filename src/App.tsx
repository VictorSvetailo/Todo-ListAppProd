import React, {useCallback, useEffect} from 'react';
import stales from './App.module.css';
import {ToDoList} from './component/ToDoList/ToDoList';
import AddItemForm from './component/AddItemForm/AddItemForm';
import {addTodoListsAC, fetchTodoListTC, TodoListDomainType} from './component/state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './component/state/store';
import {TaskType} from './api/todoLists-api';

export type TasksStateType = {
    [toDoList_ID: string]: Array<TaskType>
}

// type AppDispatchType = ThunkDispatch<AppRootStateType, void, AnyAction>
// export const useAppDispatch = () => useDispatch<AppDispatchType>();



export const App = React.memo(() => {

    console.log("App is called")

    const dispatch = useDispatch()
    // componentDidMount
    useEffect(() => {

        // @ts-ignore
        dispatch(fetchTodoListTC());

    }, [])



    const toDoList = useSelector<AppRootStateType, Array<TodoListDomainType>>((state => state.todolists))

    // Component --------------------------------------------------
    const todoListComponents = toDoList.map(tl => {
        return <>
        <div style={{marginTop: "10px"}}>
            <ToDoList
                key={tl.id}
                toDoListID={tl.id}
                title={tl.title}
                // tasks={tasksForTodolist}
                filter={tl.filter}
            />
        </div>
        </>
    })
    const addTodoList = useCallback((title: string) => {
        const action = addTodoListsAC(title)
        dispatch(action)
    }, [dispatch])





    return (
        <div className={stales.app}>
            <div className={stales.wrapper}>
                <h1 className={stales.appTitle}>To-Do List for Svetailo</h1>
                <button className={stales.button_addTasks}>Add new task</button>
                <div className={stales.wrap}>
                    <AddItemForm addItem={addTodoList}/>
                    <div style={{maxWidth: '1140px'}}>
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                            {todoListComponents}
                        </div>
                    </div>


                </div>
            </div>

        </div>
    );
})
